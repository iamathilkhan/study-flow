import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Calendar, 
  BookOpen, 
  BarChart3, 
  User, 
  Menu, 
  X,
  Brain
} from 'lucide-react';
import { cn } from '@/lib/utils';

const navItems = [
  { icon: LayoutDashboard, label: 'Dashboard', path: '/' },
  { icon: Calendar, label: 'Planner', path: '/planner' },
  { icon: BookOpen, label: 'Subjects', path: '/subjects' },
  { icon: BarChart3, label: 'Analytics', path: '/analytics' },
  { icon: User, label: 'Profile', path: '/profile' },
];

export const Sidebar = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const location = useLocation();

  return (
    <>
      {/* Mobile Menu Button */}
      <button
        onClick={() => setIsMobileOpen(true)}
        className="fixed top-4 left-4 z-50 p-2 glass-card md:hidden"
      >
        <Menu className="w-5 h-5 text-pure-white" />
      </button>

      {/* Mobile Overlay */}
      {isMobileOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 md:hidden"
          onClick={() => setIsMobileOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={cn(
          "fixed left-0 top-0 h-full z-50 glass-card border-r border-slate-mid/30 transition-all duration-300",
          isCollapsed ? "w-16" : "w-64",
          isMobileOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"
        )}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-slate-mid/30">
          <div className={cn("flex items-center gap-3", isCollapsed && "justify-center w-full")}>
            <div className="w-10 h-10 rounded-lg gradient-cta flex items-center justify-center glow-emerald">
              <Brain className="w-6 h-6 text-white" />
            </div>
            {!isCollapsed && (
              <span className="font-display text-xl font-semibold text-pure-white">
                SmartStudy
              </span>
            )}
          </div>
          
          {/* Mobile Close */}
          <button
            onClick={() => setIsMobileOpen(false)}
            className="md:hidden p-1 hover:bg-slate-mid/50 rounded"
          >
            <X className="w-5 h-5 text-cool-gray" />
          </button>
        </div>

        {/* Navigation */}
        <nav className="p-3 space-y-1">
          {navItems.map((item) => {
            const isActive = location.pathname === item.path;
            return (
              <Link
                key={item.path}
                to={item.path}
                onClick={() => setIsMobileOpen(false)}
                className={cn(
                  "flex items-center gap-3 px-3 py-3 rounded-lg transition-all duration-200",
                  isActive 
                    ? "sidebar-link-active" 
                    : "text-cool-gray hover:bg-slate-mid/50 hover:text-pure-white",
                  isCollapsed && "justify-center"
                )}
              >
                <item.icon className={cn("w-5 h-5", isActive && "text-emerald")} />
                {!isCollapsed && <span className="font-medium">{item.label}</span>}
              </Link>
            );
          })}
        </nav>

        {/* Collapse Toggle (Desktop) */}
        <button
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="hidden md:flex absolute bottom-4 left-1/2 -translate-x-1/2 p-2 rounded-lg hover:bg-slate-mid/50 text-cool-gray hover:text-pure-white transition-colors"
        >
          <Menu className="w-5 h-5" />
        </button>
      </aside>

      {/* Mobile Bottom Nav */}
      <nav className="fixed bottom-0 left-0 right-0 z-40 glass-card border-t border-slate-mid/30 md:hidden">
        <div className="flex justify-around py-2">
          {navItems.slice(0, 5).map((item) => {
            const isActive = location.pathname === item.path;
            return (
              <Link
                key={item.path}
                to={item.path}
                className={cn(
                  "flex flex-col items-center gap-1 p-2 rounded-lg transition-colors",
                  isActive ? "text-emerald" : "text-cool-gray"
                )}
              >
                <item.icon className="w-5 h-5" />
                <span className="text-xs">{item.label}</span>
              </Link>
            );
          })}
        </div>
      </nav>
    </>
  );
};
