import { Clock, Flame, BookOpen, Trophy } from 'lucide-react';
import { AppLayout } from '@/components/layout/AppLayout';
import { StatCard } from '@/components/dashboard/StatCard';
import { SessionCard } from '@/components/dashboard/SessionCard';
import { WeeklyChart } from '@/components/dashboard/WeeklyChart';
import { useStudy } from '@/context/StudyContext';
import { useAuth } from '@/context/AuthContext';

const Dashboard = () => {
  const { user } = useAuth();
  const { sessions, stats, completeSession } = useStudy();

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good morning';
    if (hour < 18) return 'Good afternoon';
    return 'Good evening';
  };

  const formatDate = () => {
    return new Date().toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  // Get today's sessions (using Monday as demo day)
  const todaySessions = sessions.filter(s => s.day === 'Mon');

  return (
    <AppLayout>
      {/* Greeting */}
      <div className="mb-8">
        <h1 className="font-display text-3xl md:text-4xl font-bold text-pure-white mb-2">
          {getGreeting()}, {user?.name?.split(' ')[0]} 👋
        </h1>
        <p className="text-cool-gray">{formatDate()}</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <StatCard
          title="Study Hours"
          value={`${stats.totalHours.toFixed(1)}h`}
          icon={Clock}
          trend={{ value: 12, isPositive: true }}
          accentColor="emerald"
        />
        <StatCard
          title="Current Streak"
          value={`${stats.streak} days`}
          icon={Flame}
          trend={{ value: 2, isPositive: true }}
          accentColor="amber"
        />
        <StatCard
          title="Subjects"
          value={stats.subjectsCount}
          icon={BookOpen}
          accentColor="violet"
        />
        <StatCard
          title="Avg Score"
          value={`${stats.avgScore}%`}
          icon={Trophy}
          trend={{ value: 5, isPositive: true }}
          accentColor="rose"
        />
      </div>

      {/* Main Content Grid */}
      <div className="grid lg:grid-cols-3 gap-6">
        {/* Today's Schedule */}
        <div className="lg:col-span-1">
          <div className="glass-card p-5">
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-display text-lg font-semibold text-pure-white">
                Today's Schedule
              </h2>
              <span className="text-xs text-emerald-glow bg-emerald/20 px-2 py-1 rounded-full">
                {todaySessions.length} sessions
              </span>
            </div>
            
            <div className="space-y-3 max-h-96 overflow-y-auto scrollbar-thin">
              {todaySessions.length > 0 ? (
                todaySessions.map((session) => (
                  <SessionCard
                    key={session.id}
                    session={session}
                    onComplete={completeSession}
                    compact
                  />
                ))
              ) : (
                <div className="text-center py-8">
                  <p className="text-cool-gray">No sessions scheduled for today</p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Weekly Chart */}
        <div className="lg:col-span-2">
          <WeeklyChart />
        </div>
      </div>

      {/* Upcoming Sessions */}
      <div className="mt-6">
        <h2 className="font-display text-lg font-semibold text-pure-white mb-4">
          Upcoming Sessions
        </h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {sessions
            .filter(s => s.status === 'planned')
            .slice(0, 6)
            .map((session) => (
              <SessionCard
                key={session.id}
                session={session}
                onComplete={completeSession}
              />
            ))}
        </div>
      </div>
    </AppLayout>
  );
};

export default Dashboard;
