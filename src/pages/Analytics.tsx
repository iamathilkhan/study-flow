import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { TrendingUp, TrendingDown, Minus } from 'lucide-react';
import { AppLayout } from '@/components/layout/AppLayout';
import { ProgressRing } from '@/components/dashboard/ProgressRing';
import { useStudy } from '@/context/StudyContext';

// Mock score data
const scoreData = [
  { date: 'Jan 27', Calculus: 72, Physics: 80, English: 90, Chemistry: 75 },
  { date: 'Jan 28', Calculus: 78, Physics: 85, English: 88, Chemistry: 78 },
  { date: 'Jan 29', Calculus: 65, Physics: 82, English: 92, Chemistry: 80 },
  { date: 'Jan 30', Calculus: 75, Physics: 78, English: 85, Chemistry: 82 },
  { date: 'Jan 31', Calculus: 80, Physics: 88, English: 90, Chemistry: 85 },
  { date: 'Feb 1', Calculus: 82, Physics: 85, English: 88, Chemistry: 88 },
  { date: 'Feb 2', Calculus: 78, Physics: 90, English: 92, Chemistry: 86 },
];

// Mock streak data
const streakData = [
  { day: 'Sun', completed: false },
  { day: 'Mon', completed: true },
  { day: 'Tue', completed: true },
  { day: 'Wed', completed: true },
  { day: 'Thu', completed: true },
  { day: 'Fri', completed: true },
  { day: 'Sat', completed: false },
];

const Analytics = () => {
  const { subjects, sessions } = useStudy();

  const getSubjectStats = (subjectId: string) => {
    const subjectSessions = sessions.filter(s => s.subjectId === subjectId);
    const completedSessions = subjectSessions.filter(s => s.status === 'completed');
    const scores = completedSessions.map(s => s.score || 0);
    const avgScore = scores.length > 0 
      ? Math.round(scores.reduce((a, b) => a + b, 0) / scores.length)
      : 0;
    
    // Calculate trend
    const recentScores = scores.slice(-3);
    let trend: 'up' | 'down' | 'stable' = 'stable';
    if (recentScores.length >= 2) {
      const diff = recentScores[recentScores.length - 1] - recentScores[0];
      if (diff > 5) trend = 'up';
      else if (diff < -5) trend = 'down';
    }

    return {
      avgScore,
      completedCount: completedSessions.length,
      plannedCount: subjectSessions.filter(s => s.status === 'planned').length,
      trend,
    };
  };

  return (
    <AppLayout>
      <h1 className="font-display text-3xl font-bold text-pure-white mb-6">
        Analytics
      </h1>

      {/* Score Trend Chart */}
      <div className="glass-card p-6 mb-6">
        <h2 className="font-display text-lg font-semibold text-pure-white mb-4">
          Score Trends
        </h2>
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={scoreData}>
              <XAxis 
                dataKey="date" 
                axisLine={false}
                tickLine={false}
                tick={{ fill: '#94A3B8', fontSize: 12 }}
              />
              <YAxis 
                domain={[0, 100]}
                axisLine={false}
                tickLine={false}
                tick={{ fill: '#94A3B8', fontSize: 12 }}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: 'hsl(217 33% 17% / 0.9)',
                  border: '1px solid hsl(215 25% 27% / 0.5)',
                  borderRadius: '8px',
                }}
                labelStyle={{ color: '#FFFFFF' }}
              />
              <Legend 
                wrapperStyle={{ paddingTop: '20px' }}
              />
              <Line 
                type="monotone" 
                dataKey="Calculus" 
                stroke="#10B981" 
                strokeWidth={2}
                dot={{ fill: '#10B981', strokeWidth: 0 }}
              />
              <Line 
                type="monotone" 
                dataKey="Physics" 
                stroke="#8B5CF6" 
                strokeWidth={2}
                dot={{ fill: '#8B5CF6', strokeWidth: 0 }}
              />
              <Line 
                type="monotone" 
                dataKey="English" 
                stroke="#F59E0B" 
                strokeWidth={2}
                dot={{ fill: '#F59E0B', strokeWidth: 0 }}
              />
              <Line 
                type="monotone" 
                dataKey="Chemistry" 
                stroke="#F43F5E" 
                strokeWidth={2}
                dot={{ fill: '#F43F5E', strokeWidth: 0 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Per-Subject Progress Cards */}
      <h2 className="font-display text-lg font-semibold text-pure-white mb-4">
        Subject Progress
      </h2>
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {subjects.map((subject) => {
          const stats = getSubjectStats(subject.id);
          return (
            <div key={subject.id} className="glass-card p-5">
              <div className="flex items-center gap-2 mb-4">
                <div
                  className="w-3 h-3 rounded-full"
                  style={{ backgroundColor: subject.color }}
                />
                <h3 className="font-semibold text-pure-white">{subject.name}</h3>
              </div>
              
              <div className="flex justify-center mb-4">
                <ProgressRing
                  progress={stats.avgScore}
                  size={100}
                  strokeWidth={8}
                  color={subject.color}
                  label="Avg Score"
                />
              </div>
              
              <div className="flex items-center justify-between text-sm">
                <span className="text-cool-gray">
                  {stats.completedCount}/{stats.completedCount + stats.plannedCount} sessions
                </span>
                <div className="flex items-center gap-1">
                  {stats.trend === 'up' && (
                    <TrendingUp className="w-4 h-4 text-emerald-glow" />
                  )}
                  {stats.trend === 'down' && (
                    <TrendingDown className="w-4 h-4 text-rose-glow" />
                  )}
                  {stats.trend === 'stable' && (
                    <Minus className="w-4 h-4 text-cool-gray" />
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Streak Tracker */}
      <div className="glass-card p-6">
        <h2 className="font-display text-lg font-semibold text-pure-white mb-4">
          Study Streak
        </h2>
        <div className="flex justify-center gap-3">
          {streakData.map((day, index) => (
            <div key={index} className="text-center">
              <div
                className={`w-12 h-12 rounded-full flex items-center justify-center mb-2 transition-all ${
                  day.completed
                    ? 'gradient-cta glow-emerald'
                    : 'border-2 border-slate-mid'
                }`}
              >
                {day.completed && (
                  <span className="text-xl">🔥</span>
                )}
              </div>
              <span className={`text-xs ${day.completed ? 'text-emerald-glow' : 'text-cool-gray'}`}>
                {day.day}
              </span>
            </div>
          ))}
        </div>
        <p className="text-center text-cool-gray mt-4">
          You're on a <span className="text-emerald-glow font-semibold">5 day</span> streak! Keep it up! 🎉
        </p>
      </div>
    </AppLayout>
  );
};

export default Analytics;
