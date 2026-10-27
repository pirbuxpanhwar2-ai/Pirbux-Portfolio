import { PortfolioState, ActivityLogItem } from '../types/portfolio';
import { initialPortfolioData } from '../data/defaultPortfolio';

const STORAGE_KEY = 'pb_portfolio_state_v1';
const AUTH_KEY = 'pb_owner_auth_v1';

export function loadPortfolioState(): PortfolioState {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return initialPortfolioData;
    const parsed = JSON.parse(raw);
    return {
      ...initialPortfolioData,
      ...parsed,
      hero: { ...initialPortfolioData.hero, ...parsed.hero },
      contact: { ...initialPortfolioData.contact, ...parsed.contact },
      analytics: {
        ...initialPortfolioData.analytics,
        ...parsed.analytics,
        summary: {
          ...initialPortfolioData.analytics.summary,
          ...(parsed.analytics?.summary || {})
        }
      },
      credentials: {
        ...initialPortfolioData.credentials,
        ...(parsed.credentials || {})
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
