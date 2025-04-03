
import { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { PieChart, LineChart, BarChart, XAxis, YAxis, CartesianGrid, Tooltip, Legend, Pie, Line, Bar, Cell, ResponsiveContainer } from 'recharts';
import { useToast } from '@/hooks/use-toast';
import { ArrowUpRight, ListChecks, FileQuestion, Medal, Plus, Clock, Activity } from 'lucide-react';
import { Link } from 'react-router-dom';

// Mock data
const pieData = [
  { name: 'Array', value: 42, color: '#8B5CF6' },
  { name: 'Graph', value: 28, color: '#0EA5E9' },
  { name: 'Tree', value: 19, color: '#10B981' },
  { name: 'DP', value: 35, color: '#F59E0B' },
  { name: 'Math', value: 22, color: '#EC4899' },
];

const lineData = [
  { name: 'Jan', problems: 25 },
  { name: 'Feb', problems: 32 },
  { name: 'Mar', problems: 28 },
  { name: 'Apr', problems: 41 },
  { name: 'May', problems: 50 },
  { name: 'Jun', problems: 46 },
];

const difficultyData = [
  { name: 'Easy', count: 54, color: '#10B981' },
  { name: 'Medium', count: 86, color: '#F59E0B' },
  { name: 'Hard', count: 21, color: '#EF4444' },
];

const recentActivity = [
  { id: 1, type: 'solved', title: 'Two Sum', platform: 'LeetCode', difficulty: 'Easy', timestamp: '2h ago' },
  { id: 2, type: 'solved', title: 'Merge Intervals', platform: 'LeetCode', difficulty: 'Medium', timestamp: '5h ago' },
  { id: 3, type: 'created', title: 'Graph Problems', itemType: 'Problem List', timestamp: '1d ago' },
  { id: 4, type: 'solved', title: 'Word Break', platform: 'LeetCode', difficulty: 'Medium', timestamp: '1d ago' },
  { id: 5, type: 'solved', title: 'Trapping Rain Water', platform: 'LeetCode', difficulty: 'Hard', timestamp: '2d ago' },
];

const Dashboard = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [stats, setStats] = useState({
    totalSolved: 161,
    lists: 8,
    streak: 15
  });

  useEffect(() => {
    // This would fetch user data in a real app
    console.log('Dashboard mounted - would fetch user data here');
  }, []);

  const handleGenerateMashup = () => {
    toast({
      title: "Mashup Generated!",
      description: "Your problem mashup has been created successfully.",
    });
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty.toLowerCase()) {
      case 'easy': return 'text-emerald-400';
      case 'medium': return 'text-amber-400';
      case 'hard': return 'text-red-400';
      default: return 'text-gray-400';
    }
  };

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
          <p className="text-muted-foreground">Welcome back, {user?.name}!</p>
        </div>
        <Button onClick={handleGenerateMashup}>
          <Plus className="mr-2 h-4 w-4" /> Generate Problem Mashup
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-3">
        <Card className="bg-sidebar">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Problems Solved</CardTitle>
            <FileQuestion className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalSolved}</div>
            <p className="text-xs text-muted-foreground">
              +23 from last month
            </p>
          </CardContent>
        </Card>
        <Card className="bg-sidebar">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Problem Lists</CardTitle>
            <ListChecks className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.lists}</div>
            <p className="text-xs text-muted-foreground">
              +2 new lists created
            </p>
          </CardContent>
        </Card>
        <Card className="bg-sidebar">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Current Streak</CardTitle>
            <Medal className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.streak} days</div>
            <p className="text-xs text-muted-foreground">
              Keep going!
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Charts */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        <Card className="bg-sidebar md:col-span-4">
          <CardHeader>
            <CardTitle>Solving Progress</CardTitle>
            <CardDescription>
              Number of problems solved over time
            </CardDescription>
          </CardHeader>
          <CardContent className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart
                data={lineData}
                margin={{
                  top: 5,
                  right: 10,
                  left: 10,
                  bottom: 5,
                }}
              >
                <CartesianGrid strokeDasharray="3 3" stroke="#333" />
                <XAxis dataKey="name" stroke="#888" />
                <YAxis stroke="#888" />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: '#1e1e1e', 
                    borderColor: '#333' 
                  }} 
                />
                <Line
                  type="monotone"
                  dataKey="problems"
                  stroke="#8B5CF6"
                  strokeWidth={2}
                  activeDot={{ r: 8 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card className="bg-sidebar md:col-span-3">
          <CardHeader>
            <CardTitle>Topic Distribution</CardTitle>
            <CardDescription>
              Problems solved by topic
            </CardDescription>
          </CardHeader>
          <CardContent className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={pieData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                >
                  {pieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: '#1e1e1e', 
                    borderColor: '#333' 
                  }} 
                />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Difficulty Distribution */}
      <Card className="bg-sidebar">
        <CardHeader>
          <CardTitle>Difficulty Distribution</CardTitle>
          <CardDescription>
            Problems solved by difficulty level
          </CardDescription>
        </CardHeader>
        <CardContent className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={difficultyData}
              margin={{
                top: 5,
                right: 30,
                left: 20,
                bottom: 5,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" stroke="#333" />
              <XAxis dataKey="name" stroke="#888" />
              <YAxis stroke="#888" />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: '#1e1e1e', 
                  borderColor: '#333' 
                }} 
              />
              <Bar dataKey="count">
                {difficultyData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Recent Activity */}
      <Card className="bg-sidebar">
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle>Recent Activity</CardTitle>
            <CardDescription>
              Your recent problem-solving activity
            </CardDescription>
          </div>
          <Button variant="outline" size="sm" asChild>
            <Link to="/app/problems">
              View all <ArrowUpRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {recentActivity.map((activity) => (
              <div key={activity.id} className="flex items-start gap-3 p-3 rounded-md hover:bg-slate-800/50">
                <div className="rounded-full bg-slate-800 p-2">
                  {activity.type === 'solved' ? (
                    <FileQuestion className="h-4 w-4 text-primary" />
                  ) : activity.type === 'created' ? (
                    <ListChecks className="h-4 w-4 text-accent" />
                  ) : (
                    <Activity className="h-4 w-4 text-muted-foreground" />
                  )}
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-1">
                    <div>
                      <span className="font-medium">{activity.title}</span>
                      {activity.type === 'solved' && (
                        <span className={`ml-2 text-xs ${getDifficultyColor(activity.difficulty)}`}>
                          {activity.difficulty}
                        </span>
                      )}
                    </div>
                    <span className="text-xs text-muted-foreground flex items-center">
                      <Clock className="mr-1 h-3 w-3" /> {activity.timestamp}
                    </span>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    {activity.type === 'solved'
                      ? `Solved on ${activity.platform}`
                      : `Created new ${activity.itemType}`}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Dashboard;
