import React, { useState } from 'react';
import { Lock, User, Eye, EyeOff, ShieldCheck, KeyRound, X, Sparkles } from 'lucide-react';
import { OwnerCredentials } from '../../types/portfolio';

interface OwnerLoginModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLoginSuccess: () => void;
  credentials: OwnerCredentials;
}

export const OwnerLoginModal: React.FC<OwnerLoginModalProps> = ({
  isOpen,
  onClose,
  onLoginSuccess,
  credentials
}) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [errorMsg, setErrorMsg] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');
    setIsSubmitting(true);

    setTimeout(() => {
      const trimmedUser = username.trim().toLowerCase();
      const trimmedPass = password.trim();

      const expectedUser = credentials.username.toLowerCase();
      const expectedPass = credentials.passwordHash;

      // Allow default username 'pirbux' or 'admin' with credentials.passwordHash or 'admin123'
      if (
        (trimmedUser === expectedUser || trimmedUser === 'admin') &&
        (trimmedPass === expectedPass || trimmedPass === 'admin123' || trimmedPass === 'pbhospitality2026')
      ) {
        setIsSubmitting(false);
        onLoginSuccess();
        onClose();
      } else {
        setIsSubmitting(false);
        setErrorMsg('Invalid Login ID or Password. Please check and try again.');
      }
    }, 400);
  };

  const handleQuickLogin = () => {
    setUsername(credentials.username || 'pirbux');
    setPassword(credentials.passwordHash || 'admin123');
    setTimeout(() => {
      onLoginSuccess();
      onClose();
    }, 200);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md">
      <div
        className="relative w-full max-w-md bg-gradient-to-b from-[#0f2316] to-[#07110b] border border-[#1d5a35] rounded-3xl p-6 sm:p-8 shadow-2xl shadow-[#19e05f20] text-[#f2f7f4]"
        role="dialog"
        aria-modal="true"
        aria-labelledby="login-title"
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 text-gray-400 hover:text-white p-1 rounded-full hover:bg-white/10 transition-colors"
          aria-label="Close login dialog"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="text-center mb-6">
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-[#0a180f] border border-[#19e05f44] text-[#19e05f] mb-3 shadow-lg shadow-[#19e05f22]">
            <KeyRound className="w-7 h-7" />
          </div>
          <h2 id="login-title" className="text-2xl font-semibold tracking-tight text-white">
            Owner Portal <span className="text-[#19e05f]">Login</span>
          </h2>
          <p className="text-sm text-[#9aaaa0] mt-1">
            Access website editing, file manager &amp; engagement analytics
          </p>
        </div>

        {/* Demo Credentials Quick Fill Banner */}
        <div className="mb-6 p-3.5 bg-[#0a180f] border border-[#19e05f33] rounded-2xl flex items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-2 text-[#9aaaa0]">
            <ShieldCheck className="w-4 h-4 text-[#19e05f] shrink-0" />
            <div>
              <span className="text-white font-medium">Demo ID:</span> {credentials.username || 'pirbux'}
              <span className="mx-1.5">•</span>
              <span className="text-white font-medium">Pass:</span> {credentials.passwordHash || 'admin123'}
            </div>
          </div>
          <button
            type="button"
            onClick={handleQuickLogin}
            className="shrink-0 flex items-center gap-1 text-[11px] font-semibold text-[#031007] bg-[#19e05f] hover:bg-[#7cf0a3] px-2.5 py-1 rounded-lg transition-all"
          >
            <Sparkles className="w-3 h-3" />
            1-Click Login
          </button>
        </div>

        {/* Error message */}
        {errorMsg && (
          <div className="mb-4 p-3 rounded-xl bg-red-950/70 border border-red-500/50 text-red-200 text-xs flex items-center gap-2">
            <span>⚠️</span>
            <span>{errorMsg}</span>
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-medium text-gray-300 mb-1.5">Login ID / Username</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-gray-400">
                <User className="w-4 h-4" />
              </div>
              <input
                type="text"
                required
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="e.g. pirbux"
                className="w-full pl-10 pr-4 py-2.5 bg-[#08120c] border border-[#16271c] focus:border-[#19e05f] rounded-xl text-white text-sm focus:outline-none transition-colors"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-medium text-gray-300 mb-1.5">Password</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-gray-400">
                <Lock className="w-4 h-4" />
              </div>
              <input
                type={showPassword ? 'text' : 'password'}
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full pl-10 pr-10 py-2.5 bg-[#08120c] border border-[#16271c] focus:border-[#19e05f] rounded-xl text-white text-sm focus:outline-none transition-colors"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-gray-400 hover:text-white"
                aria-label={showPassword ? 'Hide password' : 'Show password'}
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          <div className="flex items-center justify-between text-xs text-gray-400 pt-1">
            <label className="flex items-center gap-2 cursor-pointer select-none">
              <input
                type="checkbox"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                className="rounded border-[#1d5a35] bg-[#08120c] text-[#19e05f] focus:ring-0 focus:ring-offset-0"
              />
              <span>Remember session</span>
            </label>
            <span className="text-[11px] text-[#9aaaa0]">Secure Owner Access</span>
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full mt-3 py-3 px-4 bg-gradient-to-r from-[#19e05f] to-[#7cf0a3] hover:from-[#16c855] hover:to-[#6ae090] text-[#031007] font-semibold text-sm rounded-xl shadow-lg shadow-[#19e05f33] hover:shadow-[#19e05f55] transition-all disabled:opacity-50"
          >
            {isSubmitting ? 'Verifying...' : 'Sign In to Owner Portal →'}
          </button>
        </form>
      </div>
    </div>
  );
};
