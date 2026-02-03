import { useState } from 'react';
import { LogOut, AlertTriangle, Save } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { AppLayout } from '@/components/layout/AppLayout';
import { useAuth } from '@/context/AuthContext';
import { useCustomToast } from '@/components/shared/CustomToast';

const Profile = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const { showToast, ToastComponent } = useCustomToast();
  
  const [name, setName] = useState(user?.name || '');
  const [showResetConfirm, setShowResetConfirm] = useState(false);

  const handleSave = () => {
    showToast('Profile updated successfully', 'success');
  };

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const handleResetData = () => {
    setShowResetConfirm(false);
    showToast('All data has been reset', 'info');
  };

  return (
    <AppLayout>
      <ToastComponent />
      
      <h1 className="font-display text-3xl font-bold text-pure-white mb-6">
        Profile
      </h1>

      <div className="max-w-2xl">
        {/* Profile Info */}
        <div className="glass-card p-6 mb-6">
          <h2 className="font-display text-lg font-semibold text-pure-white mb-6">
            Account Information
          </h2>
          
          {/* Avatar */}
          <div className="flex items-center gap-4 mb-6">
            <div className="w-20 h-20 rounded-full gradient-cta flex items-center justify-center text-2xl font-bold text-white">
              {user?.name?.split(' ').map(n => n[0]).join('').toUpperCase()}
            </div>
            <div>
              <p className="text-pure-white font-semibold text-lg">{user?.name}</p>
              <p className="text-cool-gray">{user?.email}</p>
            </div>
          </div>
          
          {/* Editable Name */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-cool-gray mb-2">
              Display Name
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="input-dark w-full"
            />
          </div>
          
          {/* Email (read-only) */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-cool-gray mb-2">
              Email Address
            </label>
            <input
              type="email"
              value={user?.email}
              disabled
              className="input-dark w-full opacity-50 cursor-not-allowed"
            />
          </div>
          
          <button
            onClick={handleSave}
            className="btn-primary inline-flex items-center gap-2"
          >
            <Save className="w-4 h-4" />
            Save Changes
          </button>
        </div>

        {/* Danger Zone */}
        <div className="glass-card p-6 border border-rose/30">
          <h2 className="font-display text-lg font-semibold text-pure-white mb-4">
            Danger Zone
          </h2>
          
          <div className="space-y-4">
            {/* Reset Data */}
            <div className="flex items-center justify-between p-4 rounded-lg bg-rose/10 border border-rose/20">
              <div>
                <p className="font-medium text-pure-white">Reset All Data</p>
                <p className="text-sm text-cool-gray">
                  Delete all your subjects, sessions, and progress data
                </p>
              </div>
              <button
                onClick={() => setShowResetConfirm(true)}
                className="px-4 py-2 rounded-lg bg-rose/20 text-rose-glow font-medium hover:bg-rose/30 transition-colors"
              >
                Reset
              </button>
            </div>
            
            {/* Logout */}
            <div className="flex items-center justify-between p-4 rounded-lg bg-slate-mid/30">
              <div>
                <p className="font-medium text-pure-white">Sign Out</p>
                <p className="text-sm text-cool-gray">
                  Sign out of your account on this device
                </p>
              </div>
              <button
                onClick={handleLogout}
                className="px-4 py-2 rounded-lg bg-slate-mid/50 text-pure-white font-medium hover:bg-slate-mid transition-colors inline-flex items-center gap-2"
              >
                <LogOut className="w-4 h-4" />
                Logout
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Reset Confirmation Modal */}
      {showResetConfirm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div 
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            onClick={() => setShowResetConfirm(false)}
          />
          <div className="relative glass-card p-6 max-w-md animate-scale-in">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-3 rounded-lg bg-rose/20">
                <AlertTriangle className="w-6 h-6 text-rose-glow" />
              </div>
              <h3 className="font-display text-xl font-semibold text-pure-white">
                Reset All Data?
              </h3>
            </div>
            <p className="text-cool-gray mb-6">
              This action cannot be undone. All your subjects, study sessions, and progress data will be permanently deleted.
            </p>
            <div className="flex gap-3">
              <button
                onClick={() => setShowResetConfirm(false)}
                className="flex-1 py-3 rounded-lg bg-slate-mid/50 text-cool-gray font-medium hover:bg-slate-mid transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleResetData}
                className="flex-1 py-3 rounded-lg bg-rose text-white font-medium hover:bg-rose-glow transition-colors"
              >
                Yes, Reset Everything
              </button>
            </div>
          </div>
        </div>
      )}
    </AppLayout>
  );
};

export default Profile;
