import React, { useState, useRef } from 'react';
import { KeyRound, Shield, Download, Upload, RotateCcw, Check, AlertTriangle, Eye, EyeOff } from 'lucide-react';
import { PortfolioState, OwnerCredentials } from '../../../types/portfolio';

interface SettingsTabProps {
  portfolio: PortfolioState;
  onUpdateCredentials: (credentials: OwnerCredentials) => void;
  onImportState: (state: PortfolioState) => void;
  onResetDefault: () => void;
}

export const SettingsTab: React.FC<SettingsTabProps> = ({
  portfolio,
  onUpdateCredentials,
  onImportState,
  onResetDefault
}) => {
  const [username, setUsername] = useState(portfolio.credentials.username || 'pirbux');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [statusMessage, setStatusMessage] = useState<{ text: string; type: 'success' | 'error' } | null>(null);
  const importInputRef = useRef<HTMLInputElement>(null);

  const handleSaveCredentials = (e: React.FormEvent) => {
    e.preventDefault();
    if (!username.trim()) {
      setStatusMessage({ text: 'Username / Login ID cannot be empty.', type: 'error' });
      return;
    }

    if (newPassword && newPassword !== confirmPassword) {
      setStatusMessage({ text: 'Passwords do not match.', type: 'error' });
      return;
    }

    onUpdateCredentials({
      ...portfolio.credentials,
      username: username.trim(),
      passwordHash: newPassword ? newPassword.trim() : portfolio.credentials.passwordHash
    });

    setNewPassword('');
    setConfirmPassword('');
    setStatusMessage({ text: 'Owner credentials updated successfully!', type: 'success' });
    setTimeout(() => setStatusMessage(null), 3000);
  };

  const handleExportBackup = () => {
    const jsonStr = JSON.stringify(portfolio, null, 2);
    const blob = new Blob([jsonStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `Pir_Bux_Portfolio_Backup_${new Date().toISOString().split('T')[0]}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    setStatusMessage({ text: 'Portfolio configuration exported as JSON file!', type: 'success' });
  };

  const handleImportBackup = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const parsed = JSON.parse(event.target?.result as string);
        if (parsed.hero && parsed.experience) {
          onImportState(parsed);
          setStatusMessage({ text: 'Website backup successfully imported and restored!', type: 'success' });
        } else {
          setStatusMessage({ text: 'Invalid portfolio backup file format.', type: 'error' });
        }
      } catch (err) {
        setStatusMessage({ text: 'Could not parse JSON backup file.', type: 'error' });
      }
    };
    reader.readAsText(file);
    if (e.target) e.target.value = '';
  };

  const handleReset = () => {
    if (
      window.confirm(
        'Are you sure you want to reset everything back to the original default portfolio? All custom edits will be restored.'
      )
    ) {
      onResetDefault();
      setStatusMessage({ text: 'Portfolio reset to default successfully.', type: 'success' });
    }
  };

  return (
    <div className="space-y-6 text-[#f2f7f4] text-xs">
      {/* Alert banner */}
      {statusMessage && (
        <div
          className={`p-3 rounded-xl border flex items-center gap-2 font-medium ${
            statusMessage.type === 'success'
              ? 'bg-[#19e05f]/20 border-[#19e05f] text-[#19e05f]'
              : 'bg-red-950/70 border-red-500/50 text-red-200'
          }`}
        >
          {statusMessage.type === 'success' ? <Check className="w-4 h-4 shrink-0" /> : <AlertTriangle className="w-4 h-4 shrink-0" />}
          <span>{statusMessage.text}</span>
        </div>
      )}

      {/* Change Login Credentials Card */}
      <div className="p-5 rounded-2xl bg-[#09150d] border border-[#16271c] space-y-4">
        <div className="flex items-center gap-2.5 border-b border-[#16271c] pb-3">
          <KeyRound className="w-5 h-5 text-[#19e05f]" />
          <div>
            <h4 className="font-semibold text-white text-sm">Owner Login ID &amp; Password Settings</h4>
            <p className="text-[#9aaaa0] text-[11px]">Customize login credentials to secure your portal</p>
          </div>
        </div>

        <form onSubmit={handleSaveCredentials} className="space-y-3 max-w-lg">
          <div>
            <label className="block text-gray-400 mb-1">Login ID (Username)</label>
            <input
              type="text"
              required
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full p-2.5 bg-[#050e09] border border-[#1d4029] rounded-xl text-white text-xs focus:outline-none focus:border-[#19e05f]"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-gray-400 mb-1">New Password (leave blank to keep current)</label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  placeholder="New password..."
                  className="w-full p-2.5 pr-8 bg-[#050e09] border border-[#1d4029] rounded-xl text-white text-xs focus:outline-none focus:border-[#19e05f]"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 text-gray-500 hover:text-white"
                >
                  {showPassword ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                </button>
              </div>
            </div>

            <div>
              <label className="block text-gray-400 mb-1">Confirm New Password</label>
              <input
                type={showPassword ? 'text' : 'password'}
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Re-type new password..."
                className="w-full p-2.5 bg-[#050e09] border border-[#1d4029] rounded-xl text-white text-xs focus:outline-none focus:border-[#19e05f]"
              />
            </div>
          </div>

          <button
            type="submit"
            className="px-4 py-2 bg-[#19e05f] hover:bg-[#7cf0a3] text-[#031007] font-semibold rounded-xl text-xs transition-all"
          >
            Update Login Credentials
          </button>
        </form>
      </div>

      {/* Backup & Data Portability */}
      <div className="p-5 rounded-2xl bg-[#09150d] border border-[#16271c] space-y-4">
        <div className="flex items-center gap-2.5 border-b border-[#16271c] pb-3">
          <Shield className="w-5 h-5 text-[#19e05f]" />
          <div>
            <h4 className="font-semibold text-white text-sm">Website Backup &amp; Data Restore</h4>
            <p className="text-[#9aaaa0] text-[11px]">Save a complete JSON snapshot of your website configuration</p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="p-4 rounded-xl bg-[#050e09] border border-[#1d4029] space-y-2.5">
            <h5 className="font-semibold text-white text-xs flex items-center gap-1.5">
              <Download className="w-4 h-4 text-[#19e05f]" />
              <span>Export Full Configuration</span>
            </h5>
            <p className="text-gray-400 text-[11px]">
              Download your entire website data, including all edits, uploaded files, and analytics history as a single JSON file.
            </p>
            <button
              onClick={handleExportBackup}
              className="w-full py-2 px-3 bg-[#0f2d1a] border border-[#19e05f]/50 text-[#19e05f] hover:bg-[#19e05f] hover:text-[#031007] rounded-xl font-semibold transition-all"
            >
              Export JSON Backup File
            </button>
          </div>

          <div className="p-4 rounded-xl bg-[#050e09] border border-[#1d4029] space-y-2.5">
            <h5 className="font-semibold text-white text-xs flex items-center gap-1.5">
              <Upload className="w-4 h-4 text-[#19e05f]" />
              <span>Import &amp; Restore Configuration</span>
            </h5>
            <p className="text-gray-400 text-[11px]">
              Upload a previously exported JSON backup file to instantly restore your custom settings and content.
            </p>
            <input
              ref={importInputRef}
              type="file"
              accept=".json"
              onChange={handleImportBackup}
              className="hidden"
            />
            <button
              onClick={() => importInputRef.current?.click()}
              className="w-full py-2 px-3 bg-[#0b1b11] border border-[#1d5a35] text-white hover:border-[#19e05f] rounded-xl font-semibold transition-all"
            >
              Select Backup File to Restore
            </button>
          </div>
        </div>
      </div>

      {/* Danger Zone: Factory Reset */}
      <div className="p-5 rounded-2xl bg-red-950/20 border border-red-500/30 space-y-3">
        <div className="flex items-center gap-2 text-red-400 font-semibold text-sm">
          <RotateCcw className="w-4 h-4" />
          <span>Reset Portfolio to Default</span>
        </div>
        <p className="text-gray-400 text-xs">
          This will reset all sections, photos, and settings back to Pir Bux’s original portfolio values.
        </p>
        <button
          onClick={handleReset}
          className="py-2 px-4 bg-red-900/40 hover:bg-red-900/70 border border-red-500/50 text-red-200 rounded-xl font-medium transition-colors"
        >
          Reset to Factory Default
        </button>
      </div>
    </div>
  );
};
