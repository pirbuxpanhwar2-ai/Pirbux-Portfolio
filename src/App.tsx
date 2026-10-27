import React, { useState, useEffect } from 'react';
import {
  loadPortfolioState,
  savePortfolioState,
  resetPortfolioState,
  loadOwnerAuth,
  saveOwnerAuth,
  logActivity
} from './utils/storage';
import {
  PortfolioState,
  CertificateItem,
  UploadedFile,
  OwnerCredentials,
  InboxMessage,
  RecommendationItem
} from './types/portfolio';
import { Header } from './components/Header';
import { OwnerAdminBar } from './components/owner/OwnerAdminBar';
import { OwnerLoginModal } from './components/owner/OwnerLoginModal';
import { OwnerPortalModal } from './components/owner/OwnerPortalModal';
import { HeroSection } from './components/HeroSection';
import { WhyHireMe } from './components/WhyHireMe';
import { AboutSection } from './components/AboutSection';
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

export default function App() {
  const [portfolio, setPortfolio] = useState<PortfolioState>(loadPortfolioState);
  const [isOwnerLoggedIn, setIsOwnerLoggedIn] = useState<boolean>(loadOwnerAuth);
  const [showLoginModal, setShowLoginModal] = useState<boolean>(false);
  const [showPortalModal, setShowPortalModal] = useState<boolean>(false);
  const [portalInitialTab, setPortalInitialTab] = useState<string>('analytics');
  const [quickEditMode, setQuickEditMode] = useState<boolean>(false);

  const [currentLang, setCurrentLang] = useState<'en' | 'ur'>('en');
  const [activeNav, setActiveNav] = useState<string>('top');
  const [selectedCertificate, setSelectedCertificate] = useState<CertificateItem | null>(null);
  const [selectedExperienceIndex, setSelectedExperienceIndex] = useState<number | undefined>(undefined);
  const [cursorBubbleEnabled, setCursorBubbleEnabled] = useState<boolean>(true);
  const [cursorPos, setCursorPos] = useState({ x: -100, y: -100 });
  const [cursorTarget, setCursorTarget] = useState({ x: -100, y: -100 });
  const [isCursorHovering, setIsCursorHovering] = useState(false);

  // Initialize analytics session & page view on load
  useEffect(() => {
    setPortfolio((prev) =>
      logActivity(prev, 'Page View', 'Visitor loaded portfolio website', 'view', 'totalPageViews')
    );
  }, []);

  // Sync language with document attribute
  useEffect(() => {
    document.documentElement.lang = currentLang;
    document.documentElement.dir = currentLang === 'ur' ? 'rtl' : 'ltr';
  }, [currentLang]);

  // Keyboard shortcut: Ctrl+Shift+A or Cmd+Shift+A to open Owner Portal / Login
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.shiftKey && (e.key === 'A' || e.key === 'a')) {
        e.preventDefault();
        if (isOwnerLoggedIn) {
          setShowPortalModal(true);
        } else {
          setShowLoginModal(true);
        }
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOwnerLoggedIn]);

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

  // ScrollSpy to update active nav state
  useEffect(() => {
    const handleScroll = () => {
      const sections = ['top', 'experience', 'certificates', 'recommendations', 'skills', 'services', 'education', 'contact'];
      const scrollPos = window.scrollY + 200;

      for (const sectionId of sections) {
        const el = document.getElementById(sectionId);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPos >= top && scrollPos < top + height) {
            setActiveNav(sectionId);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Handlers for updating portfolio data
  const handleUpdatePortfolio = (updated: Partial<PortfolioState>) => {
    const nextState = { ...portfolio, ...updated };
    setPortfolio(nextState);
    savePortfolioState(nextState);
  };

  const handleAddFile = (file: UploadedFile) => {
    const updatedFiles = [file, ...portfolio.files];
    const nextState = { ...portfolio, files: updatedFiles };
    setPortfolio(nextState);
    savePortfolioState(nextState);

    // Track upload in activity
    setPortfolio((prev) =>
      logActivity(prev, 'File Uploaded', `Uploaded ${file.name} (${file.type})`, 'edit')
    );
  };

  const handleDeleteFile = (fileId: string) => {
    const updatedFiles = portfolio.files.filter((f) => f.id !== fileId);
    const nextState = { ...portfolio, files: updatedFiles };
    setPortfolio(nextState);
    savePortfolioState(nextState);
  };

  const handleUpdateCredentials = (credentials: OwnerCredentials) => {
    const nextState = { ...portfolio, credentials };
    setPortfolio(nextState);
    savePortfolioState(nextState);
    setPortfolio((prev) =>
      logActivity(prev, 'Credentials Updated', 'Owner credentials modified in settings', 'auth')
    );
  };

  const handleImportState = (imported: PortfolioState) => {
    setPortfolio(imported);
    savePortfolioState(imported);
  };

  const handleResetDefault = () => {
    const defaultState = resetPortfolioState();
    setPortfolio(defaultState);
  };

  const handleLoginSuccess = () => {
    setIsOwnerLoggedIn(true);
    saveOwnerAuth(true);
    setShowPortalModal(true);
    setPortfolio((prev) =>
      logActivity(prev, 'Owner Login', `Owner signed in as ${portfolio.credentials.username}`, 'auth')
    );
  };

  const handleLogout = () => {
    setIsOwnerLoggedIn(false);
    saveOwnerAuth(false);
    setShowPortalModal(false);
    setQuickEditMode(false);
  };

  const handleTrackAction = (actionName: string) => {
    setPortfolio((prev) =>
      logActivity(prev, actionName, `Visitor interaction: ${actionName}`, 'click')
    );
  };

  const handleSubmitContact = (msg: Omit<InboxMessage, 'id' | 'createdAt' | 'status'>) => {
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

    // Increment lead analytics
    setPortfolio((prev) =>
      logActivity(prev, 'Contact Message', `Inquiry from ${msg.name}: "${msg.subject}"`, 'inquiry', 'formSubmissions')
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

  const unreadInboxCount = portfolio.inbox.filter((m) => m.status === 'unread').length;

  return (
    <div className="min-h-screen bg-[#030604] text-[#f2f7f4] relative selection:bg-[#19e05f] selection:text-[#031007]">
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

      {/* Owner Admin Bar when logged in */}
      {isOwnerLoggedIn && (
        <OwnerAdminBar
          onOpenPortal={(tab) => {
            if (tab) setPortalInitialTab(tab);
            setShowPortalModal(true);
          }}
          onLogout={handleLogout}
          quickEditMode={quickEditMode}
          onToggleQuickEdit={() => setQuickEditMode(!quickEditMode)}
          unreadCount={unreadInboxCount}
        />
      )}

      {/* Website Header */}
      <div className={isOwnerLoggedIn ? 'pt-10' : ''}>
        <Header
          currentLang={currentLang}
          onToggleLang={handleToggleLang}
          isOwnerLoggedIn={isOwnerLoggedIn}
          onOpenOwnerPortal={() => {
            setPortalInitialTab('analytics');
            setShowPortalModal(true);
          }}
          onOpenLoginModal={() => setShowLoginModal(true)}
          activeNav={activeNav}
        />
      </div>

      {/* Main Website Sections */}
      <main>
        {/* 1. Hero Section */}
        <HeroSection
          hero={portfolio.hero}
          currentLang={currentLang}
          quickEditMode={quickEditMode}
          onQuickEdit={() => {
            setPortalInitialTab('content');
            setShowPortalModal(true);
          }}
        />

        {/* 2. Why Hire Me Cards */}
        <WhyHireMe
          cards={portfolio.whyCards}
          onSelectExperienceCard={(idx) => {
            setSelectedExperienceIndex(idx);
            document.getElementById('experience')?.scrollIntoView({ behavior: 'smooth' });
          }}
          quickEditMode={quickEditMode}
          onQuickEdit={() => {
            setPortalInitialTab('content');
            setShowPortalModal(true);
          }}
        />

        {/* 3. About Me Section */}
        <AboutSection
          about={portfolio.about}
          quickEditMode={quickEditMode}
          onQuickEdit={() => {
            setPortalInitialTab('content');
            setShowPortalModal(true);
          }}
        />

        {/* 4. Journey Timeline */}
        <JourneySection
          journey={portfolio.journey}
          quickEditMode={quickEditMode}
          onQuickEdit={() => {
            setPortalInitialTab('content');
            setShowPortalModal(true);
          }}
        />

        {/* 5. Experience Carousel */}
        <ExperienceCarousel
          experience={portfolio.experience}
          selectedIndex={selectedExperienceIndex}
          onSelectIndex={(idx) => setSelectedExperienceIndex(idx)}
          quickEditMode={quickEditMode}
          onQuickEdit={() => {
            setPortalInitialTab('content');
            setShowPortalModal(true);
          }}
        />

        {/* 6. Certificates & Awards */}
        <CertificatesSection
          certificates={portfolio.certificates}
          onOpenLightbox={handleOpenCertificate}
          quickEditMode={quickEditMode}
          onQuickEdit={() => {
            setPortalInitialTab('content');
            setShowPortalModal(true);
          }}
        />

        {/* 7. Recommendations & Submission Form */}
        <RecommendationsSection
          recommendations={portfolio.recommendations}
          onSubmitRecommendation={handleSubmitRecommendation}
          quickEditMode={quickEditMode}
          onQuickEdit={() => {
            setPortalInitialTab('content');
            setShowPortalModal(true);
          }}
        />

        {/* 8. Skills Section */}
        <SkillsSection
          categories={portfolio.skills}
          onSelectExperienceCard={(idx) => {
            setSelectedExperienceIndex(idx);
            document.getElementById('experience')?.scrollIntoView({ behavior: 'smooth' });
          }}
          quickEditMode={quickEditMode}
          onQuickEdit={() => {
            setPortalInitialTab('content');
            setShowPortalModal(true);
          }}
        />

        {/* 9. Services & Interactive KPI Demo */}
        <ServicesSection
          services={portfolio.services}
          whatsappNumber={portfolio.contact.whatsappNumber}
          currentLang={currentLang}
          onTrackAction={handleTrackAction}
          quickEditMode={quickEditMode}
          onQuickEdit={() => {
            setPortalInitialTab('content');
            setShowPortalModal(true);
          }}
        />

        {/* 10. Education Section */}
        <EducationSection
          education={portfolio.education}
          quickEditMode={quickEditMode}
          onQuickEdit={() => {
            setPortalInitialTab('content');
            setShowPortalModal(true);
          }}
        />

        {/* 11. Contact Section */}
        <ContactSection
          contact={portfolio.contact}
          onSubmitContact={handleSubmitContact}
          onTrackAction={handleTrackAction}
          quickEditMode={quickEditMode}
          onQuickEdit={() => {
            setPortalInitialTab('content');
            setShowPortalModal(true);
          }}
        />
      </main>

      {/* Website Footer */}
      <Footer
        cursorBubbleEnabled={cursorBubbleEnabled}
        onToggleCursorBubble={() => setCursorBubbleEnabled(!cursorBubbleEnabled)}
        isOwnerLoggedIn={isOwnerLoggedIn}
        onOpenOwnerPortal={() => {
          setPortalInitialTab('analytics');
          setShowPortalModal(true);
        }}
        onOpenLoginModal={() => setShowLoginModal(true)}
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

      {/* Owner Login Dialog */}
      <OwnerLoginModal
        isOpen={showLoginModal}
        onClose={() => setShowLoginModal(false)}
        onLoginSuccess={handleLoginSuccess}
        credentials={portfolio.credentials}
      />

      {/* Full Owner Portal Modal (Analytics, Content Editor, File Manager, Inbox, Settings) */}
      <OwnerPortalModal
        isOpen={showPortalModal}
        onClose={() => setShowPortalModal(false)}
        portfolio={portfolio}
        onUpdatePortfolio={handleUpdatePortfolio}
        onAddFile={handleAddFile}
        onDeleteFile={handleDeleteFile}
        onUpdateCredentials={handleUpdateCredentials}
        onImportState={handleImportState}
        onResetDefault={handleResetDefault}
        onLogout={handleLogout}
        initialTab={portalInitialTab}
      />
    </div>
  );
}
