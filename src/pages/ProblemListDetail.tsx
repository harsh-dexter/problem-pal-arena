
import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import { 
  ArrowLeft, 
  Search, 
  Check, 
  Plus, 
  ExternalLink, 
  Share2, 
  Download, 
  Users, 
  Edit, 
  Trash2,
  CheckCircle2
} from 'lucide-react';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

// Mock problem data for the list
const mockProblems = [
  { 
    id: 1, 
    title: 'Valid Parentheses', 
    difficulty: 'Easy', 
    topics: ['Stack', 'String'], 
    platform: 'LeetCode',
    url: 'https://leetcode.com/problems/valid-parentheses/',
    solved: true
  },
  { 
    id: 2, 
    title: 'Merge Two Sorted Lists', 
    difficulty: 'Easy', 
    topics: ['Linked List', 'Recursion'], 
    platform: 'LeetCode',
    url: 'https://leetcode.com/problems/merge-two-sorted-lists/',
    solved: true
  },
  { 
    id: 3, 
    title: 'Maximum Subarray', 
    difficulty: 'Medium', 
    topics: ['Array', 'Divide and Conquer', 'Dynamic Programming'], 
    platform: 'LeetCode',
    url: 'https://leetcode.com/problems/maximum-subarray/',
    solved: false
  },
  { 
    id: 4, 
    title: 'Binary Tree Inorder Traversal', 
    difficulty: 'Easy', 
    topics: ['Tree', 'Depth-First Search', 'Binary Tree'], 
    platform: 'LeetCode',
    url: 'https://leetcode.com/problems/binary-tree-inorder-traversal/',
    solved: true
  },
  { 
    id: 5, 
    title: 'Symmetric Tree', 
    difficulty: 'Easy', 
    topics: ['Tree', 'Depth-First Search', 'Breadth-First Search', 'Binary Tree'], 
    platform: 'LeetCode',
    url: 'https://leetcode.com/problems/symmetric-tree/',
    solved: false
  },
  { 
    id: 6, 
    title: 'Binary Tree Level Order Traversal', 
    difficulty: 'Medium', 
    topics: ['Tree', 'Breadth-First Search', 'Binary Tree'], 
    platform: 'LeetCode',
    url: 'https://leetcode.com/problems/binary-tree-level-order-traversal/',
    solved: false
  },
  { 
    id: 7, 
    title: 'Binary Tree Zigzag Level Order Traversal', 
    difficulty: 'Medium', 
    topics: ['Tree', 'Breadth-First Search', 'Binary Tree'], 
    platform: 'LeetCode',
    url: 'https://leetcode.com/problems/binary-tree-zigzag-level-order-traversal/',
    solved: false
  },
  { 
    id: 8, 
    title: 'Validate Binary Search Tree', 
    difficulty: 'Medium', 
    topics: ['Tree', 'Depth-First Search', 'Binary Search Tree', 'Binary Tree'], 
    platform: 'LeetCode',
    url: 'https://leetcode.com/problems/validate-binary-search-tree/',
    solved: false
  },
  { 
    id: 9, 
    title: 'Number of Islands', 
    difficulty: 'Medium', 
    topics: ['Array', 'Depth-First Search', 'Breadth-First Search', 'Union Find', 'Matrix'], 
    platform: 'LeetCode',
    url: 'https://leetcode.com/problems/number-of-islands/',
    solved: true
  },
  { 
    id: 10, 
    title: 'Course Schedule', 
    difficulty: 'Medium', 
    topics: ['Depth-First Search', 'Breadth-First Search', 'Graph', 'Topological Sort'], 
    platform: 'LeetCode',
    url: 'https://leetcode.com/problems/course-schedule/',
    solved: false
  }
];

// Mock list details
const mockListDetails = {
  id: 2,
  title: 'Dynamic Programming Patterns',
  description: 'Collection of DP problems organized by common patterns and techniques. Great for interview preparation and understanding the fundamental approaches to DP problems.',
  createdAt: '2023-03-20',
  updatedAt: '2023-04-22',
  isPublic: true,
  owner: {
    id: 1,
    name: 'John Doe'
  },
  progress: {
    solved: 4,
    total: 10,
    percentage: 40
  }
};

const ProblemListDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [searchQuery, setSearchQuery] = useState('');
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [listDetails, setListDetails] = useState(mockListDetails);
  const [problems, setProblems] = useState(mockProblems);

  useEffect(() => {
    // This would be an API call in a real app to fetch the list details and problems
    console.log(`Fetching list with id: ${id}`);
  }, [id]);

  // Filter problems based on search
  const filteredProblems = problems.filter(problem => 
    problem.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    problem.topics.some(topic => topic.toLowerCase().includes(searchQuery.toLowerCase())) ||
    problem.platform.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleShare = () => {
    toast({
      title: 'List Shared',
      description: 'Share link copied to clipboard.',
    });
  };

  const handleExport = () => {
    toast({
      title: 'List Exported',
      description: 'The list has been exported as CSV.',
    });
  };

  const handleMarkSolved = (problemId: number) => {
    toast({
      title: 'Problem Marked as Solved',
      description: 'Your progress has been updated.',
    });
  };

  const handleDeleteList = () => {
    toast({
      title: 'List Deleted',
      description: 'The problem list has been deleted.',
    });
    navigate('/app/problem-lists');
  };

  const handleRemoveProblem = (problemId: number) => {
    toast({
      title: 'Problem Removed',
      description: 'The problem has been removed from this list.',
    });
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty.toLowerCase()) {
      case 'easy': return 'bg-emerald-500/20 text-emerald-400 hover:bg-emerald-500/30';
      case 'medium': return 'bg-amber-500/20 text-amber-400 hover:bg-amber-500/30';
      case 'hard': return 'bg-red-500/20 text-red-400 hover:bg-red-500/30';
      default: return 'bg-slate-500/20 text-slate-400 hover:bg-slate-500/30';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col space-y-4">
        <Button 
          variant="ghost" 
          className="w-fit -ml-2" 
          onClick={() => navigate('/app/problem-lists')}
        >
          <ArrowLeft className="mr-2 h-4 w-4" /> Back to Lists
        </Button>

        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">{listDetails.title}</h1>
            <p className="text-muted-foreground">{listDetails.description}</p>
          </div>
          <div className="flex flex-wrap gap-2">
            <Button variant="outline" onClick={handleShare}>
              <Share2 className="mr-2 h-4 w-4" /> Share
            </Button>
            <Button variant="outline" onClick={handleExport}>
              <Download className="mr-2 h-4 w-4" /> Export
            </Button>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline">
                  <Edit className="mr-2 h-4 w-4" /> Edit
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem>
                  <Edit className="mr-2 h-4 w-4" /> Edit Details
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Plus className="mr-2 h-4 w-4" /> Add Problems
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="text-red-500 focus:text-red-500" onClick={() => setIsDeleteDialogOpen(true)}>
                  <Trash2 className="mr-2 h-4 w-4" /> Delete List
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row justify-between gap-4 py-2">
          <div className="flex items-center gap-4 text-sm text-muted-foreground">
            <div className="flex items-center">
              <Users className="mr-1 h-4 w-4" />
              <span>{listDetails.isPublic ? 'Public' : 'Private'}</span>
            </div>
            <div>
              Created: {new Date(listDetails.createdAt).toLocaleDateString()}
            </div>
            <div>
              Updated: {new Date(listDetails.updatedAt).toLocaleDateString()}
            </div>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-sm">
              Progress: <span className="font-medium">{listDetails.progress.solved}/{listDetails.progress.total}</span>
            </span>
            <div className="w-32 h-2 bg-slate-700 rounded-full overflow-hidden">
              <div 
                className="h-full bg-primary" 
                style={{ width: `${listDetails.progress.percentage}%` }}
              ></div>
            </div>
            <span className="text-sm font-medium">{listDetails.progress.percentage}%</span>
          </div>
        </div>
      </div>

      <div className="relative w-full max-w-md">
        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Search problems in this list..."
          className="pl-8 bg-sidebar w-full"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      <Card className="bg-sidebar">
        <CardHeader className="px-6 py-4">
          <div className="flex justify-between items-center">
            <CardTitle>Problems</CardTitle>
            <Button variant="outline" size="sm">
              <Plus className="mr-2 h-4 w-4" /> Add Problems
            </Button>
          </div>
        </CardHeader>
        <CardContent className="px-6 py-0">
          <div className="space-y-2">
            {filteredProblems.length > 0 ? (
              filteredProblems.map(problem => (
                <div 
                  key={problem.id} 
                  className="flex flex-col sm:flex-row sm:items-center justify-between p-4 rounded-md hover:bg-slate-800/50 transition-colors"
                >
                  <div className="flex-1 mb-3 sm:mb-0">
                    <div className="flex items-center mb-2">
                      <h3 className="font-medium mr-2">{problem.title}</h3>
                      {problem.solved && (
                        <Badge variant="outline" className="bg-primary/20 text-primary border-primary/20">
                          <CheckCircle2 className="h-3 w-3 mr-1" /> Solved
                        </Badge>
                      )}
                    </div>
                    <div className="flex flex-wrap gap-2">
                      <Badge variant="outline" className={getDifficultyColor(problem.difficulty)}>
                        {problem.difficulty}
                      </Badge>
                      <Badge variant="outline" className="bg-slate-500/20 text-slate-400 hover:bg-slate-500/30">
                        {problem.platform}
                      </Badge>
                      {problem.topics.slice(0, 2).map(topic => (
                        <Badge key={topic} variant="outline" className="bg-slate-500/20 text-slate-400 hover:bg-slate-500/30">
                          {topic}
                        </Badge>
                      ))}
                      {problem.topics.length > 2 && (
                        <Badge variant="outline" className="bg-slate-500/20 text-slate-400 hover:bg-slate-500/30">
                          +{problem.topics.length - 2} more
                        </Badge>
                      )}
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    {!problem.solved && (
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleMarkSolved(problem.id)}
                      >
                        <Check className="h-4 w-4 mr-1" /> Mark Solved
                      </Button>
                    )}
                    <Button
                      variant="outline"
                      size="icon"
                      asChild
                    >
                      <a href={problem.url} target="_blank" rel="noopener noreferrer">
                        <ExternalLink className="h-4 w-4" />
                      </a>
                    </Button>
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => handleRemoveProblem(problem.id)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ))
            ) : (
              <div className="py-8 text-center">
                <p className="text-muted-foreground">No problems match your search</p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      <AlertDialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <AlertDialogContent className="bg-background">
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This will permanently delete the "{listDetails.title}" problem list and remove it from your account.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleDeleteList} className="bg-red-500 hover:bg-red-600">
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default ProblemListDetail;
