import React, { useState, useEffect } from 'react';
import {
  loadPortfolioState,
  savePortfolioState,
  logActivity,
  loadSiteTheme,
  saveSiteTheme
} from './utils/storage';
import {
  PortfolioState,
  CertificateItem,
  InboxMessage
} from './types/portfolio';
import { Header } from './components/Header';
import { HeroSection } from './components/HeroSection';
import { WhyHireMe } from './components/WhyHireMe';
import { JourneySection } from './components/JourneySection';
import { ExperienceCarousel } from './components/ExperienceCarousel';
import { CertificatesSection } from './components/CertificatesSection';
import { CertificateLightbox } from './components/CertificateLightbox';
import { RecommendationsSection } from './components/RecommendationsSection';
import { SkillsSection } from './components/SkillsSection';
import { ServicesSection } from './components/ServicesSection';
import { EducationSection } from './components/EducationSection';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';
import { FloatingWhatsApp } from './components/FloatingWhatsApp';
import {
  Briefcase,
  Award,
  MessageSquareQuote,
  Sparkles,
  Layers,
  GraduationCap,
  Mail,
  Home,
  ArrowRight,
  ArrowLeft,
  ChevronRight
} from 'lucide-react';

export type PageTab =
  | 'home'
  | 'experience'
  | 'certificates'
  | 'recommendations'
  | 'skills'
  | 'services'
  | 'education'
  | 'contact';

export default function App() {
  const [portfolio, setPortfolio] = useState<PortfolioState>(loadPortfolioState);

  // Global Site Theme (Light / Dark)
  const [siteTheme, setSiteTheme] = useState<'dark' | 'light'>(loadSiteTheme);

  // Active Multi-Page Tab
  const [activeTab, setActiveTab] = useState<PageTab>(() => {
    try {
      const hash = window.location.hash.replace('#', '').toLowerCase();
      const validTabs: PageTab[] = [
        'home',
        'experience',
        'certificates',
        'recommendations',
        'skills',
        'services',
        'education',
        'contact'
      ];
      if (validTabs.includes(hash as PageTab)) {
        return hash as PageTab;
      }
      if (hash === 'top' || hash === '') return 'home';
    } catch {
      // ignore
    }
    return 'home';
  });

  const [currentLang, setCurrentLang] = useState<'en' | 'ur'>('en');
  const [selectedCertificate, setSelectedCertificate] = useState<CertificateItem | null>(null);
  const [selectedExperienceIndex, setSelectedExperienceIndex] = useState<number | undefined>(undefined);
  const [cursorBubbleEnabled, setCursorBubbleEnabled] = useState<boolean>(true);
  const [cursorPos, setCursorPos] = useState({ x: -100, y: -100 });
  const [cursorTarget, setCursorTarget] = useState({ x: -100, y: -100 });
  const [isCursorHovering, setIsCursorHovering] = useState(false);

  // Tab definitions with sequence for Prev/Next navigation
  const tabSequence: { id: PageTab; label: string; icon: React.ReactNode; subtitle: string }[] = [
    {
      id: 'home',
      label: 'Home',
      icon: <Home className="w-4 h-4" />,
      subtitle: 'Overview, Professional Journey & Core Value Proposition'
    },
    {
      id: 'experience',
      label: 'Experience',
      icon: <Briefcase className="w-4 h-4" />,
      subtitle: '6+ Years Leading Dining & Restaurant Management in Karachi'
    },
    {
      id: 'certificates',
      label: 'Certificates',
      icon: <Award className="w-4 h-4" />,
      subtitle: 'Verified Licenses, Awards & Professional Credentials'
    },
    {
      id: 'recommendations',
      label: 'Recommendations',
      icon: <MessageSquareQuote className="w-4 h-4" />,
      subtitle: 'Endorsements from Restaurant Owners, GMs & Head Chefs'
    },
    {
      id: 'skills',
      label: 'Skills',
      icon: <Sparkles className="w-4 h-4" />,
      subtitle: 'Hospitality Operations, Leadership, Multi-Lingual & Digital Tools'
    },
    {
      id: 'services',
      label: 'Services',
      icon: <Layers className="w-4 h-4" />,
      subtitle: 'Custom Excel Spreadsheets, Automated KPI Dashboards & Consultation'
    },
    {
      id: 'education',
      label: 'Education',
      icon: <GraduationCap className="w-4 h-4" />,
      subtitle: 'Academic Background & Secondary Education Qualifications'
    },
    {
      id: 'contact',
      label: 'Contact',
      icon: <Mail className="w-4 h-4" />,
      subtitle: 'Direct Phone, WhatsApp, Email, Karachi Address & QR Code'
    }
  ];

  // Initialize analytics session & page view on load
  useEffect(() => {
    setPortfolio((prev) =>
      logActivity(prev, 'Page View', 'Visitor loaded portfolio website', 'view', 'totalPageViews')
    );
  }, []);

  // Listen to hash changes for browser forward/back buttons
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.replace('#', '').toLowerCase();
      const validTabs: PageTab[] = [
        'home',
        'experience',
        'certificates',
        'recommendations',
        'skills',
        'services',
        'education',
        'contact'
      ];
      if (validTabs.includes(hash as PageTab)) {
        setActiveTab(hash as PageTab);
      } else if (hash === 'top' || hash === '') {
        setActiveTab('home');
      }
    };

    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  // Sync language with document attribute
  useEffect(() => {
    document.documentElement.lang = currentLang;
    document.documentElement.dir = currentLang === 'ur' ? 'rtl' : 'ltr';
  }, [currentLang]);

  // Sync site theme with document root & body
  useEffect(() => {
    if (siteTheme === 'light') {
      document.documentElement.classList.add('site-light');
      document.body.classList.add('site-light');
    } else {
      document.documentElement.classList.remove('site-light');
      document.body.classList.remove('site-light');
    }
  }, [siteTheme]);

  // Cursor bubble animation
  useEffect(() => {
    if (!cursorBubbleEnabled) return;

    let animFrame: number;
    const handleMouseMove = (e: MouseEvent) => {
      setCursorTarget({ x: e.clientX, y: e.clientY });
      const target = e.target as HTMLElement;
      const isInteractive = !!target.closest('a, button, input, textarea, select');
      setIsCursorHovering(isInteractive);
    };

    const updateCursor = () => {
      setCursorPos((prev) => ({
        x: prev.x + (cursorTarget.x - prev.x) * 0.18,
        y: prev.y + (cursorTarget.y - prev.y) * 0.18
      }));
      animFrame = requestAnimationFrame(updateCursor);
    };

    window.addEventListener('mousemove', handleMouseMove);
    animFrame = requestAnimationFrame(updateCursor);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(animFrame);
    };
  }, [cursorBubbleEnabled, cursorTarget]);

  // Switch page tab handler
  const handleSelectTab = (tabId: string) => {
    const target = tabId as PageTab;
    setActiveTab(target);
    window.location.hash = '#' + target;
    window.scrollTo({ top: 0, behavior: 'smooth' });

    setPortfolio((prev) =>
      logActivity(prev, 'Tab View', `Navigated to ${target} page tab`, 'view')
    );
  };

  // Toggle global site theme (dark / light)
  const handleToggleSiteTheme = () => {
    const next = siteTheme === 'dark' ? 'light' : 'dark';
    setSiteTheme(next);
    saveSiteTheme(next);
  };

  const handleTrackAction = (actionName: string) => {
    setPortfolio((prev) =>
      logActivity(prev, actionName, `Visitor interaction: ${actionName}`, 'click')
    );
  };

  const handleSubmitRecommendation = (msg: Omit<InboxMessage, 'id' | 'createdAt' | 'status'>) => {
    const newMsg: InboxMessage = {
      ...msg,
      id: 'inb-' + Date.now(),
      createdAt: new Date().toISOString().replace('T', ' ').substring(0, 16),
      status: 'unread'
    };
    const nextState = {
      ...portfolio,
      inbox: [newMsg, ...portfolio.inbox]
    };
    setPortfolio(nextState);
    savePortfolioState(nextState);

    // Increment recommendation analytics
    setPortfolio((prev) =>
      logActivity(prev, 'Recommendation Submitted', `Peer testimonial from ${msg.name}`, 'inquiry', 'recommendationsSubmitted')
    );
  };

  const handleOpenCertificate = (cert: CertificateItem) => {
    setSelectedCertificate(cert);
    setPortfolio((prev) =>
      logActivity(prev, 'Certificate Lightbox', `Viewed certificate: ${cert.title}`, 'click')
    );
  };

  const handleToggleLang = () => {
    const next = currentLang === 'en' ? 'ur' : 'en';
    setCurrentLang(next);
    setPortfolio((prev) =>
      logActivity(prev, 'Language Toggle', `Language switched to ${next === 'ur' ? 'Urdu' : 'English'}`, 'click')
    );
  };

  // Find index in sequence for Next / Prev navigation
  const currentTabIndex = tabSequence.findIndex((t) => t.id === activeTab);
  const prevTab = currentTabIndex > 0 ? tabSequence[currentTabIndex - 1] : null;
  const nextTab = currentTabIndex < tabSequence.length - 1 ? tabSequence[currentTabIndex + 1] : null;
  const currentTabInfo = tabSequence[currentTabIndex] || tabSequence[0];

  return (
    <div
      className={`min-h-screen relative selection:bg-[#19e05f] selection:text-[#031007] transition-colors duration-200 ${
        siteTheme === 'light'
          ? 'site-light bg-[#f8faf9] text-[#122117]'
          : 'bg-[#030604] text-[#f2f7f4]'
      }`}
    >
      {/* Custom Cursor Bubble */}
      {cursorBubbleEnabled && (
        <div
          style={{
            transform: `translate3d(${cursorPos.x - 8}px, ${cursorPos.y - 8}px, 0)`
          }}
          className={`fixed top-0 left-0 pointer-events-none z-50 rounded-full transition-all duration-75 hidden md:block ${
            isCursorHovering
              ? 'w-8 h-8 -ml-2 -mt-2 bg-[#19e05f]/40 blur-[1px]'
              : 'w-4 h-4 bg-[#19e05f] shadow-[0_0_12px_#19e05f]'
          }`}
          aria-hidden="true"
        />
      )}

      {/* Website Header */}
      <div>
        <Header
          currentLang={currentLang}
          onToggleLang={handleToggleLang}
          activeTab={activeTab}
          onSelectTab={handleSelectTab}
          siteTheme={siteTheme}
          onToggleSiteTheme={handleToggleSiteTheme}
        />
      </div>

      {/* Main Multi-Page Container */}
      <main className="pt-20">
        {/* Page Tab Header & Quick Navigation Bar (shown for non-home tabs) */}
        {activeTab !== 'home' && (
          <div className="max-w-[1080px] mx-auto px-5 pt-3 pb-0">
            {/* Breadcrumb row */}
            <div className="flex items-center gap-2 text-xs text-[#9aaaa0] mb-1.5">
              <button
                onClick={() => handleSelectTab('home')}
                className="hover:text-[#19e05f] transition-colors cursor-pointer flex items-center gap-1"
              >
                <Home className="w-3.5 h-3.5" />
                <span>Home</span>
              </button>
              <ChevronRight className="w-3.5 h-3.5" />
              <span className="text-[#19e05f] font-semibold">{currentTabInfo.label}</span>
            </div>
          </div>
        )}

        {/* TAB 1: HOME */}
        {activeTab === 'home' && (
          <div className="space-y-4">
            <HeroSection
              hero={portfolio.hero}
              currentLang={currentLang}
              onNavigate={(tab) => handleSelectTab(tab)}
            />

            <JourneySection
              journey={portfolio.journey}
            />

            <WhyHireMe
              cards={portfolio.whyCards}
              onSelectExperienceCard={(idx) => {
                setSelectedExperienceIndex(idx);
                handleSelectTab('experience');
              }}
            />
          </div>
        )}

        {/* TAB 2: EXPERIENCE */}
        {activeTab === 'experience' && (
          <div>
            <ExperienceCarousel
              experience={portfolio.experience}
              selectedIndex={selectedExperienceIndex}
              onSelectIndex={(idx) => setSelectedExperienceIndex(idx)}
            />
          </div>
        )}

        {/* TAB 3: CERTIFICATES */}
        {activeTab === 'certificates' && (
          <div>
            <CertificatesSection
              certificates={portfolio.certificates}
              onOpenLightbox={handleOpenCertificate}
            />
          </div>
        )}

        {/* TAB 4: RECOMMENDATIONS */}
        {activeTab === 'recommendations' && (
          <div>
            <RecommendationsSection
              recommendations={portfolio.recommendations}
              onSubmitRecommendation={handleSubmitRecommendation}
            />
          </div>
        )}

        {/* TAB 5: SKILLS */}
        {activeTab === 'skills' && (
          <div>
            <SkillsSection
              categories={portfolio.skills}
              onSelectExperienceCard={(idx) => {
                setSelectedExperienceIndex(idx);
                handleSelectTab('experience');
              }}
            />
          </div>
        )}

        {/* TAB 6: SERVICES */}
        {activeTab === 'services' && (
          <div>
            <ServicesSection
              services={portfolio.services}
              whatsappNumber={portfolio.contact.whatsappNumber}
              currentLang={currentLang}
              onTrackAction={handleTrackAction}
            />
          </div>
        )}

        {/* TAB 7: EDUCATION */}
        {activeTab === 'education' && (
          <div>
            <EducationSection
              education={portfolio.education}
            />
          </div>
        )}

        {/* TAB 8: CONTACT */}
        {activeTab === 'contact' && (
          <div>
            <ContactSection
              contact={portfolio.contact}
              onTrackAction={handleTrackAction}
            />
          </div>
        )}

        {/* Previous Tab / Next Tab Navigation Bar */}
        <div className="max-w-[1080px] mx-auto px-5 py-8 border-t border-[#16271c] mt-10">
          <div className="flex items-center justify-between gap-4">
            {prevTab ? (
              <button
                onClick={() => handleSelectTab(prevTab.id)}
                className="flex items-center gap-2 px-4 py-2.5 rounded-2xl bg-[#07110bcc] border border-[#16271c] hover:border-[#19e05f] text-gray-300 hover:text-white transition-all text-xs font-medium cursor-pointer site-card"
              >
                <ArrowLeft className="w-4 h-4 text-[#19e05f]" />
                <div className="text-left">
                  <span className="block text-[10px] text-[#9aaaa0]">Previous Page</span>
                  <span className="font-semibold text-white">{prevTab.label}</span>
                </div>
              </button>
            ) : (
              <div />
            )}

            {nextTab ? (
              <button
                onClick={() => handleSelectTab(nextTab.id)}
                className="flex items-center gap-2 px-4 py-2.5 rounded-2xl bg-[#07110bcc] border border-[#16271c] hover:border-[#19e05f] text-gray-300 hover:text-white transition-all text-xs font-medium cursor-pointer site-card ml-auto"
              >
                <div className="text-right">
                  <span className="block text-[10px] text-[#9aaaa0]">Next Page</span>
                  <span className="font-semibold text-white">{nextTab.label}</span>
                </div>
                <ArrowRight className="w-4 h-4 text-[#19e05f]" />
              </button>
            ) : (
              <button
                onClick={() => handleSelectTab('home')}
                className="flex items-center gap-2 px-4 py-2.5 rounded-2xl bg-[#07110bcc] border border-[#16271c] hover:border-[#19e05f] text-gray-300 hover:text-white transition-all text-xs font-medium cursor-pointer site-card ml-auto"
              >
                <div className="text-right">
                  <span className="block text-[10px] text-[#9aaaa0]">Back to start</span>
                  <span className="font-semibold text-white">Home Page</span>
                </div>
                <Home className="w-4 h-4 text-[#19e05f]" />
              </button>
            )}
          </div>
        </div>
      </main>

      {/* Website Footer */}
      <Footer
        cursorBubbleEnabled={cursorBubbleEnabled}
        onToggleCursorBubble={() => setCursorBubbleEnabled(!cursorBubbleEnabled)}
        onSelectTab={handleSelectTab}
        siteTheme={siteTheme}
        onToggleSiteTheme={handleToggleSiteTheme}
        isHomePage={activeTab === 'home'}
      />

      {/* Floating Sticky WhatsApp Button */}
      <FloatingWhatsApp
        whatsappNumber={portfolio.contact.whatsappNumber}
        currentLang={currentLang}
        onTrackClick={() =>
          setPortfolio((prev) =>
            logActivity(prev, 'WhatsApp Click', 'Visitor clicked floating WhatsApp widget', 'click', 'whatsappInquiries')
          )
        }
      />

      {/* Certificate Lightbox Dialog */}
      <CertificateLightbox
        certificate={selectedCertificate}
        onClose={() => setSelectedCertificate(null)}
      />
    </div>
  );
}
