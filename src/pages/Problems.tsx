
import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import { 
  Plus, 
  Search, 
  Filter, 
  ArrowUpDown, 
  ExternalLink, 
  CheckCircle2, 
  Clock
} from 'lucide-react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

// Mock data for problems
const problems = [
  { 
    id: 1, 
    title: 'Two Sum', 
    difficulty: 'Easy', 
    topics: ['Array', 'Hash Table'], 
    platform: 'LeetCode', 
    solved: true,
    solvedDate: '2023-04-01',
    url: 'https://leetcode.com/problems/two-sum/'
  },
  { 
    id: 2, 
    title: 'Add Two Numbers', 
    difficulty: 'Medium', 
    topics: ['Linked List', 'Math'], 
    platform: 'LeetCode', 
    solved: true,
    solvedDate: '2023-04-05',
    url: 'https://leetcode.com/problems/add-two-numbers/'
  },
  { 
    id: 3, 
    title: 'Longest Substring Without Repeating Characters', 
    difficulty: 'Medium', 
    topics: ['String', 'Sliding Window'], 
    platform: 'LeetCode', 
    solved: false,
    url: 'https://leetcode.com/problems/longest-substring-without-repeating-characters/'
  },
  { 
    id: 4, 
    title: 'Median of Two Sorted Arrays', 
    difficulty: 'Hard', 
    topics: ['Array', 'Binary Search', 'Divide and Conquer'], 
    platform: 'LeetCode', 
    solved: false,
    url: 'https://leetcode.com/problems/median-of-two-sorted-arrays/'
  },
  { 
    id: 5, 
    title: 'Longest Palindromic Substring', 
    difficulty: 'Medium', 
    topics: ['String', 'Dynamic Programming'], 
    platform: 'LeetCode', 
    solved: true,
    solvedDate: '2023-04-12',
    url: 'https://leetcode.com/problems/longest-palindromic-substring/'
  },
  { 
    id: 6, 
    title: 'ZigZag Conversion', 
    difficulty: 'Medium', 
    topics: ['String'], 
    platform: 'LeetCode', 
    solved: false,
    url: 'https://leetcode.com/problems/zigzag-conversion/'
  },
  { 
    id: 7, 
    title: 'Reverse Integer', 
    difficulty: 'Medium', 
    topics: ['Math'], 
    platform: 'LeetCode', 
    solved: true,
    solvedDate: '2023-04-15',
    url: 'https://leetcode.com/problems/reverse-integer/'
  },
  { 
    id: 8, 
    title: 'String to Integer (atoi)', 
    difficulty: 'Medium', 
    topics: ['String', 'Math'], 
    platform: 'LeetCode', 
    solved: false,
    url: 'https://leetcode.com/problems/string-to-integer-atoi/'
  },
  { 
    id: 9, 
    title: 'Palindrome Number', 
    difficulty: 'Easy', 
    topics: ['Math'], 
    platform: 'LeetCode', 
    solved: true,
    solvedDate: '2023-04-02',
    url: 'https://leetcode.com/problems/palindrome-number/'
  },
  { 
    id: 10, 
    title: 'Regular Expression Matching', 
    difficulty: 'Hard', 
    topics: ['String', 'Dynamic Programming', 'Recursion'], 
    platform: 'LeetCode', 
    solved: false,
    url: 'https://leetcode.com/problems/regular-expression-matching/'
  },
];

const platforms = [
  'All Platforms',
  'LeetCode',
  'CodeForces',
  'HackerRank',
  'AtCoder',
  'SPOJ'
];

const difficultyOptions = [
  'All Difficulties',
  'Easy',
  'Medium',
  'Hard'
];

const Problems = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedPlatform, setSelectedPlatform] = useState('All Platforms');
  const [selectedDifficulty, setSelectedDifficulty] = useState('All Difficulties');
  const [currentTab, setCurrentTab] = useState('all');
  const { toast } = useToast();

  // Filter problems based on search, platform, difficulty, and tab
  const filteredProblems = problems.filter(problem => {
    const matchesSearch = problem.title.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesPlatform = selectedPlatform === 'All Platforms' || problem.platform === selectedPlatform;
    const matchesDifficulty = selectedDifficulty === 'All Difficulties' || problem.difficulty === selectedDifficulty;
    const matchesTab = currentTab === 'all' || 
                      (currentTab === 'solved' && problem.solved) || 
                      (currentTab === 'unsolved' && !problem.solved);
    
    return matchesSearch && matchesPlatform && matchesDifficulty && matchesTab;
  });

  const handleAddProblem = () => {
    toast({
      title: "Coming Soon!",
      description: "The ability to add problems will be available in the next update.",
    });
  };

  const handleMarkSolved = (id: number) => {
    toast({
      title: "Problem Marked as Solved",
      description: "Your progress has been updated.",
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
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Problems</h1>
          <p className="text-muted-foreground">Manage and track your competitive programming problems</p>
        </div>
        <Button onClick={handleAddProblem}>
          <Plus className="mr-2 h-4 w-4" /> Add Problem
        </Button>
      </div>

      <Tabs defaultValue="all" className="w-full" onValueChange={setCurrentTab}>
        <div className="flex flex-col sm:flex-row justify-between gap-4 mb-4">
          <TabsList className="bg-sidebar w-full sm:w-auto">
            <TabsTrigger value="all">All Problems</TabsTrigger>
            <TabsTrigger value="solved">Solved</TabsTrigger>
            <TabsTrigger value="unsolved">Unsolved</TabsTrigger>
          </TabsList>
          
          <div className="flex flex-col sm:flex-row gap-2">
            <div className="relative">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search problems..."
                className="pl-8 bg-sidebar w-full sm:w-[250px]"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>

            <div className="flex gap-2">
              <Select
                value={selectedPlatform}
                onValueChange={setSelectedPlatform}
              >
                <SelectTrigger className="w-[140px] bg-sidebar">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {platforms.map(platform => (
                    <SelectItem key={platform} value={platform}>{platform}</SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select
                value={selectedDifficulty}
                onValueChange={setSelectedDifficulty}
              >
                <SelectTrigger className="w-[140px] bg-sidebar">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {difficultyOptions.map(difficulty => (
                    <SelectItem key={difficulty} value={difficulty}>{difficulty}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>

        <TabsContent value="all" className="m-0">
          <Card className="bg-sidebar">
            <CardHeader className="px-6 py-4">
              <div className="flex justify-between items-center">
                <CardTitle>All Problems</CardTitle>
                <CardDescription>{filteredProblems.length} problems</CardDescription>
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
                        <div className="flex flex-wrap gap-2 mb-2">
                          <Badge variant="outline" className={getDifficultyColor(problem.difficulty)}>
                            {problem.difficulty}
                          </Badge>
                          <Badge variant="outline" className="bg-slate-500/20 text-slate-400 hover:bg-slate-500/30">
                            {problem.platform}
                          </Badge>
                          {problem.topics.map(topic => (
                            <Badge key={topic} variant="outline" className="bg-slate-500/20 text-slate-400 hover:bg-slate-500/30">
                              {topic}
                            </Badge>
                          ))}
                        </div>
                        {problem.solved && (
                          <div className="text-xs text-muted-foreground flex items-center">
                            <Clock className="mr-1 h-3 w-3" /> 
                            Solved on {new Date(problem.solvedDate).toLocaleDateString()}
                          </div>
                        )}
                      </div>
                      <div className="flex items-center gap-2">
                        {!problem.solved && (
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleMarkSolved(problem.id)}
                          >
                            <CheckCircle2 className="h-4 w-4 mr-1" /> Mark Solved
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
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="outline" size="icon">
                              <ArrowUpDown className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuLabel>Actions</DropdownMenuLabel>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem>Add to List</DropdownMenuItem>
                            <DropdownMenuItem>Add Notes</DropdownMenuItem>
                            <DropdownMenuItem>Edit</DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="py-8 text-center">
                    <p className="text-muted-foreground">No problems match your filters</p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="solved" className="m-0">
          <Card className="bg-sidebar">
            <CardHeader className="px-6 py-4">
              <div className="flex justify-between items-center">
                <CardTitle>Solved Problems</CardTitle>
                <CardDescription>
                  {filteredProblems.length} solved problems
                </CardDescription>
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
                          <Badge variant="outline" className="bg-primary/20 text-primary border-primary/20">
                            <CheckCircle2 className="h-3 w-3 mr-1" /> Solved
                          </Badge>
                        </div>
                        <div className="flex flex-wrap gap-2 mb-2">
                          <Badge variant="outline" className={getDifficultyColor(problem.difficulty)}>
                            {problem.difficulty}
                          </Badge>
                          <Badge variant="outline" className="bg-slate-500/20 text-slate-400 hover:bg-slate-500/30">
                            {problem.platform}
                          </Badge>
                          {problem.topics.map(topic => (
                            <Badge key={topic} variant="outline" className="bg-slate-500/20 text-slate-400 hover:bg-slate-500/30">
                              {topic}
                            </Badge>
                          ))}
                        </div>
                        <div className="text-xs text-muted-foreground flex items-center">
                          <Clock className="mr-1 h-3 w-3" /> 
                          Solved on {new Date(problem.solvedDate).toLocaleDateString()}
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Button
                          variant="outline"
                          size="icon"
                          asChild
                        >
                          <a href={problem.url} target="_blank" rel="noopener noreferrer">
                            <ExternalLink className="h-4 w-4" />
                          </a>
                        </Button>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="outline" size="icon">
                              <ArrowUpDown className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuLabel>Actions</DropdownMenuLabel>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem>Add to List</DropdownMenuItem>
                            <DropdownMenuItem>Add Notes</DropdownMenuItem>
                            <DropdownMenuItem>Edit</DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="py-8 text-center">
                    <p className="text-muted-foreground">No solved problems match your filters</p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="unsolved" className="m-0">
          <Card className="bg-sidebar">
            <CardHeader className="px-6 py-4">
              <div className="flex justify-between items-center">
                <CardTitle>Unsolved Problems</CardTitle>
                <CardDescription>
                  {filteredProblems.length} unsolved problems
                </CardDescription>
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
                          <h3 className="font-medium">{problem.title}</h3>
                        </div>
                        <div className="flex flex-wrap gap-2">
                          <Badge variant="outline" className={getDifficultyColor(problem.difficulty)}>
                            {problem.difficulty}
                          </Badge>
                          <Badge variant="outline" className="bg-slate-500/20 text-slate-400 hover:bg-slate-500/30">
                            {problem.platform}
                          </Badge>
                          {problem.topics.map(topic => (
                            <Badge key={topic} variant="outline" className="bg-slate-500/20 text-slate-400 hover:bg-slate-500/30">
                              {topic}
                            </Badge>
                          ))}
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleMarkSolved(problem.id)}
                        >
                          <CheckCircle2 className="h-4 w-4 mr-1" /> Mark Solved
                        </Button>
                        <Button
                          variant="outline"
                          size="icon"
                          asChild
                        >
                          <a href={problem.url} target="_blank" rel="noopener noreferrer">
                            <ExternalLink className="h-4 w-4" />
                          </a>
                        </Button>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="outline" size="icon">
                              <ArrowUpDown className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuLabel>Actions</DropdownMenuLabel>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem>Add to List</DropdownMenuItem>
                            <DropdownMenuItem>Add Notes</DropdownMenuItem>
                            <DropdownMenuItem>Edit</DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="py-8 text-center">
                    <p className="text-muted-foreground">No unsolved problems match your filters</p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Problems;
