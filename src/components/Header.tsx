import React, { useState } from 'react';
import { Sun, Moon, Menu, X } from 'lucide-react';

interface HeaderProps {
  currentLang: 'en' | 'ur';
  onToggleLang: () => void;
  activeTab: string;
  onSelectTab: (tabId: string) => void;
  siteTheme: 'dark' | 'light';
  onToggleSiteTheme: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentLang,
  onToggleLang,
  activeTab,
  onSelectTab,
  siteTheme,
  onToggleSiteTheme
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const tabs = [
    { id: 'home', label: currentLang === 'ur' ? 'ہوم' : 'Home' },
    { id: 'experience', label: currentLang === 'ur' ? 'تجربہ' : 'Experience' },
    { id: 'certificates', label: currentLang === 'ur' ? 'سرٹیفکیٹس' : 'Certificates' },
    { id: 'recommendations', label: currentLang === 'ur' ? 'سفارشات' : 'Recommendations' },
    { id: 'skills', label: currentLang === 'ur' ? 'مہارتیں' : 'Skills' },
    { id: 'services', label: currentLang === 'ur' ? 'خدمات' : 'Services' },
    { id: 'education', label: currentLang === 'ur' ? 'تعلیم' : 'Education' },
    { id: 'contact', label: currentLang === 'ur' ? 'رابطہ' : 'Contact' }
  ];

  const handleTabClick = (tabId: string) => {
    onSelectTab(tabId);
    setMobileMenuOpen(false);
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-30 pt-safe bg-gradient-to-b from-[#030604f2] to-[#03060400] backdrop-blur-[2px] transition-colors">
      <div className="max-w-[1240px] mx-auto px-4 sm:px-6 h-[70px] flex items-center justify-between">
        {/* Brand */}
        <button
          onClick={() => handleTabClick('home')}
          className="flex flex-col text-left font-semibold text-lg leading-tight text-white group cursor-pointer"
        >
          <span>Pir Bux</span>
          <small className="text-[11px] font-medium tracking-widest uppercase text-[#19e05f] group-hover:text-[#7cf0a3] transition-colors">
            {currentLang === 'ur' ? 'ہاسپیٹیلیٹی پروفیشنل' : 'Hospitality Professional'}
          </small>
        </button>

        {/* Desktop Page Navigation Tabs */}
        <nav className="hidden xl:flex items-center gap-1.5 p-1 rounded-full bg-[#07110bcc] border border-[#16271c] backdrop-blur-md">
          {tabs.map((tab) => {
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => handleTabClick(tab.id)}
                className={`px-3.5 py-1.5 rounded-full text-xs font-medium transition-all cursor-pointer relative ${
                  isActive
                    ? 'bg-[#19e05f] text-[#031007] font-semibold shadow-md shadow-[#19e05f33]'
                    : 'text-gray-300 hover:text-white hover:bg-white/5'
                }`}
              >
                <span>{tab.label}</span>
              </button>
            );
          })}
        </nav>

        {/* Medium Screen Nav (More compact) */}
        <nav className="hidden lg:flex xl:hidden items-center gap-4 text-xs font-medium">
          {tabs.slice(0, 5).map((tab) => {
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => handleTabClick(tab.id)}
                className={`transition-colors cursor-pointer ${
                  isActive ? 'text-[#19e05f] font-semibold underline underline-offset-4' : 'text-gray-300 hover:text-white'
                }`}
              >
                <span>{tab.label}</span>
              </button>
            );
          })}
          <button
            onClick={() => handleTabClick('contact')}
            className={`transition-colors cursor-pointer ${
              activeTab === 'contact' ? 'text-[#19e05f] font-semibold' : 'text-gray-300 hover:text-white'
            }`}
          >
            {currentLang === 'ur' ? 'رابطہ' : 'Contact'}
          </button>
        </nav>

        {/* Actions on the right */}
        <div className="flex items-center gap-2 sm:gap-2.5">
          {/* Global Light / Dark Theme Switcher Button */}
          <button
            onClick={onToggleSiteTheme}
            type="button"
            className="flex items-center gap-1 px-2.5 sm:px-3 py-1.5 rounded-full bg-[#0a1510] border border-[#1d5a35] text-gray-200 text-xs font-medium hover:border-[#19e05f] hover:text-[#19e05f] transition-all cursor-pointer shadow-sm"
            title={siteTheme === 'light' ? 'Switch to Dark Mode' : 'Switch to Light Mode'}
            aria-label="Toggle site theme"
          >
            {siteTheme === 'light' ? (
              <>
                <Moon className="w-3.5 h-3.5 text-indigo-400" />
                <span className="hidden sm:inline">Dark</span>
              </>
            ) : (
              <>
                <Sun className="w-3.5 h-3.5 text-amber-400" />
                <span className="hidden sm:inline">Light</span>
              </>
            )}
          </button>

          {/* Language Toggle (English / Urdu) */}
          <button
            onClick={onToggleLang}
            type="button"
            className="px-2.5 sm:px-3 py-1.5 rounded-full bg-[#0a1510] border border-[#1d5a35] text-gray-200 text-xs font-medium hover:border-[#19e05f] hover:text-[#19e05f] transition-all cursor-pointer"
            aria-label={currentLang === 'en' ? 'Switch to Urdu' : 'Switch to English'}
          >
            {currentLang === 'en' ? 'اردو' : 'English'}
          </button>

          {/* Mobile menu toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 rounded-xl border border-[#16271c] text-white hover:border-[#19e05f] transition-colors cursor-pointer"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Nav Dropdown with Page Tabs */}
      {mobileMenuOpen && (
        <div className="lg:hidden mx-4 mt-2 p-4 bg-[#07110bf8] border border-[#16271c] rounded-2xl flex flex-col space-y-1 shadow-2xl backdrop-blur-xl">
          <div className="text-[11px] font-semibold uppercase tracking-wider text-[#19e05f] px-3 pb-2 border-b border-[#16271c]">
            Pages &amp; Tabs
          </div>
          <div className="grid grid-cols-2 gap-1 pt-1">
            {tabs.map((tab) => {
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => handleTabClick(tab.id)}
                  className={`text-left py-2 px-3 text-xs font-medium rounded-xl transition-all cursor-pointer ${
                    isActive
                      ? 'bg-[#19e05f] text-[#031007] font-semibold shadow-sm'
                      : 'text-gray-200 hover:text-[#19e05f] hover:bg-white/5'
                  }`}
                >
                  {tab.label}
                </button>
              );
            })}
          </div>

          <div className="pt-3 border-t border-[#16271c] flex items-center justify-between">
            <button
              onClick={() => {
                onToggleSiteTheme();
                setMobileMenuOpen(false);
              }}
              className="text-xs text-gray-300 flex items-center gap-1.5 py-1.5"
            >
              {siteTheme === 'light' ? <Moon className="w-4 h-4 text-indigo-400" /> : <Sun className="w-4 h-4 text-amber-400" />}
              <span>{siteTheme === 'light' ? 'Switch to Dark Theme' : 'Switch to Light Theme'}</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
