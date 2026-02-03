import { Edit2, Trash2 } from 'lucide-react';
import { Subject } from '@/context/StudyContext';

interface SubjectCardProps {
  subject: Subject;
  onEdit: (subject: Subject) => void;
  onDelete: (id: string) => void;
}

const priorityLabels = {
  high: { label: 'High', class: 'badge-rose' },
  medium: { label: 'Medium', class: 'badge-amber' },
  low: { label: 'Low', class: 'badge-emerald' },
};

export const SubjectCard = ({ subject, onEdit, onDelete }: SubjectCardProps) => {
  return (
    <div className="glass-card-hover p-5 group">
      {/* Color bar */}
      <div 
        className="h-1.5 rounded-full mb-4" 
        style={{ backgroundColor: subject.color }}
      />
      
      <div className="flex items-start justify-between mb-4">
        <div>
          <h3 className="font-semibold text-lg text-pure-white mb-1">{subject.name}</h3>
          <span className={priorityLabels[subject.priority].class}>
            {priorityLabels[subject.priority].label} Priority
          </span>
        </div>
        
        {/* Actions */}
        <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
          <button
            onClick={() => onEdit(subject)}
            className="p-2 rounded-lg hover:bg-slate-mid/50 text-cool-gray hover:text-pure-white transition-colors"
          >
            <Edit2 className="w-4 h-4" />
          </button>
          <button
            onClick={() => onDelete(subject.id)}
            className="p-2 rounded-lg hover:bg-rose/20 text-cool-gray hover:text-rose transition-colors"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      </div>
      
      {/* Difficulty bar */}
      <div className="mb-4">
        <div className="flex items-center justify-between mb-1">
          <span className="text-xs text-cool-gray">Difficulty</span>
          <span className="text-xs text-pure-white font-medium">{subject.difficulty}/10</span>
        </div>
        <div className="h-2 bg-slate-mid rounded-full overflow-hidden">
          <div 
            className="h-full gradient-accent-bar rounded-full transition-all duration-300"
            style={{ width: `${subject.difficulty * 10}%` }}
          />
        </div>
      </div>
      
      {/* Hours per week */}
      <div className="flex items-center justify-between text-sm">
        <span className="text-cool-gray">Hours/week</span>
        <span className="text-pure-white font-medium">{subject.hoursPerWeek}h</span>
      </div>
    </div>
  );
};
