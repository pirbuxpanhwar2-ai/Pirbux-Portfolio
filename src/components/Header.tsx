import React, { useState } from 'react';
import { KeyRound, ShieldCheck, Globe, Menu, X, ArrowUpRight } from 'lucide-react';

interface HeaderProps {
  currentLang: 'en' | 'ur';
  onToggleLang: () => void;
  isOwnerLoggedIn: boolean;
  onOpenOwnerPortal: () => void;
  onOpenLoginModal: () => void;
  activeNav: string;
}

export const Header: React.FC<HeaderProps> = ({
  currentLang,
  onToggleLang,
  isOwnerLoggedIn,
  onOpenOwnerPortal,
  onOpenLoginModal,
  activeNav
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { href: '#top', label: currentLang === 'ur' ? 'ہوم' : 'Home' },
    { href: '#experience', label: currentLang === 'ur' ? 'تجربہ' : 'Experience' },
    { href: '#certificates', label: currentLang === 'ur' ? 'سرٹیفکیٹس' : 'Certificates' },
    { href: '#recommendations', label: currentLang === 'ur' ? 'سفارشات' : 'Recommendations' },
    { href: '#skills', label: currentLang === 'ur' ? 'مہارتیں' : 'Skills' },
    { href: '#services', label: currentLang === 'ur' ? 'خدمات' : 'Services' },
    { href: '#education', label: currentLang === 'ur' ? 'تعلیم' : 'Education' },
    { href: '#contact', label: currentLang === 'ur' ? 'رابطہ' : 'Contact' }
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-30 pt-safe bg-gradient-to-b from-[#030604f2] to-[#03060400] backdrop-blur-[2px]">
      <div className="max-w-[1180px] mx-auto px-5 h-[68px] flex items-center justify-between">
        {/* Brand */}
        <a href="#top" className="flex flex-col font-semibold text-lg leading-tight text-white group">
          <span>Pir Bux</span>
          <small className="text-[11px] font-medium tracking-widest uppercase text-[#19e05f] group-hover:text-[#7cf0a3] transition-colors">
            {currentLang === 'ur' ? 'ہاسپیٹیلیٹی پروفیشنل' : 'Hospitality Professional'}
          </small>
        </a>

        {/* Desktop Nav */}
        <nav className="hidden lg:flex items-center gap-7 text-sm font-medium">
          {navLinks.map((link) => {
            const isActive = activeNav === link.href.replace('#', '');
            return (
              <a
                key={link.href}
                href={link.href}
                className={`relative transition-colors ${
                  isActive ? 'text-[#19e05f]' : 'text-gray-200 hover:text-[#19e05f]'
                }`}
              >
                {isActive && (
                  <span className="absolute -left-2.5 top-1/2 -translate-y-1/2 w-1.5 h-1.5 rounded-full bg-[#19e05f]" />
                )}
                <span>{link.label}</span>
              </a>
            );
          })}
        </nav>

        {/* Actions on the right */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Owner Portal / Login Access Button */}
          {isOwnerLoggedIn ? (
            <button
              onClick={onOpenOwnerPortal}
              className="flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-full bg-[#19e05f]/20 border border-[#19e05f] text-[#19e05f] hover:bg-[#19e05f] hover:text-[#031007] transition-all shadow-md shadow-[#19e05f22]"
              title="Open Owner Management Portal"
            >
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Owner Portal</span>
            </button>
          ) : (
            <button
              onClick={onOpenLoginModal}
              className="flex items-center gap-1.5 text-xs font-medium px-3 py-1.5 rounded-full bg-[#0a1510] border border-[#1d5a35] text-gray-300 hover:border-[#19e05f] hover:text-[#19e05f] transition-all"
              title="Owner Login (Pir Bux)"
            >
              <KeyRound className="w-3.5 h-3.5 text-[#19e05f]" />
              <span className="hidden sm:inline">Owner Login</span>
            </button>
          )}

          {/* Language Toggle (English / Urdu) */}
          <button
            onClick={onToggleLang}
            type="button"
            className="px-3 py-1.5 rounded-full bg-[#0a1510] border border-[#1d5a35] text-gray-200 text-xs font-medium hover:border-[#19e05f] hover:text-[#19e05f] transition-all"
            aria-label={currentLang === 'en' ? 'Switch to Urdu' : 'Switch to English'}
          >
            {currentLang === 'en' ? 'اردو' : 'English'}
          </button>

          {/* Contact CTA */}
          <a
            href="#contact"
            className="hidden md:inline-flex items-center gap-1.5 bg-[#19e05f] hover:bg-[#7cf0a3] text-[#031007] font-semibold text-xs px-4 py-2 rounded-full transition-all shadow-md shadow-[#19e05f33] hover:-translate-y-0.5"
          >
            {currentLang === 'ur' ? 'رابطہ کریں' : 'Contact me'}
          </a>

          {/* Mobile menu toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 rounded-xl border border-[#16271c] text-white hover:border-[#19e05f] transition-colors"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Nav dropdown */}
      {mobileMenuOpen && (
        <div className="lg:hidden mx-4 mt-2 p-4 bg-[#07110bf8] border border-[#16271c] rounded-2xl flex flex-col space-y-1 shadow-2xl backdrop-blur-xl">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setMobileMenuOpen(false)}
              className="py-2.5 px-3 text-sm font-medium text-gray-200 hover:text-[#19e05f] border-b border-[#16271c] last:border-0"
            >
              {link.label}
            </a>
          ))}
          <div className="pt-2 flex flex-col gap-2">
            <a
              href="#contact"
              onClick={() => setMobileMenuOpen(false)}
              className="text-center py-2 bg-[#19e05f] text-[#031007] font-semibold rounded-xl text-xs"
            >
              {currentLang === 'ur' ? 'رابطہ کریں' : 'Contact me'}
            </a>
            {!isOwnerLoggedIn && (
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenLoginModal();
                }}
                className="w-full py-2 bg-[#0a1510] border border-[#1d5a35] text-gray-300 rounded-xl text-xs flex items-center justify-center gap-1.5"
              >
                <KeyRound className="w-3.5 h-3.5 text-[#19e05f]" />
                <span>Owner Portal Login</span>
              </button>
            )}
          </div>
        </div>
      )}
    </header>
  );
};
