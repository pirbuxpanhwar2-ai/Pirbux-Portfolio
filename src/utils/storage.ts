import { PortfolioState, ActivityLogItem } from '../types/portfolio';
import { initialPortfolioData } from '../data/defaultPortfolio';

const STORAGE_KEY = 'pb_portfolio_state_v1';
const AUTH_KEY = 'pb_owner_auth_v1';

const SITE_THEME_KEY = 'pb_site_theme_v1';

export function loadSiteTheme(): 'dark' | 'light' {
  try {
    const saved = localStorage.getItem(SITE_THEME_KEY);
    if (saved === 'light' || saved === 'dark') return saved;
  } catch {
    // ignore
  }
  return 'dark';
}

export function saveSiteTheme(theme: 'dark' | 'light'): void {
  try {
    localStorage.setItem(SITE_THEME_KEY, theme);
  } catch (err) {
    console.error('Error saving site theme to localStorage:', err);
  }
}

export function loadPortfolioState(): PortfolioState {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return initialPortfolioData;
    const parsed = JSON.parse(raw);

    // If existing saved credentials had the old 'admin123' or 'pirbux', seamlessly upgrade to 'admin'/'admin'
    const loadedPassword = parsed.credentials?.passwordHash === 'admin123' ? 'admin' : (parsed.credentials?.passwordHash || 'admin');
    const loadedUsername = parsed.credentials?.username === 'pirbux' ? 'admin' : (parsed.credentials?.username || 'admin');
    const loadedRecoveryEmail = parsed.credentials?.recoveryEmail || 'pirbuxpanhwar2@gmail.com';

    // Ensure experiences have both the merged Khoj card and the Waiter to Manager Marhaba card
    const hasUpdatedMarhaba = Array.isArray(parsed.experience) && parsed.experience.some(
      (e: any) => e && (e.role?.toLowerCase?.().includes('waiter') || e.details?.toLowerCase?.().includes('humble waiter'))
    );
    const hasMergedKhoj = Array.isArray(parsed.experience) && parsed.experience.some(
      (e: any) => e && Array.isArray(e.bullets) && e.bullets.length > 0
    );
    const isExperienceUpToDate = hasMergedKhoj && hasUpdatedMarhaba;

    // Purge any mock/sample data from inbox, files, and analytics
    const hasMockInbox = Array.isArray(parsed.inbox) && parsed.inbox.some(
      (m: any) => m && (m.id === 'inb-1' || m.email?.includes('tariq.dining') || m.email?.includes('flavorshospitality'))
    );
    const hasMockFiles = Array.isArray(parsed.files) && parsed.files.some(
      (f: any) => f && (f.id === 'file-1' || f.id === 'file-2')
    );
    const hasMockAnalytics =
      (parsed.analytics?.summary?.totalPageViews ?? 0) >= 1000 ||
      (Array.isArray(parsed.analytics?.dailyTraffic) &&
        parsed.analytics?.dailyTraffic.some((d: any) => d && d.date === '2026-10-20'));

    const heroSlides = Array.isArray(parsed.hero?.slides) && parsed.hero.slides.length > 0
      ? parsed.hero.slides
      : initialPortfolioData.hero.slides;

    return {
      ...initialPortfolioData,
      ...parsed,
      experience: isExperienceUpToDate ? parsed.experience : initialPortfolioData.experience,
      journey: isExperienceUpToDate ? (parsed.journey || initialPortfolioData.journey) : initialPortfolioData.journey,
      about: (parsed.about && parsed.about.heading) ? parsed.about : initialPortfolioData.about,
      skills: (Array.isArray(parsed.skills) && parsed.skills.length > 0) ? parsed.skills : initialPortfolioData.skills,
      whyCards: (Array.isArray(parsed.whyCards) && parsed.whyCards.length > 0) ? parsed.whyCards : initialPortfolioData.whyCards,
      services: (Array.isArray(parsed.services) && parsed.services.length > 0) ? parsed.services : initialPortfolioData.services,
      certificates: (Array.isArray(parsed.certificates) && parsed.certificates.length > 0) ? parsed.certificates : initialPortfolioData.certificates,
      recommendations: (Array.isArray(parsed.recommendations) && parsed.recommendations.length > 0) ? parsed.recommendations : initialPortfolioData.recommendations,
      education: (Array.isArray(parsed.education) && parsed.education.length > 0) ? parsed.education : initialPortfolioData.education,
      files: hasMockFiles ? [] : (Array.isArray(parsed.files) ? parsed.files : []),
      inbox: hasMockInbox ? [] : (Array.isArray(parsed.inbox) ? parsed.inbox : []),
      analytics: hasMockAnalytics
        ? initialPortfolioData.analytics
        : {
            ...initialPortfolioData.analytics,
            ...(parsed.analytics || {}),
            summary: {
              ...initialPortfolioData.analytics.summary,
              ...(parsed.analytics?.summary || {})
            }
          },
      hero: {
        ...initialPortfolioData.hero,
        ...(parsed.hero || {}),
        slides: heroSlides
      },
      contact: { ...initialPortfolioData.contact, ...(parsed.contact || {}) },
      credentials: {
        ...initialPortfolioData.credentials,
        username: loadedUsername,
        passwordHash: loadedPassword,
        recoveryEmail: loadedRecoveryEmail,
        rememberMe: true,
        lastLogin: parsed.credentials?.lastLogin || initialPortfolioData.credentials.lastLogin
      }
    };
  } catch (err) {
    console.error('Error loading portfolio state from localStorage:', err);
    return initialPortfolioData;
  }
}

export function savePortfolioState(state: PortfolioState): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch (err) {
    console.error('Error saving portfolio state to localStorage:', err);
  }
}

export function resetPortfolioState(): PortfolioState {
  try {
    localStorage.removeItem(STORAGE_KEY);
  } catch (err) {
    console.error('Error clearing localStorage:', err);
  }
  return initialPortfolioData;
}

export function loadOwnerAuth(): boolean {
  try {
    return localStorage.getItem(AUTH_KEY) === 'true';
  } catch {
    return false;
  }
}

export function saveOwnerAuth(isLoggedIn: boolean): void {
  try {
    if (isLoggedIn) {
      localStorage.setItem(AUTH_KEY, 'true');
    } else {
      localStorage.removeItem(AUTH_KEY);
    }
  } catch (err) {
    console.error('Error saving auth to localStorage:', err);
  }
}

export function logActivity(
  state: PortfolioState,
  action: string,
  details: string,
  category: ActivityLogItem['category'],
  metricToIncrement?: keyof PortfolioState['analytics']['summary']
): PortfolioState {
  const newLog: ActivityLogItem = {
    id: 'act-' + Date.now() + '-' + Math.random().toString(36).substring(2, 6),
    timestamp: 'Just now',
    action,
    details,
    category
  };

  const updatedSummary = { ...state.analytics.summary };
  if (metricToIncrement && typeof updatedSummary[metricToIncrement] === 'number') {
    updatedSummary[metricToIncrement] = (updatedSummary[metricToIncrement] as number) + 1;
  }
  updatedSummary.engagementActions += 1;

  const updatedAnalytics = {
    ...state.analytics,
    summary: updatedSummary,
    recentActivity: [newLog, ...state.analytics.recentActivity.slice(0, 49)]
  };

  const newState = {
    ...state,
    analytics: updatedAnalytics
  };

  savePortfolioState(newState);
  return newState;
}
