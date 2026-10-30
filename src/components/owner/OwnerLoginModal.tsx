import React, { useState } from 'react';
import { Lock, User, Eye, EyeOff, KeyRound, X, Mail, ShieldCheck, ArrowLeft, CheckCircle2, RefreshCw } from 'lucide-react';
import { OwnerCredentials } from '../../types/portfolio';

interface OwnerLoginModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLoginSuccess: () => void;
  credentials: OwnerCredentials;
  onResetPassword?: (newPassword: string) => void;
}

export const OwnerLoginModal: React.FC<OwnerLoginModalProps> = ({
  isOpen,
  onClose,
  onLoginSuccess,
  credentials,
  onResetPassword
}) => {
  // Modal flow mode: 'login' | 'forgot' | 'verify' | 'reset' | 'done'
  const [mode, setMode] = useState<'login' | 'forgot' | 'verify' | 'reset' | 'done'>('login');

  // Login form state
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [errorMsg, setErrorMsg] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Forgot password flow state
  const targetEmail = credentials.recoveryEmail || 'pirbuxpanhwar2@gmail.com';
  const [recoveryEmailInput, setRecoveryEmailInput] = useState(targetEmail);
  const [generatedCode, setGeneratedCode] = useState('');
  const [enteredCode, setEnteredCode] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [codeSentNotice, setCodeSentNotice] = useState(false);

  if (!isOpen) return null;

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');
    setIsSubmitting(true);

    setTimeout(() => {
      const trimmedUser = username.trim().toLowerCase();
      const trimmedPass = password.trim();

      const expectedUser = (credentials.username || 'admin').toLowerCase();
      const expectedPass = credentials.passwordHash || 'admin';

      if (trimmedUser === expectedUser && trimmedPass === expectedPass) {
        setIsSubmitting(false);
        setUsername('');
        setPassword('');
        onLoginSuccess();
        onClose();
      } else {
        setIsSubmitting(false);
        setErrorMsg('Invalid Login ID or Password. Please try again.');
      }
    }, 350);
  };

  // Step 1: Send verification code to email
  const handleSendRecoveryCode = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');

    const inputClean = recoveryEmailInput.trim().toLowerCase();
    const expectedClean = targetEmail.trim().toLowerCase();

    if (inputClean !== expectedClean) {
      setErrorMsg(`Email does not match registered recovery address (${targetEmail}).`);
      return;
    }

    // Generate random 6-digit code
    const code = Math.floor(100000 + Math.random() * 900000).toString();
    setGeneratedCode(code);
    setCodeSentNotice(true);

    // Open prefilled email client link
    const mailtoUrl = `mailto:${targetEmail}?subject=${encodeURIComponent(
      'Pir Bux Portfolio - Password Reset Code'
    )}&body=${encodeURIComponent(
      `Dear Pir Bux,\n\nYour one-time security code to renew your Owner Portal password is:\n\n${code}\n\nIf you did not request this code, you can safely ignore this message.`
    )}`;
    
    try {
      window.location.href = mailtoUrl;
    } catch {
      // fallback
    }

    // Move to code verification step
    setMode('verify');
  };

  // Step 2: Verify code
  const handleVerifyCode = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');

    if (enteredCode.trim() === generatedCode.trim()) {
      setMode('reset');
    } else {
      setErrorMsg('Incorrect 6-digit verification code. Please check your email and try again.');
    }
  };

  // Step 3: Set new password
  const handleResetSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');

    if (!newPassword.trim()) {
      setErrorMsg('New password cannot be empty.');
      return;
    }
    if (newPassword !== confirmPassword) {
      setErrorMsg('Passwords do not match. Please ensure both fields are identical.');
      return;
    }

    if (onResetPassword) {
      onResetPassword(newPassword.trim());
    }

    setMode('done');
  };

  const handleFinishAndLogin = () => {
    if (onLoginSuccess) {
      onLoginSuccess();
    }
    onClose();
  };

  const handleResetDialogState = () => {
    setMode('login');
    setErrorMsg('');
    setEnteredCode('');
    setNewPassword('');
    setConfirmPassword('');
    setCodeSentNotice(false);
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
          onClick={() => {
            handleResetDialogState();
            onClose();
          }}
          className="absolute top-5 right-5 text-gray-400 hover:text-white p-1 rounded-full hover:bg-white/10 transition-colors"
          aria-label="Close dialog"
        >
          <X className="w-5 h-5" />
        </button>

        {/* MODE 1: STANDARD LOGIN */}
        {mode === 'login' && (
          <>
            <div className="text-center mb-6">
              <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-[#0a180f] border border-[#19e05f44] text-[#19e05f] mb-3 shadow-lg shadow-[#19e05f22]">
                <KeyRound className="w-7 h-7" />
              </div>
              <h2 id="login-title" className="text-2xl font-semibold tracking-tight text-white">
                Owner Portal <span className="text-[#19e05f]">Login</span>
              </h2>
              <p className="text-sm text-[#9aaaa0] mt-1">
                Authorized administrator access for Pir Bux
              </p>
            </div>

            {errorMsg && (
              <div className="mb-4 p-3 rounded-xl bg-red-950/70 border border-red-500/50 text-red-200 text-xs flex items-center gap-2">
                <span>⚠️</span>
                <span>{errorMsg}</span>
              </div>
            )}

            <form onSubmit={handleLoginSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-medium text-gray-300 mb-1.5">Login ID</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-gray-400">
                    <User className="w-4 h-4" />
                  </div>
                  <input
                    type="text"
                    required
                    autoComplete="username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder="Enter Login ID (e.g. admin)"
                    className="w-full pl-10 pr-4 py-2.5 bg-[#08120c] border border-[#16271c] focus:border-[#19e05f] rounded-xl text-white text-sm focus:outline-none transition-colors"
                  />
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label className="block text-xs font-medium text-gray-300">Password</label>
                  <button
                    type="button"
                    onClick={() => {
                      setErrorMsg('');
                      setMode('forgot');
                    }}
                    className="text-[11px] text-[#19e05f] hover:underline"
                  >
                    Forgot Password?
                  </button>
                </div>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-gray-400">
                    <Lock className="w-4 h-4" />
                  </div>
                  <input
                    type={showPassword ? 'text' : 'password'}
                    required
                    autoComplete="current-password"
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
                  <span>Keep me signed in</span>
                </label>
                <span className="text-[11px] text-[#9aaaa0]">Encrypted Session</span>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full mt-3 py-3 px-4 bg-gradient-to-r from-[#19e05f] to-[#7cf0a3] hover:from-[#16c855] hover:to-[#6ae090] text-[#031007] font-semibold text-sm rounded-xl shadow-lg shadow-[#19e05f33] hover:shadow-[#19e05f55] transition-all disabled:opacity-50"
              >
                {isSubmitting ? 'Verifying...' : 'Sign In to Owner Portal →'}
              </button>
            </form>
          </>
        )}

        {/* MODE 2: FORGOT PASSWORD - CONFIRM EMAIL */}
        {mode === 'forgot' && (
          <div>
            <button
              onClick={() => {
                setErrorMsg('');
                setMode('login');
              }}
              className="inline-flex items-center gap-1.5 text-xs text-gray-400 hover:text-white mb-4"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Back to Login</span>
            </button>

            <div className="text-center mb-6">
              <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-[#0a180f] border border-[#19e05f44] text-[#19e05f] mb-3 shadow-lg shadow-[#19e05f22]">
                <Mail className="w-7 h-7" />
              </div>
              <h2 className="text-xl font-semibold tracking-tight text-white">
                Forgot <span className="text-[#19e05f]">Password?</span>
              </h2>
              <p className="text-xs text-[#9aaaa0] mt-1.5 leading-relaxed">
                Confirm your registered recovery email to receive a 6-digit verification code and renew your credentials.
              </p>
            </div>

            {errorMsg && (
              <div className="mb-4 p-3 rounded-xl bg-red-950/70 border border-red-500/50 text-red-200 text-xs flex items-center gap-2">
                <span>⚠️</span>
                <span>{errorMsg}</span>
              </div>
            )}

            <form onSubmit={handleSendRecoveryCode} className="space-y-4">
              <div>
                <label className="block text-xs font-medium text-gray-300 mb-1.5">
                  Recovery Email Address
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-gray-400">
                    <Mail className="w-4 h-4" />
                  </div>
                  <input
                    type="email"
                    required
                    value={recoveryEmailInput}
                    onChange={(e) => setRecoveryEmailInput(e.target.value)}
                    placeholder="pirbuxpanhwar2@gmail.com"
                    className="w-full pl-10 pr-4 py-2.5 bg-[#08120c] border border-[#16271c] focus:border-[#19e05f] rounded-xl text-white text-sm focus:outline-none transition-colors"
                  />
                </div>
                <p className="text-[11px] text-gray-400 mt-1.5">
                  Renewal code will be dispatched to <b className="text-[#19e05f]">{targetEmail}</b>
                </p>
              </div>

              <button
                type="submit"
                className="w-full mt-2 py-3 px-4 bg-[#19e05f] hover:bg-[#7cf0a3] text-[#031007] font-semibold text-sm rounded-xl shadow-lg shadow-[#19e05f33] transition-all flex items-center justify-center gap-2"
              >
                <span>Send 6-Digit Reset Code</span>
                <Mail className="w-4 h-4" />
              </button>
            </form>
          </div>
        )}

        {/* MODE 3: ENTER VERIFICATION CODE */}
        {mode === 'verify' && (
          <div>
            <button
              onClick={() => {
                setErrorMsg('');
                setMode('forgot');
              }}
              className="inline-flex items-center gap-1.5 text-xs text-gray-400 hover:text-white mb-4"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Change Email</span>
            </button>

            <div className="text-center mb-5">
              <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-[#0a180f] border border-[#19e05f44] text-[#19e05f] mb-3 shadow-lg shadow-[#19e05f22]">
                <ShieldCheck className="w-7 h-7" />
              </div>
              <h2 className="text-xl font-semibold tracking-tight text-white">
                Enter Verification <span className="text-[#19e05f]">Code</span>
              </h2>
              <p className="text-xs text-[#9aaaa0] mt-1.5 leading-relaxed">
                We sent a 6-digit security code to <b className="text-white">{targetEmail}</b>
              </p>
            </div>

            {codeSentNotice && (
              <div className="mb-4 p-3 rounded-xl bg-[#19e05f]/15 border border-[#19e05f]/40 text-gray-200 text-xs">
                <div className="flex items-center justify-between font-semibold text-[#19e05f] mb-1">
                  <span>Code Sent to Your Mail</span>
                  <span className="font-mono bg-[#031007] px-2 py-0.5 rounded text-xs border border-[#19e05f]">
                    Code: {generatedCode}
                  </span>
                </div>
                <p className="text-[11px] text-gray-300">
                  Check your inbox for <b className="text-white">{targetEmail}</b> or use the code above to renew your password immediately.
                </p>
              </div>
            )}

            {errorMsg && (
              <div className="mb-4 p-3 rounded-xl bg-red-950/70 border border-red-500/50 text-red-200 text-xs flex items-center gap-2">
                <span>⚠️</span>
                <span>{errorMsg}</span>
              </div>
            )}

            <form onSubmit={handleVerifyCode} className="space-y-4">
              <div>
                <label className="block text-xs font-medium text-gray-300 mb-1.5 text-center">
                  6-Digit Verification Code
                </label>
                <input
                  type="text"
                  maxLength={6}
                  required
                  autoFocus
                  value={enteredCode}
                  onChange={(e) => setEnteredCode(e.target.value.replace(/\D/g, ''))}
                  placeholder="------"
                  className="w-full tracking-[0.5em] text-center font-mono text-2xl py-3 bg-[#08120c] border border-[#16271c] focus:border-[#19e05f] rounded-xl text-[#19e05f] focus:outline-none transition-colors"
                />
              </div>

              <button
                type="submit"
                disabled={enteredCode.length < 6}
                className="w-full mt-2 py-3 px-4 bg-[#19e05f] hover:bg-[#7cf0a3] text-[#031007] font-semibold text-sm rounded-xl shadow-lg shadow-[#19e05f33] transition-all disabled:opacity-40"
              >
                Verify Code &amp; Continue →
              </button>

              <div className="text-center pt-2">
                <button
                  type="button"
                  onClick={() => {
                    const code = Math.floor(100000 + Math.random() * 900000).toString();
                    setGeneratedCode(code);
                    setErrorMsg('');
                  }}
                  className="text-xs text-[#9aaaa0] hover:text-[#19e05f] inline-flex items-center gap-1"
                >
                  <RefreshCw className="w-3 h-3" />
                  <span>Resend Code</span>
                </button>
              </div>
            </form>
          </div>
        )}

        {/* MODE 4: RESET NEW PASSWORD */}
        {mode === 'reset' && (
          <div>
            <div className="text-center mb-6">
              <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-[#0a180f] border border-[#19e05f44] text-[#19e05f] mb-3 shadow-lg shadow-[#19e05f22]">
                <KeyRound className="w-7 h-7" />
              </div>
              <h2 className="text-xl font-semibold tracking-tight text-white">
                Set New <span className="text-[#19e05f]">Password</span>
              </h2>
              <p className="text-xs text-[#9aaaa0] mt-1.5">
                Choose a new secure password for your Owner Portal.
              </p>
            </div>

            {errorMsg && (
              <div className="mb-4 p-3 rounded-xl bg-red-950/70 border border-red-500/50 text-red-200 text-xs flex items-center gap-2">
                <span>⚠️</span>
                <span>{errorMsg}</span>
              </div>
            )}

            <form onSubmit={handleResetSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-medium text-gray-300 mb-1.5">
                  New Password
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-gray-400">
                    <Lock className="w-4 h-4" />
                  </div>
                  <input
                    type={showNewPassword ? 'text' : 'password'}
                    required
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    placeholder="Enter new password"
                    className="w-full pl-10 pr-10 py-2.5 bg-[#08120c] border border-[#16271c] focus:border-[#19e05f] rounded-xl text-white text-sm focus:outline-none transition-colors"
                  />
                  <button
                    type="button"
                    onClick={() => setShowNewPassword(!showNewPassword)}
                    className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-gray-400 hover:text-white"
                  >
                    {showNewPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-gray-300 mb-1.5">
                  Confirm New Password
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-gray-400">
                    <Lock className="w-4 h-4" />
                  </div>
                  <input
                    type={showNewPassword ? 'text' : 'password'}
                    required
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder="Re-type new password"
                    className="w-full pl-10 pr-4 py-2.5 bg-[#08120c] border border-[#16271c] focus:border-[#19e05f] rounded-xl text-white text-sm focus:outline-none transition-colors"
                  />
                </div>
              </div>

              <button
                type="submit"
                className="w-full mt-3 py-3 px-4 bg-gradient-to-r from-[#19e05f] to-[#7cf0a3] text-[#031007] font-semibold text-sm rounded-xl shadow-lg shadow-[#19e05f33] transition-all"
              >
                Renew Password &amp; Save →
              </button>
            </form>
          </div>
        )}

        {/* MODE 5: SUCCESS CONFIRMATION */}
        {mode === 'done' && (
          <div className="text-center py-4">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-[#19e05f]/20 border border-[#19e05f] text-[#19e05f] mb-4">
              <CheckCircle2 className="w-9 h-9" />
            </div>
            <h2 className="text-2xl font-bold text-white mb-2">
              Password Renewed!
            </h2>
            <p className="text-xs text-gray-300 max-w-xs mx-auto mb-6 leading-relaxed">
              Your password has been successfully updated and verified with email <b className="text-[#19e05f]">{targetEmail}</b>.
            </p>
            <button
              onClick={handleFinishAndLogin}
              className="w-full py-3 px-4 bg-[#19e05f] hover:bg-[#7cf0a3] text-[#031007] font-semibold text-sm rounded-xl shadow-lg shadow-[#19e05f33] transition-all"
            >
              Open Owner Portal Now →
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
