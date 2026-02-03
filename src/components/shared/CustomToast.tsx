import { useEffect, useState } from 'react';
import { Check, X, AlertCircle } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ToastProps {
  message: string;
  type: 'success' | 'error' | 'info';
  isVisible: boolean;
  onClose: () => void;
}

export const Toast = ({ message, type, isVisible, onClose }: ToastProps) => {
  useEffect(() => {
    if (isVisible) {
      const timer = setTimeout(() => {
        onClose();
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [isVisible, onClose]);

  if (!isVisible) return null;

  const icons = {
    success: Check,
    error: AlertCircle,
    info: AlertCircle,
  };

  const styles = {
    success: 'border-emerald/50 bg-emerald/10',
    error: 'border-rose/50 bg-rose/10',
    info: 'border-violet/50 bg-violet/10',
  };

  const iconStyles = {
    success: 'text-emerald-glow bg-emerald/20',
    error: 'text-rose-glow bg-rose/20',
    info: 'text-violet-glow bg-violet/20',
  };

  const Icon = icons[type];

  return (
    <div className="fixed top-4 right-4 z-50 animate-slide-in-right">
      <div className={cn(
        "glass-card p-4 flex items-center gap-3 border",
        styles[type]
      )}>
        <div className={cn("p-2 rounded-lg", iconStyles[type])}>
          <Icon className="w-4 h-4" />
        </div>
        <p className="text-sm text-pure-white font-medium">{message}</p>
        <button
          onClick={onClose}
          className="p-1 rounded hover:bg-slate-mid/50 text-cool-gray hover:text-pure-white transition-colors"
        >
          <X className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};

// Toast hook
export const useCustomToast = () => {
  const [toast, setToast] = useState<{
    message: string;
    type: 'success' | 'error' | 'info';
    isVisible: boolean;
  }>({
    message: '',
    type: 'success',
    isVisible: false,
  });

  const showToast = (message: string, type: 'success' | 'error' | 'info' = 'success') => {
    setToast({ message, type, isVisible: true });
  };

  const hideToast = () => {
    setToast(prev => ({ ...prev, isVisible: false }));
  };

  const ToastComponent = () => (
    <Toast
      message={toast.message}
      type={toast.type}
      isVisible={toast.isVisible}
      onClose={hideToast}
    />
  );

  return { showToast, ToastComponent };
};
