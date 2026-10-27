import React from 'react';
import { ShieldCheck, LayoutDashboard, Edit3, LogOut, Bell, Upload, Eye } from 'lucide-react';

interface OwnerAdminBarProps {
  onOpenPortal: (tab?: string) => void;
  onLogout: () => void;
  quickEditMode: boolean;
  onToggleQuickEdit: () => void;
  unreadCount: number;
}

export const OwnerAdminBar: React.FC<OwnerAdminBarProps> = ({
  onOpenPortal,
  onLogout,
  quickEditMode,
  onToggleQuickEdit,
  unreadCount
}) => {
  return (
    <div className="fixed top-0 left-0 right-0 z-40 bg-[#07130b]/95 backdrop-blur-md border-b border-[#1d5a35] text-white px-3 sm:px-6 py-2 shadow-lg shadow-black/50 text-xs">
      <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2">
        {/* Left: Status & Identity */}
        <div className="flex items-center gap-2">
          <span className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#19e05f]/20 border border-[#19e05f]/50 text-[#19e05f] font-semibold text-[11px]">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>Owner Mode Active</span>
          </span>
          <span className="hidden md:inline text-gray-400">|</span>
          <span className="hidden md:inline text-gray-300 font-medium">Pir Bux Portfolio</span>
        </div>

        {/* Center / Right: Quick Actions */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Quick Edit Mode Toggle */}
          <button
            onClick={onToggleQuickEdit}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg border transition-all ${
              quickEditMode
                ? 'bg-[#19e05f] text-[#031007] border-[#19e05f] font-bold shadow-md shadow-[#19e05f33]'
                : 'bg-[#0b1b11] text-gray-300 border-[#1d4029] hover:border-[#19e05f] hover:text-white'
            }`}
            title="Toggle quick edit indicators on the page"
          >
            <Edit3 className="w-3.5 h-3.5" />
            <span>{quickEditMode ? 'Editing Mode: ON' : 'Quick Edit Mode'}</span>
          </button>

          {/* Files Quick Button */}
          <button
            onClick={() => onOpenPortal('files')}
            className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#0b1b11] border border-[#1d4029] hover:border-[#19e05f] text-gray-200 hover:text-white transition-all"
          >
            <Upload className="w-3.5 h-3.5 text-[#19e05f]" />
            <span>Upload Files</span>
          </button>

          {/* Inbox Notification Button */}
          {unreadCount > 0 && (
            <button
              onClick={() => onOpenPortal('inbox')}
              className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-amber-500/20 border border-amber-500/50 text-amber-300 hover:bg-amber-500/30 transition-all font-medium"
              title="New inquiries waiting"
            >
              <Bell className="w-3.5 h-3.5 animate-pulse" />
              <span>{unreadCount} New</span>
            </button>
          )}

          {/* Open Main Portal Button */}
          <button
            onClick={() => onOpenPortal('analytics')}
            className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-gradient-to-r from-[#19e05f] to-[#7cf0a3] text-[#031007] font-semibold hover:shadow-lg hover:shadow-[#19e05f44] transition-all"
          >
            <LayoutDashboard className="w-3.5 h-3.5" />
            <span>Dashboard &amp; Portal</span>
          </button>

          {/* Log Out */}
          <button
            onClick={onLogout}
            className="flex items-center gap-1 text-gray-400 hover:text-red-400 p-1.5 rounded-lg hover:bg-red-950/40 transition-colors"
            title="Log Out of Owner Mode"
            aria-label="Log Out"
          >
            <LogOut className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
};
