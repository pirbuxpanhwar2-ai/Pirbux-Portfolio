import { PortfolioState } from '../types/portfolio';
import extractedAssets from './extractedAssets.json';

export const initialPortfolioData: PortfolioState = {
  hero: {
    name: 'Pir Bux',
    profession: 'Hospitality Professional',
    badgeText: 'Open to work',
    badgeSub: 'Restaurant Manager · Shift Manager · F&B Operations',
    isOpenToWork: true,
    greeting: 'Hi! I’m Pir Bux · Making Restaurants Run Better',
    titlePrefix: 'Hospitality &',
    typedWords: ['Restaurant Management', 'Team Leadership', 'Guest Service', 'F&B Operations'],
    subtitle:
      'I lead floor and kitchen teams in busy casual and upscale restaurants, keep service standards high, and make sure every guest has a good meal.',
    diningYears: '6 years',
    mgmtYears: '4 years',
    locationCity: 'Karachi',
    locationCountry: 'Pakistan',
    slides: extractedAssets.slides || []
  },
  whyCards: [
    {
      id: 'why-1',
      tag: 'Promotion',
      title: 'Restaurant Manager in 3 years',
      description: 'Earned management’s trust at Marhaba Restaurant and was promoted from waiter to Restaurant Manager.',
      linkText: 'See my experience →',
      linkTarget: '#experience',
      targetCardIndex: 3
    },
    {
      id: 'why-2',
      tag: 'Award',
      title: 'Employee of the Month award',
      description: 'Recognised by Khoj Resorts Allana for invaluable contribution and dedication.',
      linkText: 'See the certificate →',
      linkTarget: '#cert-eotm'
    },
    {
      id: 'why-3',
      tag: 'Recommended',
      title: '5 colleague recommendations',
      description: 'Managers and teammates describe my reliability, dedication and leadership on LinkedIn.',
      linkText: 'Read them →',
      linkTarget: '#recommendations'
    }
  ],
  about: {
    heading: 'Hands-on experience in restaurant operations, guest service, and financial control across high-volume dining and upscale hospitality.',
    paragraphs: [
      'Joined Khoj Resorts Allana in February 2025 as a Food Server and was swiftly promoted to Cashier within my first year—a recognition of my strong work ethic, attention to detail, and operational excellence.',
      'Skilled in Point-of-Sale (eZee Optimus) management, daily cash reconciliation, guest relations, and department inventory tracking. Committed to maintaining high standards of financial accuracy and delivering exceptional service standards that elevate guest experiences.'
    ],
    ctaText: 'Contact me →'
  },
  journey: [
    {
      id: 'j-1',
      time: 'Earlier',
      role: 'Waiter',
      company: 'Marhaba Restaurant, Hyderabad',
      isCurrent: false
    },
    {
      id: 'j-2',
      time: 'Within 3 years',
      role: 'Restaurant Manager',
      company: 'Promoted at Marhaba Restaurant',
      isCurrent: false
    },
    {
      id: 'j-3',
      time: '2023 to 2024',
      role: 'Shift Manager',
      company: 'Kababjees Express Outlet, Karachi',
      isCurrent: false
    },
    {
      id: 'j-4',
      time: 'Feb 2025 to present',
      role: 'Food Server → Cashier',
      company: 'Khoj Resorts Allana (Promoted)',
      isCurrent: true
    },
    {
      id: 'j-5',
      time: 'Mar 2026 to Sep 2026',
      role: 'Business Owner',
      company: 'Ami Jan Pizza on Foodpanda',
      isCurrent: false
    }
  ],
  experience: [
    {
      id: 'xp-1',
      number: '01',
      role: 'Business Owner',
      period: 'Mar 2026 to Sep 2026 · 7 months · Part-time',
      company: 'Ami Jan Pizza on Foodpanda · Ghazi Goth, Scheme 33, Karachi East · On-site',
      details:
        'Led the launch and digital operations of a specialized home-chef pizza brand on the Foodpanda platform. Responsible for end-to-end business management, including brand identity, menu engineering and supply chain logistics. Focused on using e-commerce delivery to scale a boutique food concept while maintaining strict quality control and customer satisfaction.'
    },
    {
      id: 'xp-2',
      number: '02',
      role: 'Food Server → Cashier (Promoted)',
      period: 'Feb 2025 to Present',
      company: 'Khoj Resorts Allana · On-site',
      details:
        '• Food Server (Joined Feb 2025): Hands-on experience in restaurant operations, guest service, and floor coordination. Maintained immaculate dining standards, welcomed guests with warm hospitality, and rapidly mastered resort F&B workflows.\n• Cashier (Promoted within 1st Year): Swiftly promoted in recognition of operational excellence and attention to detail. Skilled in Point-of-Sale (eZee Optimus) management, daily cash reconciliation, guest relations, department inventory tracking, and financial control.',
      bullets: [
        'Food Server (Joined Feb 2025): Hands-on experience in restaurant operations, guest service, and floor coordination. Maintained immaculate dining standards, welcomed guests with warm hospitality, and rapidly mastered resort F&B workflows.',
        'Cashier (Promoted within 1st Year): Swiftly promoted in recognition of operational excellence and attention to detail. Skilled in Point-of-Sale (eZee Optimus) management, daily cash reconciliation, guest relations, department inventory tracking, and financial control.'
      ]
    },
    {
      id: 'xp-3',
      number: '03',
      role: 'Shift Manager',
      period: '2023 to 2024',
      company: 'Kababjees Express Outlet, Karachi',
      details:
        'Drove operational excellence, maintained high food safety standards, and raised the quality of customer service. Managed end-to-end daily restaurant operations, led front-of-house and back-of-house teams, and ensured strict compliance with health and hygiene regulations.'
    },
    {
      id: 'xp-4',
      number: '04',
      role: 'Waiter → Restaurant Manager (Promoted)',
      period: 'Within 3 Years · Promoted',
      company: 'Marhaba Restaurant, Hyderabad · On-site',
      details:
        '• Waiter (Initial Role): Began journey at Marhaba Restaurant, Hyderabad, as a humble waiter, eager to learn and contribute. With no shortcuts—just honesty, dedication, and a strong work ethic—took pride in every task, whether setting a perfect table or ensuring a guest left with a smile. Learned the ins and outs of daily operations, helped colleagues, and always put the customer first.\n• Restaurant Manager (Promoted in 3 Years): Management noticed my dedication, and within just three years, promoted me to Restaurant Manager. Led the very team I once served alongside, driving improvements in service, team morale, and guest satisfaction.',
      bullets: [
        'Waiter (Initial Role): Began journey at Marhaba Restaurant, Hyderabad, as a humble waiter, eager to learn and contribute. With no shortcuts—just honesty, dedication, and a strong work ethic—took pride in every task, whether setting a perfect table or ensuring a guest left with a smile. Consistently went beyond duties, learning the ins and outs of daily operations, helping colleagues, and always putting the customer first.',
        'Restaurant Manager (Promoted in 3 Years): Management noticed my commitment, and within just three years, promoted me to Restaurant Manager. Led the very team I once served alongside, driving improvements in service, team morale, and guest satisfaction. A testament to how hard work and integrity turn opportunities into success.'
      ]
    }
  ],
  certificates: (extractedAssets.certificates || []) as any,
  recommendations: [
    {
      id: 'rec-1',
      name: 'Sanam Sultan',
      role: 'Assistant Guest Relations Manager, Khoj Resorts',
      context: 'Worked on the same team · October 2026',
      quote: 'Highly efficient and dedicated.',
      avatarInitials: 'SS',
      profileUrl: 'https://www.linkedin.com/in/sanam-sultan-2377baa1/',
      isApproved: true,
      createdAt: '2026-10-15'
    },
    {
      id: 'rec-2',
      name: 'Bobby William',
      role: 'Restaurant Manager, Khoj Resorts Allana',
      context: 'Senior to Pir Bux · September 2026',
      quote:
        'Pir Bux is hands-down one of the best colleagues I’ve had the pleasure of working with. As a cashier, His dedication to guest satisfaction and customer service is unmatched—He consistently go above and beyond to ensure every customer leaves with a great experience. On top of His front-of-house skills, Pir Bux is exceptionally sharp with back-office tools like Excel and Word, and possesses a strong analytical mind for tracking and creating meaningful KPIs. Accurate with billing, reliable, and always positive, Pir Bux would be a tremendous asset to any team.',
      avatarInitials: 'BW',
      profileUrl: 'https://www.linkedin.com/in/bobby-william-562153224/',
      isApproved: true,
      createdAt: '2026-09-24'
    },
    {
      id: 'rec-3',
      name: 'Naveed Ali',
      role: 'Food Server, Khoj Resorts',
      context: 'Pir Bux was his senior · September 2026',
      quote:
        'It is a privilege to recommend Mr. Pir Bux, whom I have known personally and worked alongside as my senior at Marhaba Restaurant, and currently see excelling as Cashier at Khoj Resort Allana. He is an exceptionally humble, genuine, and reliable professional who brings utter integrity and calm efficiency to managing cash operations. Beyond his sharp attention to detail and strong professional standards, his kind nature and mentorship make him a true leader and a valuable asset to any organization.',
      avatarInitials: 'NA',
      profileUrl: 'https://www.linkedin.com/in/naveed-ali-441a86438/',
      isApproved: true,
      createdAt: '2026-09-18'
    },
    {
      id: 'rec-4',
      name: 'Datal Khan',
      role: 'Senior Fast Food Chef, Red Apple',
      context: 'Reported to Pir Bux directly · September 2026',
      quote:
        'It is my pleasure to highly recommend Mr. Pir Bux. Having worked alongside him at Marhaba Restaurant, I have seen firsthand his outstanding leadership as Assistant Manager. He is a remarkable professional who balances a kind, approachable, and respectful attitude with a clear commitment to excellence. While gentle and supportive with his team, he is equally disciplined when it comes to maintaining high standards, following workplace rules, and ensuring seamless restaurant operations. His dedication, professionalism, and strong work ethic make him a huge asset to any organization.',
      avatarInitials: 'DK',
      profileUrl: 'https://www.linkedin.com/in/datal-khan-01a659326/',
      isApproved: true,
      createdAt: '2026-09-10'
    },
    {
      id: 'rec-5',
      name: 'Ishratt Ali',
      role: 'Director of Food and Beverage, Khoj Resorts',
      context: 'Senior to Pir Bux · August 2026',
      quote:
        'Pir Bux is an absolute pleasure to work with. He brings an exceptional level of dedication, technical expertise, and reliability to every project we tackle together. What stands out most is his collaborative spirit and willingness to support the team no matter how tight the deadlines get. Any team would be lucky to have him.',
      avatarInitials: 'IA',
      profileUrl: 'https://www.linkedin.com/in/ishratt-ali-34584b394/',
      isApproved: true,
      createdAt: '2026-08-28'
    }
  ],
  skills: [
    {
      id: 'sk-1',
      name: 'Professional',
      icon: 'grid',
      skills: [
        { id: 's-1', name: 'Food & beverage operations', linkTarget: '#experience', cardIndex: 2 },
        { id: 's-2', name: 'Restaurant operations', linkTarget: '#experience', cardIndex: 2 },
        { id: 's-3', name: 'Customer service', linkTarget: '#cert-crm' },
        { id: 's-4', name: 'Leadership', linkTarget: '#cert-lead' }
      ]
    },
    {
      id: 'sk-2',
      name: 'Strengths',
      icon: 'shield',
      skills: [
        { id: 's-5', name: 'Running the whole operation', linkTarget: '#experience', cardIndex: 2 },
        { id: 's-6', name: 'Front & back of house', linkTarget: '#experience', cardIndex: 2 },
        { id: 's-7', name: 'Food safety & hygiene', linkTarget: '#experience', cardIndex: 2 }
      ]
    },
    {
      id: 'sk-3',
      name: 'Training & tools',
      icon: 'cap',
      skills: [
        { id: 's-pos', name: 'Point-of-Sale (eZee Optimus)', linkTarget: '#experience', cardIndex: 1 },
        { id: 's-cash', name: 'Daily cash reconciliation', linkTarget: '#experience', cardIndex: 1 },
        { id: 's-8', name: 'Customer relationship management', linkTarget: '#cert-crm' },
        { id: 's-9', name: 'Hotel front desk operations', linkTarget: '#cert-desk' },
        { id: 's-10', name: 'Excel & Word', linkTarget: '#rec-bobby' },
        { id: 's-11', name: 'KPI tracking', linkTarget: '#rec-bobby' }
      ]
    },
    {
      id: 'sk-4',
      name: 'Languages',
      icon: 'globe',
      skills: [
        { id: 's-12', name: 'English', level: 'Fluent' },
        { id: 's-13', name: 'Urdu', level: 'Fluent' },
        { id: 's-14', name: 'Sindhi', level: 'Fluent' }
      ]
    }
  ],
  services: [
    {
      id: 'svc-1',
      title: 'Excel Spreadsheets',
      description: 'Professional, well-structured spreadsheets built with smart formulas.',
      icon: 'table',
      whatsappPrompt: 'Excel spreadsheet',
      promptUrdu: 'ایکسل اسپریڈشیٹس'
    },
    {
      id: 'svc-2',
      title: 'KPI Dashboards',
      description: 'Interactive dashboards that turn raw data into meaningful insights.',
      icon: 'chart',
      whatsappPrompt: 'KPI dashboard',
      promptUrdu: 'کے پی آئی ڈیش بورڈز'
    },
    {
      id: 'svc-3',
      title: 'Staff Duty Rosters',
      description: 'Clear, organised duty rosters for your team with automated shift allocations.',
      icon: 'cal',
      whatsappPrompt: 'staff duty roster',
      promptUrdu: 'اسٹاف ڈیوٹی روسٹرز'
    },
    {
      id: 'svc-4',
      title: 'Budget Sheets',
      description: 'Well-structured budget sheets that make planning and tracking simple.',
      icon: 'wallet',
      whatsappPrompt: 'budget sheet',
      promptUrdu: 'بجٹ شیٹس'
    },
    {
      id: 'svc-5',
      title: 'PowerPoint Presentations',
      description: 'Impactful presentations that communicate clearly to management and staff.',
      icon: 'slides',
      whatsappPrompt: 'PowerPoint presentation',
      promptUrdu: 'پاورپوائنٹ پریزنٹیشنز'
    },
    {
      id: 'svc-6',
      title: 'Word Documents',
      description: 'Professionally formatted documents, including experience certificates and official business documentation.',
      icon: 'doc',
      whatsappPrompt: 'Word document',
      promptUrdu: 'ورڈ دستاویزات'
    }
  ],
  education: [
    {
      id: 'edu-1',
      institution: 'Virtual University of Pakistan',
      degree: 'Business Administration',
      status: 'In progress'
    },
    {
      id: 'edu-2',
      institution: 'Board of Intermediate and Secondary Education, Hyderabad',
      degree: 'Intermediate in Science',
      status: '2016'
    }
  ],
  contact: {
    email: 'Pirbuxpanhwar2@gmail.com',
    phone: '0329 2571307',
    whatsappNumber: '923292571307',
    linkedinUrl: 'https://www.linkedin.com/in/pir-bux-945b58332',
    locationAddress: 'Scheme 33, District Malir, Karachi',
    qrCodeDataUrl: extractedAssets.qrCode || ''
  },
  files: [],
  inbox: [],
  analytics: {
    summary: {
      totalPageViews: 0,
      uniqueVisitors: 0,
      engagementActions: 0,
      whatsappInquiries: 0,
      downloads: 0,
      formSubmissions: 0,
      recommendationsSubmitted: 0,
      avgSessionSeconds: 0,
      bounceRate: 0
    },
    dailyTraffic: [],
    sources: [],
    devices: [],
    locations: [],
    actions: [],
    recentActivity: []
  },
  credentials: {
    username: 'admin',
    passwordHash: 'admin',
    recoveryEmail: 'pirbuxpanhwar2@gmail.com',
    lastLogin: '2026-10-29 02:00',
    rememberMe: true
  }
};
