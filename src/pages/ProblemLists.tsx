
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { 
  Plus, 
  Search, 
  MoreVertical, 
  Calendar, 
  FileQuestion,
  Users,
  Pencil,
  Trash2,
  Copy,
  Lock,
  Unlock
} from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

// Mock data for problem lists
const problemLists = [
  {
    id: 1,
    title: 'Must-Solve LeetCode Questions',
    description: 'Curated list of essential questions for interview preparation',
    problemCount: 42,
    createdAt: '2023-03-15',
    isPublic: true,
    isOwner: true
  },
  {
    id: 2,
    title: 'Dynamic Programming Patterns',
    description: 'Collection of DP problems organized by common patterns',
    problemCount: 28,
    createdAt: '2023-03-20',
    isPublic: true,
    isOwner: true
  },
  {
    id: 3,
    title: 'Graph Algorithms',
    description: 'Comprehensive list of graph problems - BFS, DFS, Dijkstra, etc.',
    problemCount: 35,
    createdAt: '2023-04-05',
    isPublic: false,
    isOwner: true
  },
  {
    id: 4,
    title: 'Weekly Contest Problems',
    description: 'Interesting problems from recent contests',
    problemCount: 16,
    createdAt: '2023-04-10',
    isPublic: true,
    isOwner: true
  },
  {
    id: 5,
    title: 'System Design Interview Prep',
    description: 'Collection of problems related to system design interviews',
    problemCount: 12,
    createdAt: '2023-04-15',
    isPublic: false,
    isOwner: true
  },
  {
    id: 6,
    title: 'Hard Problems Compilation',
    description: 'Collection of challenging problems from various platforms',
    problemCount: 21,
    createdAt: '2023-04-18',
    isPublic: true,
    isOwner: false
  },
  {
    id: 7,
    title: 'Binary Search Problems',
    description: 'Mastering binary search through various applications',
    problemCount: 18,
    createdAt: '2023-04-20',
    isPublic: true,
    isOwner: false
  },
  {
    id: 8,
    title: 'Easy Problems for Beginners',
    description: 'Great set of problems for those just starting out',
    problemCount: 30,
    createdAt: '2023-04-25',
    isPublic: true,
    isOwner: false
  }
];

const ProblemLists = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [newListTitle, setNewListTitle] = useState('');
  const [newListDescription, setNewListDescription] = useState('');
  const [newListIsPublic, setNewListIsPublic] = useState(true);
  const { toast } = useToast();

  // Filter problem lists based on search
  const filteredLists = problemLists.filter(list => 
    list.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    list.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleCreateList = () => {
    // This would be an API call in a real app
    if (!newListTitle) {
      toast({
        title: 'Error',
        description: 'Please provide a title for your list',
        variant: 'destructive',
      });
      return;
    }

    toast({
      title: 'Problem List Created',
      description: `${newListTitle} has been created successfully.`,
    });

    // Reset form and close dialog
    setNewListTitle('');
    setNewListDescription('');
    setNewListIsPublic(true);
    setIsCreateDialogOpen(false);
  };

  const handleDeleteList = (id: number, title: string) => {
    toast({
      title: 'Problem List Deleted',
      description: `${title} has been deleted.`,
    });
  };

  const handleToggleVisibility = (id: number, isPublic: boolean) => {
    toast({
      title: isPublic ? 'List Set to Private' : 'List Set to Public',
      description: 'Visibility settings updated successfully.',
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Problem Lists</h1>
          <p className="text-muted-foreground">Create and manage collections of problems</p>
        </div>
        <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="mr-2 h-4 w-4" /> Create List
            </Button>
          </DialogTrigger>
          <DialogContent className="bg-background sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Create a new problem list</DialogTitle>
              <DialogDescription>
                Organize problems into themed collections for focused practice.
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="title">Title</Label>
                <Input
                  id="title"
                  placeholder="e.g., Binary Search Practice"
                  value={newListTitle}
                  onChange={(e) => setNewListTitle(e.target.value)}
                  className="bg-sidebar border-slate-700"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  placeholder="What's this list about?"
                  value={newListDescription}
                  onChange={(e) => setNewListDescription(e.target.value)}
                  className="bg-sidebar border-slate-700"
                />
              </div>
              <div className="flex items-center space-x-2">
                <Label htmlFor="visibility" className="flex-shrink-0">Visibility:</Label>
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => setNewListIsPublic(!newListIsPublic)}
                  className="flex items-center"
                >
                  {newListIsPublic ? (
                    <>
                      <Unlock className="mr-2 h-4 w-4" /> Public
                    </>
                  ) : (
                    <>
                      <Lock className="mr-2 h-4 w-4" /> Private
                    </>
                  )}
                </Button>
                <span className="text-xs text-muted-foreground">
                  {newListIsPublic ? 'Anyone can see this list' : 'Only you can see this list'}
                </span>
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsCreateDialogOpen(false)}>Cancel</Button>
              <Button onClick={handleCreateList}>Create List</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <div className="flex justify-between items-center">
        <div className="relative w-full max-w-sm">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search lists..."
            className="pl-8 bg-sidebar w-full"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredLists.length > 0 ? (
          filteredLists.map(list => (
            <Card key={list.id} className="bg-sidebar overflow-hidden">
              <CardHeader className="pb-4">
                <div className="flex justify-between items-start">
                  <Link to={`/app/problem-lists/${list.id}`} className="hover:underline">
                    <CardTitle className="text-xl">{list.title}</CardTitle>
                  </Link>
                  {list.isOwner && (
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <MoreVertical className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={() => handleToggleVisibility(list.id, list.isPublic)}>
                          {list.isPublic ? (
                            <>
                              <Lock className="mr-2 h-4 w-4" /> Make Private
                            </>
                          ) : (
                            <>
                              <Unlock className="mr-2 h-4 w-4" /> Make Public
                            </>
                          )}
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Pencil className="mr-2 h-4 w-4" /> Edit List
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Copy className="mr-2 h-4 w-4" /> Duplicate
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem 
                          onClick={() => handleDeleteList(list.id, list.title)}
                          className="text-red-500 focus:text-red-500"
                        >
                          <Trash2 className="mr-2 h-4 w-4" /> Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  )}
                </div>
                <CardDescription className="line-clamp-2">{list.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between text-sm text-muted-foreground">
                  <div className="flex items-center">
                    <FileQuestion className="mr-1 h-4 w-4" />
                    <span>{list.problemCount} problems</span>
                  </div>
                  <div className="flex items-center">
                    <Calendar className="mr-1 h-4 w-4" />
                    <span>{new Date(list.createdAt).toLocaleDateString()}</span>
                  </div>
                </div>
                <div className="mt-6">
                  <Button asChild className="w-full">
                    <Link to={`/app/problem-lists/${list.id}`}>
                      View List
                    </Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))
        ) : (
          <div className="col-span-full flex justify-center items-center py-8">
            <p className="text-muted-foreground">No problem lists found</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProblemLists;
