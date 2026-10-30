export interface SlidePhoto {
  id: string;
  url: string;
  alt: string;
  caption?: string;
  focus?: string;
}

export interface ProfileHero {
  name: string;
  profession: string;
  badgeText: string;
  badgeSub: string;
  isOpenToWork: boolean;
  greeting: string;
  titlePrefix: string;
  typedWords: string[];
  subtitle: string;
  diningYears: string;
  mgmtYears: string;
  locationCity: string;
  locationCountry: string;
  slides: SlidePhoto[];
}

export interface WhyCard {
  id: string;
  tag: string;
  title: string;
  description: string;
  linkText: string;
  linkTarget: string;
  targetCardIndex?: number;
}

export interface AboutSection {
  heading: string;
  paragraphs: string[];
  ctaText: string;
}

export interface JourneyMilestone {
  id: string;
  time: string;
  role: string;
  company: string;
  isCurrent: boolean;
}

export interface ExperienceItem {
  id: string;
  number: string;
  role: string;
  period: string;
  company: string;
  details: string;
  bullets?: string[];
}

export interface CertificateItem {
  id: string;
  tag: string;
  title: string;
  issuer: string;
  description: string;
  imageUrl: string;
}

export interface RecommendationItem {
  id: string;
  name: string;
  role: string;
  context: string;
  quote: string;
  avatarInitials: string;
  profileUrl?: string;
  isApproved: boolean;
  createdAt: string;
}

export interface SkillItem {
  id: string;
  name: string;
  level?: string;
  linkTarget?: string;
  cardIndex?: number;
}

export interface SkillCategory {
  id: string;
  name: string;
  icon: string;
  skills: SkillItem[];
}

export interface ServiceItem {
  id: string;
  title: string;
  description: string;
  icon: string;
  whatsappPrompt: string;
  promptUrdu: string;
}

export interface EducationItem {
  id: string;
  institution: string;
  degree: string;
  status: string;
}

export interface ContactInfo {
  email: string;
  phone: string;
  whatsappNumber: string;
  linkedinUrl: string;
  locationAddress: string;
  qrCodeDataUrl: string;
}

export interface UploadedFile {
  id: string;
  name: string;
  size: number;
  type: 'image' | 'pdf' | 'spreadsheet' | 'document' | 'other';
  mimeType: string;
  dataUrl: string;
  uploadedAt: string;
  tag?: string;
}

export interface InboxMessage {
  id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  createdAt: string;
  status: 'unread' | 'read' | 'replied';
  type: 'contact' | 'recommendation';
  roleAndCompany?: string;
  relationship?: string;
}

export interface TrafficDataPoint {
  date: string;
  day: string;
  pageViews: number;
  uniqueVisitors: number;
  engagement: number;
}

export interface TrafficSource {
  name: string;
  percentage: number;
  count: number;
  color: string;
}

export interface DeviceStat {
  device: string;
  percentage: number;
  count: number;
}

export interface LocationStat {
  city: string;
  country: string;
  count: number;
  percentage: number;
}

export interface ActionStat {
  action: string;
  count: number;
  category: string;
}

export interface ActivityLogItem {
  id: string;
  timestamp: string;
  action: string;
  details: string;
  category: 'view' | 'click' | 'inquiry' | 'download' | 'auth' | 'edit';
}

export interface AnalyticsSummary {
  totalPageViews: number;
  uniqueVisitors: number;
  engagementActions: number;
  whatsappInquiries: number;
  downloads: number;
  formSubmissions: number;
  recommendationsSubmitted: number;
  avgSessionSeconds: number;
  bounceRate: number;
}

export interface AnalyticsData {
  summary: AnalyticsSummary;
  dailyTraffic: TrafficDataPoint[];
  sources: TrafficSource[];
  devices: DeviceStat[];
  locations: LocationStat[];
  actions: ActionStat[];
  recentActivity: ActivityLogItem[];
}

export interface OwnerCredentials {
  username: string;
  passwordHash: string;
  recoveryEmail?: string;
  lastLogin?: string;
  rememberMe: boolean;
}

export interface PortfolioState {
  hero: ProfileHero;
  whyCards: WhyCard[];
  about: AboutSection;
  journey: JourneyMilestone[];
  experience: ExperienceItem[];
  certificates: CertificateItem[];
  recommendations: RecommendationItem[];
  skills: SkillCategory[];
  services: ServiceItem[];
  education: EducationItem[];
  contact: ContactInfo;
  files: UploadedFile[];
  inbox: InboxMessage[];
  analytics: AnalyticsData;
  credentials: OwnerCredentials;
}
