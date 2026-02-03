import { useState } from 'react';
import { Brain, Lightbulb } from 'lucide-react';
import { AppLayout } from '@/components/layout/AppLayout';
import { SessionCard } from '@/components/dashboard/SessionCard';
import { useStudy } from '@/context/StudyContext';
import { useCustomToast } from '@/components/shared/CustomToast';

const daysOfWeek = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

const Planner = () => {
  const { subjects, sessions, generateSchedule, completeSession } = useStudy();
  const { showToast, ToastComponent } = useCustomToast();
  
  const [selectedDays, setSelectedDays] = useState<string[]>(['Mon', 'Tue', 'Wed', 'Thu', 'Fri']);
  const [hoursPerDay, setHoursPerDay] = useState(4);
  const [isGenerating, setIsGenerating] = useState(false);

  const toggleDay = (day: string) => {
    setSelectedDays(prev => 
      prev.includes(day) 
        ? prev.filter(d => d !== day)
        : [...prev, day]
    );
  };

  const handleGenerate = async () => {
    setIsGenerating(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    generateSchedule(selectedDays, hoursPerDay);
    setIsGenerating(false);
    showToast('Schedule generated successfully!', 'success');
  };

  // Group sessions by day
  const sessionsByDay = daysOfWeek.reduce((acc, day) => {
    acc[day] = sessions.filter(s => s.day === day);
    return acc;
  }, {} as Record<string, typeof sessions>);

  return (
    <AppLayout>
      <ToastComponent />
      
      <h1 className="font-display text-3xl font-bold text-pure-white mb-6">
        Study Planner
      </h1>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Configuration Panel */}
        <div className="glass-card p-6">
          <h2 className="font-display text-lg font-semibold text-pure-white mb-6">
            Configure Schedule
          </h2>

          {/* Day Selection */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-cool-gray mb-3">
              Study Days
            </label>
            <div className="flex flex-wrap gap-2">
              {daysOfWeek.map((day) => (
                <button
                  key={day}
                  onClick={() => toggleDay(day)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                    selectedDays.includes(day)
                      ? 'gradient-cta text-white'
                      : 'bg-slate-mid/50 text-cool-gray hover:bg-slate-mid'
                  }`}
                >
                  {day}
                </button>
              ))}
            </div>
          </div>

          {/* Hours Per Day Slider */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-cool-gray mb-3">
              Hours per Day: <span className="text-pure-white">{hoursPerDay}h</span>
            </label>
            <input
              type="range"
              min="1"
              max="8"
              step="0.5"
              value={hoursPerDay}
              onChange={(e) => setHoursPerDay(parseFloat(e.target.value))}
              className="w-full h-2 bg-slate-mid rounded-full appearance-none cursor-pointer accent-emerald"
            />
            <div className="flex justify-between text-xs text-slate-light mt-1">
              <span>1h</span>
              <span>8h</span>
            </div>
          </div>

          {/* Enrolled Subjects */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-cool-gray mb-3">
              Your Subjects ({subjects.length})
            </label>
            <div className="space-y-2 max-h-48 overflow-y-auto scrollbar-thin">
              {subjects.map((subject) => (
                <div
                  key={subject.id}
                  className="flex items-center justify-between p-3 rounded-lg bg-slate-mid/30"
                >
                  <div className="flex items-center gap-2">
                    <div
                      className="w-3 h-3 rounded-full"
                      style={{ backgroundColor: subject.color }}
                    />
                    <span className="text-sm text-pure-white">{subject.name}</span>
                  </div>
                  <span className="text-xs text-cool-gray">
                    Diff: {subject.difficulty}/10
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Generate Button */}
          <button
            onClick={handleGenerate}
            disabled={isGenerating || selectedDays.length === 0}
            className={`w-full btn-primary flex items-center justify-center gap-2 ${
              isGenerating ? 'animate-pulse-glow' : ''
            } disabled:opacity-50 disabled:cursor-not-allowed`}
          >
            <Brain className={`w-5 h-5 ${isGenerating ? 'animate-spin' : ''}`} />
            {isGenerating ? 'Generating...' : '🧠 Generate My Schedule'}
          </button>
        </div>

        {/* Schedule Grid */}
        <div className="lg:col-span-2">
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-3">
            {daysOfWeek.map((day) => (
              <div key={day} className="min-w-0">
                <div className="text-center mb-3">
                  <span className={`text-sm font-medium ${
                    selectedDays.includes(day) ? 'text-emerald-glow' : 'text-cool-gray'
                  }`}>
                    {day}
                  </span>
                </div>
                
                <div className="space-y-2 min-h-[200px]">
                  {sessionsByDay[day]?.length > 0 ? (
                    sessionsByDay[day].map((session) => (
                      <div
                        key={session.id}
                        className="glass-card p-2 text-xs"
                        style={{ borderLeft: `3px solid ${
                          session.subjectId === '1' ? '#10B981' : 
                          session.subjectId === '2' ? '#8B5CF6' : 
                          session.subjectId === '3' ? '#F59E0B' : '#F43F5E'
                        }` }}
                      >
                        <p className="font-medium text-pure-white truncate">
                          {session.subjectName}
                        </p>
                        <p className="text-slate-light">
                          {session.startTime}
                        </p>
                        <p className="text-slate-light">
                          {session.durationMinutes}m
                        </p>
                      </div>
                    ))
                  ) : (
                    <div className="glass-card p-3 text-center">
                      <span className="text-xs text-slate-light">Free Day</span>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* Recommendation Tip */}
          <div className="mt-6 glass-card p-5 border border-violet/30 bg-violet/5">
            <div className="flex items-start gap-3">
              <div className="p-2 rounded-lg bg-violet/20">
                <Lightbulb className="w-5 h-5 text-violet-glow" />
              </div>
              <div>
                <h4 className="font-semibold text-pure-white mb-1">
                  AI Recommendation
                </h4>
                <p className="text-sm text-cool-gray">
                  Consider splitting Calculus into two sessions on heavy days. Your performance data suggests shorter, 
                  more frequent sessions work better for high-difficulty subjects.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </AppLayout>
  );
};

export default Planner;
