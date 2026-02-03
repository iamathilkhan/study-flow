import { LucideIcon } from 'lucide-react';
import { cn } from '@/lib/utils';

interface StatCardProps {
  title: string;
  value: string | number;
  icon: LucideIcon;
  trend?: {
    value: number;
    isPositive: boolean;
  };
  accentColor?: 'emerald' | 'violet' | 'amber' | 'rose';
}

const accentStyles = {
  emerald: 'from-emerald/20 to-emerald/5',
  violet: 'from-violet/20 to-violet/5',
  amber: 'from-amber/20 to-amber/5',
  rose: 'from-rose/20 to-rose/5',
};

const iconBgStyles = {
  emerald: 'bg-emerald/20 text-emerald-glow',
  violet: 'bg-violet/20 text-violet-glow',
  amber: 'bg-amber/20 text-amber-glow',
  rose: 'bg-rose/20 text-rose-glow',
};

export const StatCard = ({ title, value, icon: Icon, trend, accentColor = 'emerald' }: StatCardProps) => {
  return (
    <div className="glass-card-hover p-5 overflow-hidden relative">
      {/* Accent gradient overlay */}
      <div className={cn(
        "absolute top-0 left-0 right-0 h-24 bg-gradient-to-b opacity-50",
        accentStyles[accentColor]
      )} />
      
      {/* Accent bar */}
      <div className="accent-bar mb-4" />
      
      <div className="relative flex items-start justify-between">
        <div>
          <p className="text-cool-gray text-sm font-medium mb-1">{title}</p>
          <p className="text-3xl font-bold text-pure-white">{value}</p>
          
          {trend && (
            <div className="flex items-center gap-1 mt-2">
              <span className={cn(
                "text-sm font-medium",
                trend.isPositive ? "text-emerald-glow" : "text-rose-glow"
              )}>
                {trend.isPositive ? '↑' : '↓'} {Math.abs(trend.value)}%
              </span>
              <span className="text-xs text-slate-light">vs last week</span>
            </div>
          )}
        </div>
        
        <div className={cn("p-3 rounded-lg", iconBgStyles[accentColor])}>
          <Icon className="w-6 h-6" />
        </div>
      </div>
    </div>
  );
};
