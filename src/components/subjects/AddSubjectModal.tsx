import { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import { Subject } from '@/context/StudyContext';

interface AddSubjectModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (subject: Omit<Subject, 'id'>) => void;
  editingSubject?: Subject | null;
}

const colorPresets = [
  { name: 'Emerald', value: '#10B981' },
  { name: 'Violet', value: '#8B5CF6' },
  { name: 'Amber', value: '#F59E0B' },
  { name: 'Rose', value: '#F43F5E' },
  { name: 'Sky', value: '#0EA5E9' },
];

export const AddSubjectModal = ({ isOpen, onClose, onSave, editingSubject }: AddSubjectModalProps) => {
  const [name, setName] = useState('');
  const [difficulty, setDifficulty] = useState(5);
  const [priority, setPriority] = useState<'high' | 'medium' | 'low'>('medium');
  const [hoursPerWeek, setHoursPerWeek] = useState(3);
  const [color, setColor] = useState('#10B981');

  useEffect(() => {
    if (editingSubject) {
      setName(editingSubject.name);
      setDifficulty(editingSubject.difficulty);
      setPriority(editingSubject.priority);
      setHoursPerWeek(editingSubject.hoursPerWeek);
      setColor(editingSubject.color);
    } else {
      setName('');
      setDifficulty(5);
      setPriority('medium');
      setHoursPerWeek(3);
      setColor('#10B981');
    }
  }, [editingSubject, isOpen]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave({ name, difficulty, priority, hoursPerWeek, color });
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={onClose}
      />
      
      {/* Modal */}
      <div className="relative glass-card w-full max-w-md p-6 animate-scale-in">
        <div className="flex items-center justify-between mb-6">
          <h2 className="font-display text-xl font-semibold text-pure-white">
            {editingSubject ? 'Edit Subject' : 'Add New Subject'}
          </h2>
          <button
            onClick={onClose}
            className="p-2 rounded-lg hover:bg-slate-mid/50 text-cool-gray hover:text-pure-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
        
        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Name */}
          <div>
            <label className="block text-sm font-medium text-cool-gray mb-2">
              Subject Name
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="input-dark w-full"
              placeholder="e.g., Calculus, Physics"
              required
            />
          </div>
          
          {/* Difficulty Slider */}
          <div>
            <label className="block text-sm font-medium text-cool-gray mb-2">
              Difficulty: <span className="text-pure-white">{difficulty}/10</span>
            </label>
            <input
              type="range"
              min="1"
              max="10"
              value={difficulty}
              onChange={(e) => setDifficulty(parseInt(e.target.value))}
              className="w-full h-2 bg-slate-mid rounded-full appearance-none cursor-pointer accent-emerald"
            />
          </div>
          
          {/* Priority */}
          <div>
            <label className="block text-sm font-medium text-cool-gray mb-2">
              Priority
            </label>
            <div className="grid grid-cols-3 gap-2">
              {(['high', 'medium', 'low'] as const).map((p) => (
                <button
                  key={p}
                  type="button"
                  onClick={() => setPriority(p)}
                  className={`py-2 px-4 rounded-lg text-sm font-medium transition-all ${
                    priority === p
                      ? 'gradient-cta text-white'
                      : 'bg-slate-mid/50 text-cool-gray hover:bg-slate-mid'
                  }`}
                >
                  {p.charAt(0).toUpperCase() + p.slice(1)}
                </button>
              ))}
            </div>
          </div>
          
          {/* Hours per Week */}
          <div>
            <label className="block text-sm font-medium text-cool-gray mb-2">
              Hours per Week
            </label>
            <input
              type="number"
              min="1"
              max="20"
              value={hoursPerWeek}
              onChange={(e) => setHoursPerWeek(parseInt(e.target.value))}
              className="input-dark w-full"
            />
          </div>
          
          {/* Color Picker */}
          <div>
            <label className="block text-sm font-medium text-cool-gray mb-2">
              Color
            </label>
            <div className="flex gap-2">
              {colorPresets.map((preset) => (
                <button
                  key={preset.value}
                  type="button"
                  onClick={() => setColor(preset.value)}
                  className={`w-10 h-10 rounded-lg transition-transform ${
                    color === preset.value ? 'scale-110 ring-2 ring-pure-white' : ''
                  }`}
                  style={{ backgroundColor: preset.value }}
                  title={preset.name}
                />
              ))}
            </div>
          </div>
          
          {/* Actions */}
          <div className="flex gap-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 py-3 rounded-lg bg-slate-mid/50 text-cool-gray font-medium hover:bg-slate-mid transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 btn-primary"
            >
              {editingSubject ? 'Save Changes' : 'Add Subject'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
