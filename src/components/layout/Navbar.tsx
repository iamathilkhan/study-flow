import { Bell } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';

export const Navbar = () => {
  const { user } = useAuth();

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(n => n[0])
      .join('')
      .toUpperCase();
  };

  return (
    <header className="sticky top-0 z-30 glass-card border-b border-slate-mid/30">
      <div className="flex items-center justify-between px-6 py-4">
        <div className="md:hidden w-10" /> {/* Spacer for mobile menu button */}
        
        <div className="flex-1" />

        <div className="flex items-center gap-4">
          {/* Notification Bell */}
          <button className="relative p-2 rounded-lg hover:bg-slate-mid/50 transition-colors">
            <Bell className="w-5 h-5 text-cool-gray" />
            <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-emerald rounded-full" />
          </button>

          {/* User Avatar */}
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-full gradient-cta flex items-center justify-center">
              <span className="text-sm font-semibold text-white">
                {user ? getInitials(user.name) : 'U'}
              </span>
            </div>
            <div className="hidden sm:block">
              <p className="text-sm font-medium text-pure-white">{user?.name}</p>
              <p className="text-xs text-cool-gray">{user?.email}</p>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};
