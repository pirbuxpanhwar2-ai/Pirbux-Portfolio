import React from 'react';
import { KeyRound, ShieldCheck } from 'lucide-react';

interface FooterProps {
  cursorBubbleEnabled: boolean;
  onToggleCursorBubble: () => void;
  isOwnerLoggedIn: boolean;
  onOpenOwnerPortal: () => void;
  onOpenLoginModal: () => void;
}

export const Footer: React.FC<FooterProps> = ({
  cursorBubbleEnabled,
  onToggleCursorBubble,
  isOwnerLoggedIn,
  onOpenOwnerPortal,
  onOpenLoginModal
}) => {
  const currentUrl = window.location.href;
  const shareTitle = encodeURIComponent('Pir Bux | Hospitality & Restaurant Management');
  const shareUrl = encodeURIComponent(currentUrl);

  return (
    <footer className="pt-20 pb-8 bg-[radial-gradient(ellipse_70%_60%_at_30%_100%,#19e05f1f,transparent_70%)] border-t border-[#16271c]">
      <div className="max-w-[1080px] mx-auto px-5">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-8 pb-12 border-b border-[#16271c]">
          <h2 className="text-2xl sm:text-3xl font-normal uppercase leading-tight text-white max-w-md">
            Collaborate with Pir Bux and bring great service to your restaurant
          </h2>

          <div className="flex flex-wrap gap-6 text-xs sm:text-sm text-[#9aaaa0]">
            <a href="#experience" className="hover:text-[#19e05f] transition-colors">
              Experience
            </a>
            <a href="#skills" className="hover:text-[#19e05f] transition-colors">
              Skills
            </a>
            <a
              href="https://www.linkedin.com/in/pir-bux-945b58332"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-[#19e05f] transition-colors"
            >
              LinkedIn
            </a>
            <a
              href={`https://wa.me/?text=${shareTitle}%20${shareUrl}`}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-[#19e05f] transition-colors"
            >
              Share on WhatsApp
            </a>
            <a
              href={`https://www.linkedin.com/sharing/share-offsite/?url=${shareUrl}`}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-[#19e05f] transition-colors"
            >
              Share on LinkedIn
            </a>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#5c6c62]">
          <p>© {new Date().getFullYear()} Pir Bux. All rights reserved.</p>

          <div className="flex items-center gap-4">
            {/* Cursor bubble toggle */}
            <button
              onClick={onToggleCursorBubble}
              className="px-3 py-1 rounded-full border border-[#16271c] hover:border-[#1d5a35] text-gray-400 hover:text-white transition-colors"
            >
              Cursor bubble: {cursorBubbleEnabled ? 'on' : 'off'}
            </button>

            {/* Owner Access link in footer */}
            {isOwnerLoggedIn ? (
              <button
                onClick={onOpenOwnerPortal}
                className="flex items-center gap-1.5 text-[#19e05f] hover:underline font-semibold"
              >
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>Owner Dashboard</span>
              </button>
            ) : (
              <button
                onClick={onOpenLoginModal}
                className="flex items-center gap-1 text-gray-500 hover:text-[#19e05f] transition-colors"
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
