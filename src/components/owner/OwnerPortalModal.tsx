import React, { useState } from 'react';
import {
  X,
  LayoutDashboard,
  Edit,
  Upload,
  Mail,
  Settings,
  ShieldCheck,
  ExternalLink,
  ChevronRight,
  LogOut,
  Sun,
  Moon
} from 'lucide-react';
import { PortfolioState, UploadedFile, RecommendationItem, OwnerCredentials, InboxMessage } from '../../types/portfolio';
import { AnalyticsDashboardTab } from './tabs/AnalyticsDashboardTab';
import { ContentEditorTab } from './tabs/ContentEditorTab';
import { FileManagerTab } from './tabs/FileManagerTab';
import { InboxTab } from './tabs/InboxTab';
import { SettingsTab } from './tabs/SettingsTab';

interface OwnerPortalModalProps {
  isOpen: boolean;
  onClose: () => void;
  portfolio: PortfolioState;
  onUpdatePortfolio: (updated: Partial<PortfolioState>) => void;
  onAddFile: (file: UploadedFile) => void;
  onDeleteFile: (fileId: string) => void;
  onUpdateCredentials: (credentials: OwnerCredentials) => void;
  onImportState: (state: PortfolioState) => void;
  onResetDefault: () => void;
  onLogout: () => void;
  initialTab?: string;
}

type TabKey = 'analytics' | 'content' | 'files' | 'inbox' | 'settings';

export const OwnerPortalModal: React.FC<OwnerPortalModalProps> = ({
  isOpen,
  onClose,
  portfolio,
  onUpdatePortfolio,
  onAddFile,
  onDeleteFile,
  onUpdateCredentials,
  onImportState,
  onResetDefault,
  onLogout,
  initialTab = 'analytics'
}) => {
  const [activeTab, setActiveTab] = useState<TabKey>(
    (initialTab as TabKey) || 'analytics'
  );

  const [portalTheme, setPortalTheme] = useState<'dark' | 'light'>(() => {
    try {
      return (localStorage.getItem('pb_portal_theme') as 'dark' | 'light') || 'dark';
    } catch {
      return 'dark';
    }
  });

  const togglePortalTheme = () => {
    const nextTheme = portalTheme === 'dark' ? 'light' : 'dark';
    setPortalTheme(nextTheme);
    try {
      localStorage.setItem('pb_portal_theme', nextTheme);
    } catch (e) {
      console.error(e);
    }
  };

  if (!isOpen) return null;

  const unreadCount = portfolio.inbox.filter((m) => m.status === 'unread').length;

  const handleMarkStatus = (id: string, status: InboxMessage['status']) => {
    const updated = portfolio.inbox.map((msg) =>
      msg.id === id ? { ...msg, status } : msg
    );
    onUpdatePortfolio({ inbox: updated });
  };

  const handleDeleteMessage = (id: string) => {
    const updated = portfolio.inbox.filter((msg) => msg.id !== id);
    onUpdatePortfolio({ inbox: updated });
  };

  const handleApproveAsRecommendation = (rec: RecommendationItem, messageId: string) => {
    const updatedRecommendations = [rec, ...portfolio.recommendations];
    const updatedInbox = portfolio.inbox.map((msg) =>
      msg.id === messageId ? { ...msg, status: 'read' as const } : msg
    );
    onUpdatePortfolio({
      recommendations: updatedRecommendations,
      inbox: updatedInbox
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 md:p-6 bg-black/90 backdrop-blur-md">
      <div
        className={`relative w-full max-w-6xl h-[92vh] flex flex-col rounded-3xl shadow-2xl overflow-hidden transition-colors ${
          portalTheme === 'light'
            ? 'portal-light bg-[#f8fafc] border border-slate-300 text-slate-800 shadow-slate-900/20'
            : 'bg-[#07110b] border border-[#1d5a35] text-[#f2f7f4] shadow-[#19e05f15]'
        }`}
        role="dialog"
        aria-modal="true"
      >
        {/* Top Header of the Portal */}
        <div
          className={`shrink-0 flex items-center justify-between px-5 py-4 border-b ${
            portalTheme === 'light'
              ? 'portal-header bg-white border-slate-200'
              : 'border-[#16271c] bg-[#09180f]'
          }`}
        >
          <div className="flex items-center gap-3">
            <div
              className={`w-10 h-10 rounded-xl border flex items-center justify-center font-bold text-sm ${
                portalTheme === 'light'
                  ? 'bg-emerald-100 text-emerald-800 border-emerald-300'
                  : 'bg-[#0e2a18] border-[#19e05f]/50 text-[#19e05f]'
              }`}
            >
              PB
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-base sm:text-lg font-bold tracking-tight">
                  Owner Portal &amp; Management Studio
                </h2>
                <span
                  className={`hidden sm:inline-flex items-center gap-1 text-[11px] font-semibold px-2.5 py-0.5 rounded-full border ${
                    portalTheme === 'light'
                      ? 'bg-emerald-100 text-emerald-800 border-emerald-300'
                      : 'text-[#19e05f] bg-[#19e05f]/15 border-[#19e05f]/40'
                  }`}
                >
                  <ShieldCheck className="w-3.5 h-3.5" />
                  Pir Bux (Owner)
                </span>
              </div>
              <p
                className={`text-xs ${
                  portalTheme === 'light' ? 'text-slate-500' : 'text-[#9aaaa0]'
                }`}
              >
                Live website content editor, file uploader &amp; traffic monitor
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 sm:gap-3">
            {/* Light / Dark Theme Switcher Button */}
            <button
              onClick={togglePortalTheme}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl border text-xs font-semibold transition-all ${
                portalTheme === 'light'
                  ? 'bg-amber-100/80 border-amber-300 text-amber-900 hover:bg-amber-200'
                  : 'bg-[#0b1d12] border-[#1d5a35] text-[#19e05f] hover:border-[#19e05f]'
              }`}
              title={`Switch to ${portalTheme === 'dark' ? 'Light' : 'Dark'} Theme`}
            >
              {portalTheme === 'dark' ? (
                <>
                  <Sun className="w-3.5 h-3.5 text-amber-400" />
                  <span className="hidden sm:inline">Light Theme</span>
                </>
              ) : (
                <>
                  <Moon className="w-3.5 h-3.5 text-indigo-600" />
                  <span className="hidden sm:inline">Dark Theme</span>
                </>
              )}
            </button>

            {/* View live site button */}
            <button
              onClick={onClose}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl border text-xs transition-all ${
                portalTheme === 'light'
                  ? 'bg-slate-100 hover:bg-slate-200 border-slate-300 text-slate-700'
                  : 'bg-[#0b1b11] hover:bg-[#153421] border-[#1d4029] text-gray-200'
              }`}
            >
              <ExternalLink className="w-3.5 h-3.5 text-[#19e05f]" />
              <span className="hidden sm:inline">View Live Site</span>
            </button>

            {/* Close modal */}
            <button
              onClick={onClose}
              className={`p-1.5 rounded-xl transition-colors ${
                portalTheme === 'light'
                  ? 'text-slate-500 hover:text-slate-900 hover:bg-slate-200'
                  : 'text-gray-400 hover:text-white hover:bg-white/10'
              }`}
              aria-label="Close owner portal"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Tab Navigation Bar */}
        <div
          className={`shrink-0 px-4 pt-2 border-b flex items-center gap-2 overflow-x-auto scrollbar-none text-xs ${
            portalTheme === 'light'
              ? 'portal-tabs-bar bg-slate-100 border-slate-200'
              : 'bg-[#08140c] border-[#16271c]'
          }`}
        >
          {[
            { id: 'analytics', label: 'Traffic & Engagement', icon: LayoutDashboard },
            { id: 'content', label: 'Website Content Editor', icon: Edit },
            { id: 'files', label: 'Media & File Uploads', icon: Upload },
            { id: 'inbox', label: 'Inquiries & Leads', icon: Mail, badge: unreadCount },
            { id: 'settings', label: 'Settings & Themes', icon: Settings }
          ].map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as TabKey)}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-t-xl font-medium border-b-2 transition-all whitespace-nowrap ${
                  isActive
                    ? portalTheme === 'light'
                      ? 'border-[#107036] text-[#0f6a33] bg-white shadow-sm font-semibold'
                      : 'border-[#19e05f] text-[#19e05f] bg-[#0c2214]'
                    : portalTheme === 'light'
                    ? 'border-transparent text-slate-600 hover:text-slate-900 hover:bg-slate-200/50'
                    : 'border-transparent text-gray-400 hover:text-white hover:bg-white/5'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{tab.label}</span>
                {tab.badge && tab.badge > 0 ? (
                  <span className="px-1.5 py-0.2 rounded-full bg-amber-500 text-black text-[10px] font-bold">
                    {tab.badge}
                  </span>
                ) : null}
              </button>
            );
          })}
        </div>

        {/* Tab Content Body (Scrollable) */}
        <div
          className={`flex-1 overflow-y-auto p-4 sm:p-6 ${
            portalTheme === 'light' ? 'bg-[#f1f5f9]' : 'bg-[#030604]'
          }`}
        >
          {activeTab === 'analytics' && (
            <AnalyticsDashboardTab
              analytics={portfolio.analytics}
              onRefreshMetrics={() => {
                alert('Analytics refreshed with latest session stats!');
              }}
            />
          )}

          {activeTab === 'content' && (
            <ContentEditorTab
              portfolio={portfolio}
              onUpdatePortfolio={onUpdatePortfolio}
              files={portfolio.files}
            />
          )}

          {activeTab === 'files' && (
            <FileManagerTab
              files={portfolio.files}
              onAddFile={onAddFile}
              onDeleteFile={onDeleteFile}
              portfolio={portfolio}
              onUpdatePortfolio={onUpdatePortfolio}
            />
          )}

          {activeTab === 'inbox' && (
            <InboxTab
              messages={portfolio.inbox}
              onMarkStatus={handleMarkStatus}
              onDeleteMessage={handleDeleteMessage}
              onApproveAsRecommendation={handleApproveAsRecommendation}
            />
          )}

          {activeTab === 'settings' && (
            <SettingsTab
              portfolio={portfolio}
              onUpdateCredentials={onUpdateCredentials}
              onImportState={onImportState}
              onResetDefault={onResetDefault}
              currentTheme={portalTheme}
              onSelectTheme={(theme) => {
                setPortalTheme(theme);
                localStorage.setItem('pb_portal_theme', theme);
              }}
            />
          )}
        </div>

        {/* Bottom Status Footer */}
        <div
          className={`shrink-0 px-5 py-2.5 border-t flex items-center justify-between text-[11px] ${
            portalTheme === 'light'
              ? 'portal-footer bg-white border-slate-200 text-slate-500'
              : 'bg-[#07130b] border-[#16271c] text-[#9aaaa0]'
          }`}
        >
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#19e05f]" />
            <span>Portal Status: Ready • All changes sync directly to live portfolio</span>
          </div>

          <div className="flex items-center gap-4">
            <span className="hidden sm:inline">Theme: <strong className="capitalize">{portalTheme}</strong></span>
            <span>•</span>
            <span className="hidden sm:inline">Owner ID: {portfolio.credentials.username}</span>
            <button
              onClick={() => {
                onLogout();
                onClose();
              }}
              className="text-red-500 hover:text-red-600 font-medium flex items-center gap-1"
            >
              <LogOut className="w-3 h-3" />
              <span>Log Out</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
