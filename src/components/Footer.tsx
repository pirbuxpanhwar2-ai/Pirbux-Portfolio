import React from 'react';
import { KeyRound, ShieldCheck, Sun, Moon } from 'lucide-react';

interface FooterProps {
  cursorBubbleEnabled: boolean;
  onToggleCursorBubble: () => void;
  isOwnerLoggedIn: boolean;
  onOpenOwnerPortal: () => void;
  onOpenLoginModal: () => void;
  onSelectTab: (tabId: string) => void;
  siteTheme: 'dark' | 'light';
  onToggleSiteTheme: () => void;
  isHomePage?: boolean;
}

export const Footer: React.FC<FooterProps> = ({
  cursorBubbleEnabled,
  onToggleCursorBubble,
  isOwnerLoggedIn,
  onOpenOwnerPortal,
  onOpenLoginModal,
  onSelectTab,
  siteTheme,
  onToggleSiteTheme,
  isHomePage = true
}) => {
  const currentUrl = window.location.href;
  const shareTitle = encodeURIComponent('Pir Bux | Hospitality & Restaurant Management');
  const shareUrl = encodeURIComponent(currentUrl);

  const footerTabs = [
    { id: 'home', label: 'Home' },
    { id: 'experience', label: 'Experience' },
    { id: 'certificates', label: 'Certificates' },
    { id: 'recommendations', label: 'Recommendations' },
    { id: 'skills', label: 'Skills' },
    { id: 'services', label: 'Services' },
    { id: 'education', label: 'Education' },
    { id: 'contact', label: 'Contact' }
  ];

  return (
    <footer className={`${isHomePage ? 'pt-5 pb-4 sm:pt-6 sm:pb-4' : 'py-3 sm:py-3.5'} bg-[radial-gradient(ellipse_70%_60%_at_30%_100%,#19e05f15,transparent_70%)] border-t border-[#16271c] transition-colors`}>
      <div className="max-w-[1080px] mx-auto px-5">
        {/* Upper Collaborate & Links Section - shown ONLY on first page */}
        {isHomePage && (
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 pb-4 border-b border-[#16271c]">
            <div>
              <span className="text-[10px] uppercase tracking-widest font-semibold text-[#19e05f] mb-0.5 block">
                Hospitality &amp; Restaurant Operations
              </span>
              <h2 className="text-base sm:text-lg font-normal uppercase leading-snug text-white max-w-md">
                Collaborate with Pir Bux for great restaurant service
              </h2>
            </div>

            <div className="flex flex-col gap-2">
              {/* Page Tab Links - strictly in one line */}
              <div className="flex items-center flex-nowrap overflow-x-auto scrollbar-none gap-x-3 sm:gap-x-4 text-xs text-[#9aaaa0] whitespace-nowrap">
                {footerTabs.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => onSelectTab(tab.id)}
                    className="hover:text-[#19e05f] transition-colors cursor-pointer whitespace-nowrap shrink-0"
                  >
                    {tab.label}
                  </button>
                ))}
              </div>

              {/* Social & Sharing Links */}
              <div className="flex flex-wrap gap-3.5 text-[11px] text-[#5c6c62]">
                <a
                  href="https://www.linkedin.com/in/pir-bux-945b58332"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-[#19e05f] transition-colors"
                >
                  LinkedIn Profile ↗
                </a>
                <a
                  href={`https://wa.me/?text=${shareTitle}%20${shareUrl}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-[#19e05f] transition-colors"
                >
                  Share WhatsApp ↗
                </a>
                <a
                  href={`https://www.linkedin.com/sharing/share-offsite/?url=${shareUrl}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-[#19e05f] transition-colors"
                >
                  Share LinkedIn ↗
                </a>
              </div>
            </div>
          </div>
        )}

        {/* Bottom bar */}
        <div className={`${isHomePage ? 'mt-3 sm:mt-3.5' : 'mt-0'} flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-[#5c6c62]`}>
          <p>© {new Date().getFullYear()} Pir Bux · Hospitality &amp; Restaurant Management.</p>

          <div className="flex flex-wrap items-center gap-3 sm:gap-4">
            {/* Global Theme Toggle Button */}
            <button
              onClick={onToggleSiteTheme}
              className="flex items-center gap-1.5 px-3 py-1 rounded-full border border-[#16271c] hover:border-[#1d5a35] text-gray-400 hover:text-white transition-colors cursor-pointer"
            >
              {siteTheme === 'light' ? (
                <>
                  <Moon className="w-3.5 h-3.5 text-indigo-400" />
                  <span>Dark Mode</span>
                </>
              ) : (
                <>
                  <Sun className="w-3.5 h-3.5 text-amber-400" />
                  <span>Light Mode</span>
                </>
              )}
            </button>

            {/* Cursor bubble toggle */}
            <button
              onClick={onToggleCursorBubble}
              className="px-3 py-1 rounded-full border border-[#16271c] hover:border-[#1d5a35] text-gray-400 hover:text-white transition-colors cursor-pointer"
            >
              Cursor: {cursorBubbleEnabled ? 'on' : 'off'}
            </button>

            {/* Owner Access link in footer */}
            {isOwnerLoggedIn ? (
              <button
                onClick={onOpenOwnerPortal}
                className="flex items-center gap-1.5 text-[#19e05f] hover:underline font-semibold cursor-pointer"
              >
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>Owner Dashboard</span>
              </button>
            ) : (
              <button
                onClick={onOpenLoginModal}
                className="flex items-center gap-1 text-gray-500 hover:text-[#19e05f] transition-colors cursor-pointer"
              >
                <KeyRound className="w-3 h-3" />
                <span>Owner Portal Access</span>
              </button>
            )}
          </div>
        </div>
      </div>
    </footer>
  );
};
