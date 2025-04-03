
import { useState, useEffect } from 'react';
import { Outlet, Navigate, useLocation, Link } from 'react-router-dom';
import { 
  LayoutDashboard, 
  FileQuestion, 
  ListChecks, 
  LogOut, 
  Menu, 
  X,
  Flame,
  Settings
} from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useIsMobile } from '@/hooks/use-mobile';

const AppLayout = () => {
  const { user, isAuthenticated, signOut } = useAuth();
  const location = useLocation();
  const isMobile = useIsMobile();
  const [isSidebarOpen, setIsSidebarOpen] = useState(!isMobile);

  useEffect(() => {
    if (isMobile) {
      setIsSidebarOpen(false);
    } else {
      setIsSidebarOpen(true);
    }
  }, [isMobile]);

  if (!isAuthenticated) {
    return <Navigate to="/sign-in" state={{ from: location }} replace />;
  }

  const navItems = [
    {
      name: 'Dashboard',
      path: '/app',
      icon: <LayoutDashboard className="w-5 h-5" />
    },
    {
      name: 'Problems',
      path: '/app/problems',
      icon: <FileQuestion className="w-5 h-5" />
    },
    {
      name: 'Problem Lists',
      path: '/app/problem-lists',
      icon: <ListChecks className="w-5 h-5" />
    },
    {
      name: 'Settings',
      path: '/app/settings',
      icon: <Settings className="w-5 h-5" />
    }
  ];

  const isActive = (path: string) => {
    if (path === '/app') {
      return location.pathname === '/app';
    }
    return location.pathname.startsWith(path);
  };

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <div 
        className={`fixed lg:relative z-20 h-full transition-all duration-300 ${
          isSidebarOpen ? 'w-64' : 'w-0 lg:w-20 overflow-hidden'
        }`}
      >
        <div className="h-full bg-sidebar flex flex-col border-r border-slate-800">
          <div className="p-4 flex items-center justify-between">
            <div className={`flex items-center ${!isSidebarOpen && 'lg:hidden'}`}>
              <Flame className="w-6 h-6 text-primary" />
              <span className="ml-2 font-bold text-xl">ProblemPal</span>
            </div>
            <div className={`${!isSidebarOpen && 'hidden lg:flex lg:justify-center lg:w-full'}`}>
              <Flame className={`w-6 h-6 text-primary ${isSidebarOpen && 'lg:hidden'}`} />
              <Button 
                variant="ghost" 
                size="icon" 
                onClick={toggleSidebar}
                className={`${!isSidebarOpen && 'hidden'} lg:flex`}
              >
                <X className="h-5 w-5" />
              </Button>
            </div>
          </div>

          <div className="px-3 py-2 flex-1">
            <nav className="space-y-1">
              {navItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`flex items-center px-3 py-2 rounded-md transition-colors ${
                    isActive(item.path)
                      ? 'bg-primary/10 text-primary'
                      : 'text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground'
                  } ${!isSidebarOpen && 'lg:justify-center'}`}
                >
                  {item.icon}
                  <span className={`ml-3 ${!isSidebarOpen && 'lg:hidden'}`}>{item.name}</span>
                </Link>
              ))}
            </nav>
          </div>

          <div className="p-4 border-t border-slate-800">
            <div className={`flex items-center ${!isSidebarOpen && 'lg:justify-center'}`}>
              <Avatar className="h-8 w-8">
                <AvatarImage src={user?.avatar} alt={user?.name} />
                <AvatarFallback>{user?.name.charAt(0)}</AvatarFallback>
              </Avatar>
              <div className={`ml-3 ${!isSidebarOpen && 'lg:hidden'}`}>
                <p className="text-sm font-medium">{user?.name}</p>
              </div>
              <Button
                variant="ghost"
                size="icon"
                onClick={signOut}
                className={`ml-auto ${!isSidebarOpen && 'lg:hidden'}`}
              >
                <LogOut className="h-5 w-5" />
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="flex-1">
        <header className="h-16 border-b border-slate-800 flex items-center px-4">
          <Button
            variant="ghost"
            size="icon"
            onClick={toggleSidebar}
            className={`${isSidebarOpen && 'lg:hidden'}`}
          >
            <Menu className="h-5 w-5" />
          </Button>
        </header>
        <main className="p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AppLayout;
