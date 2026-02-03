import { Clock, Check, Play } from 'lucide-react';
import { StudySession } from '@/context/StudyContext';
import { cn } from '@/lib/utils';

interface SessionCardProps {
  session: StudySession;
  onComplete?: (id: string, score: number) => void;
  compact?: boolean;
}

const typeStyles = {
  'Deep Focus': 'badge-emerald',
  'Review': 'badge-violet',
  'Quick Recap': 'badge-amber',
};

export const SessionCard = ({ session, onComplete, compact = false }: SessionCardProps) => {
  const formatDuration = (minutes: number) => {
    if (minutes >= 60) {
      const hours = Math.floor(minutes / 60);
      const mins = minutes % 60;
      return mins > 0 ? `${hours}h ${mins}m` : `${hours}h`;
    }
    return `${minutes}m`;
  };

  const handleComplete = () => {
    if (onComplete) {
      // For demo, use a random score between 70-100
      const score = Math.floor(Math.random() * 30) + 70;
      onComplete(session.id, score);
    }
  };

  if (compact) {
    return (
      <div className="flex items-center justify-between p-3 glass-card rounded-lg">
        <div className="flex items-center gap-3">
          <div 
            className="w-1 h-10 rounded-full"
            style={{ backgroundColor: session.subjectId === '1' ? '#10B981' : session.subjectId === '2' ? '#8B5CF6' : session.subjectId === '3' ? '#F59E0B' : '#F43F5E' }}
          />
          <div>
            <p className="font-medium text-pure-white text-sm">{session.subjectName}</p>
            <p className="text-xs text-cool-gray">{session.startTime} · {formatDuration(session.durationMinutes)}</p>
          </div>
        </div>
        <span className={cn("text-xs", typeStyles[session.sessionType])}>
          {session.sessionType}
        </span>
      </div>
    );
  }

  return (
    <div className="glass-card-hover p-4">
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center gap-3">
          <div 
            className="w-2 h-full min-h-[40px] rounded-full"
            style={{ backgroundColor: session.subjectId === '1' ? '#10B981' : session.subjectId === '2' ? '#8B5CF6' : session.subjectId === '3' ? '#F59E0B' : '#F43F5E' }}
          />
          <div>
            <h4 className="font-semibold text-pure-white">{session.subjectName}</h4>
            <div className="flex items-center gap-2 mt-1">
              <Clock className="w-3 h-3 text-cool-gray" />
              <span className="text-sm text-cool-gray">
                {session.startTime} · {formatDuration(session.durationMinutes)}
              </span>
            </div>
          </div>
        </div>
        
        <span className={typeStyles[session.sessionType]}>
          {session.sessionType}
        </span>
      </div>
      
      {session.reason && (
        <p className="text-xs text-slate-light mb-3 pl-5">
          💡 {session.reason}
        </p>
      )}
      
      <div className="flex items-center justify-between pt-3 border-t border-slate-mid/30">
        {session.status === 'completed' ? (
          <div className="flex items-center gap-2">
            <Check className="w-4 h-4 text-emerald" />
            <span className="text-sm text-emerald-glow">Completed</span>
            {session.score && (
              <span className="text-sm text-cool-gray">· Score: {session.score}</span>
            )}
          </div>
        ) : (
          <>
            <span className="text-xs text-slate-light">{session.day}</span>
            <button
              onClick={handleComplete}
              className="flex items-center gap-2 px-3 py-1.5 rounded-md bg-emerald/20 text-emerald-glow text-sm font-medium hover:bg-emerald/30 transition-colors"
            >
              <Play className="w-3 h-3" />
              Start Session
            </button>
          </>
        )}
      </div>
    </div>
  );
};
