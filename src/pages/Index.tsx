
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Flame, ArrowRight, CheckCircle, ListChecks, PieChart } from 'lucide-react';

const Index = () => {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col">
      <header className="border-b border-slate-800">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center">
            <Flame className="w-6 h-6 text-primary mr-2" />
            <span className="font-bold text-xl">ProblemPal</span>
          </div>
          <div className="flex items-center space-x-4">
            {isAuthenticated ? (
              <Button onClick={() => navigate('/app')}>Go to Dashboard</Button>
            ) : (
              <>
                <Button variant="ghost" onClick={() => navigate('/sign-in')}>Sign In</Button>
                <Button onClick={() => navigate('/sign-up')}>Sign Up</Button>
              </>
            )}
          </div>
        </div>
      </header>

      <main>
        {/* Hero Section */}
        <section className="py-20 px-4">
          <div className="container mx-auto max-w-5xl">
            <div className="text-center mb-16 animate-fadeIn">
              <h1 className="text-4xl md:text-6xl font-bold mb-6">
                Elevate Your
                <span className="text-primary"> Competitive Programming</span> Journey
              </h1>
              <p className="text-xl text-gray-400 max-w-2xl mx-auto mb-8">
                Track solved problems, create custom problem lists, and generate problem mashups to take your competitive programming skills to the next level.
              </p>
              <div className="flex flex-col sm:flex-row justify-center gap-4">
                <Button size="lg" onClick={() => navigate('/sign-up')} className="animate-slideUp">
                  Get Started <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
                {isAuthenticated && (
                  <Button size="lg" variant="outline" onClick={() => navigate('/app')} className="animate-slideUp">
                    Go to Dashboard
                  </Button>
                )}
              </div>
            </div>

            {/* Feature cards */}
            <div className="grid md:grid-cols-3 gap-8 mt-16">
              <div className="card-gradient p-6 rounded-lg animate-slideUp">
                <div className="bg-primary/20 p-3 rounded-full w-fit mb-4">
                  <CheckCircle className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Problem Tracking</h3>
                <p className="text-gray-400">
                  Keep track of all the problems you've solved across various competitive programming platforms.
                </p>
              </div>

              <div className="card-gradient p-6 rounded-lg animate-slideUp" style={{animationDelay: "0.1s"}}>
                <div className="bg-primary/20 p-3 rounded-full w-fit mb-4">
                  <ListChecks className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Custom Problem Lists</h3>
                <p className="text-gray-400">
                  Create and share custom problem lists for targeted practice on specific topics or difficulty levels.
                </p>
              </div>

              <div className="card-gradient p-6 rounded-lg animate-slideUp" style={{animationDelay: "0.2s"}}>
                <div className="bg-primary/20 p-3 rounded-full w-fit mb-4">
                  <PieChart className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Progress Analytics</h3>
                <p className="text-gray-400">
                  Visualize your progress with detailed analytics on problem-solving patterns and improvements over time.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t border-slate-800 py-8 mt-auto">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center mb-4 md:mb-0">
              <Flame className="w-5 h-5 text-primary mr-2" />
              <span className="font-medium">ProblemPal</span>
            </div>
            <div className="text-sm text-gray-500">
              © {new Date().getFullYear()} ProblemPal. All rights reserved.
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
