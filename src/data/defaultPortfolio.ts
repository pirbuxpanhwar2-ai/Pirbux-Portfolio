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
      description: 'Earned the management’s trust at Marhaba Restaurant and was promoted from Assistant Manager.',
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
    heading: 'About me: restaurant professional with six years in diverse dining, four of them in progressive management roles.',
    paragraphs: [
      'I’m good at leading dynamic teams, improving how a restaurant runs day to day, and keeping guests satisfied. I care about developing people and delivering consistently high service. Above all, I love building positive dining experiences.'
    ],
    ctaText: 'Contact me →'
  },
  journey: [
    {
      id: 'j-1',
      time: 'Earlier',
      role: 'Assistant Manager',
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
      time: '2025 to present',
      role: 'Cashier',
      company: 'Khoj Resorts, Allana',
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
      role: 'Cashier',
      period: '2025 to present',
      company: 'Khoj Resorts, Allana',
      details: 'Handling guest billing, cash management, POS systems, and reconciliation at the luxury resort.'
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
      role: 'Assistant Manager',
      period: 'Earlier role',
      company: 'Marhaba Restaurant, Hyderabad',
      details:
        'Took pride in every detail and learned the ins and outs of daily operations. Earned management trust and was promoted to Restaurant Manager in just three years.'
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
  files: [
    {
      id: 'file-1',
      name: 'Pir_Bux_Resume_2026.pdf',
      size: 248500,
      type: 'pdf',
      mimeType: 'application/pdf',
      dataUrl: 'data:application/pdf;base64,JVBERi0xLjQKJcTl8uXrp/Og0MTGCjQgMCBvYmoKPDwgL0xlbmd0aCA1IDAgUiAvRmlsdGVyIC9GbGF0ZURlY29kZSA+PgpzdHJlYW0KeAFjYmBgYGBiYGBwZWA4wMTAkMHAwAAiGJkYGJgZgHxjBhBAmYGBgQGkBQAoQwL+CmVuZHN0cmVhbQplbmRvYmoK',
      uploadedAt: '2026-10-24 14:32',
      tag: 'Resume'
    },
    {
      id: 'file-2',
      name: 'Restaurant_Duty_Roster_Template.xlsx',
      size: 145200,
      type: 'spreadsheet',
      mimeType: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
      dataUrl: 'data:application/vnd.ms-excel;base64,UEsDBBQAAAAIAAAAAAAAAAAAAAAAAAAAAAA',
      uploadedAt: '2026-10-25 09:15',
      tag: 'Template'
    },
    {
      id: 'file-3',
      name: 'Profile_Portrait_Black_Suit.jpg',
      size: 42100,
      type: 'image',
      mimeType: 'image/jpeg',
      dataUrl: extractedAssets.slides?.[0]?.url || '',
      uploadedAt: '2026-10-20 18:00',
      tag: 'Profile Photo'
    },
    {
      id: 'file-4',
      name: 'Khoj_Employee_Of_The_Month.jpg',
      size: 68400,
      type: 'image',
      mimeType: 'image/jpeg',
      dataUrl: extractedAssets.certificates?.[0]?.imageUrl || '',
      uploadedAt: '2026-10-22 11:20',
      tag: 'Award'
    },
    {
      id: 'file-5',
      name: 'Portfolio_QR_Code.svg',
      size: 3200,
      type: 'image',
      mimeType: 'image/svg+xml',
      dataUrl: extractedAssets.qrCode || '',
      uploadedAt: '2026-10-23 10:45',
      tag: 'QR Code'
    }
  ],
  inbox: [
    {
      id: 'inb-1',
      name: 'Tariq Mehmood',
      email: 'tariq.dining@gmail.com',
      subject: 'Interview for Restaurant General Manager position',
      message:
        'Dear Pir Bux, we reviewed your impressive experience at Kababjees Express and Marhaba Restaurant. We would like to invite you for a detailed discussion regarding a Restaurant Manager role in DHA Karachi.',
      createdAt: '2026-10-26 15:40',
      status: 'unread',
      type: 'contact'
    },
    {
      id: 'inb-2',
      name: 'Hamza Sheikh',
      email: 'h.sheikh@flavorshospitality.com',
      subject: 'Custom Excel KPI Dashboard & Duty Roster Consultation',
      message:
        'Hello Pir Bux, saw your Excel KPI dashboard demo on your portfolio. We run 3 branches in Karachi and need an automated weekly sales and food cost tracking sheet. Are you available for freelance project work?',
      createdAt: '2026-10-26 10:15',
      status: 'read',
      type: 'contact'
    },
    {
      id: 'inb-3',
      name: 'Zubair Qureshi',
      email: 'zubair.q@gmail.com',
      subject: 'Colleague Recommendation submission',
      message:
        'Pir Bux is a stellar manager who treats his team with dignity while delivering exceptional shift numbers. Proud to have worked alongside him.',
      createdAt: '2026-10-25 19:22',
      status: 'read',
      type: 'recommendation',
      roleAndCompany: 'F&B Floor Supervisor, Marhaba Restaurant',
      relationship: 'Worked together 2021-2023'
    }
  ],
  analytics: {
    summary: {
      totalPageViews: 2489,
      uniqueVisitors: 1140,
      engagementActions: 512,
      whatsappInquiries: 94,
      downloads: 68,
      formSubmissions: 23,
      recommendationsSubmitted: 7,
      avgSessionSeconds: 165,
      bounceRate: 26.2
    },
    dailyTraffic: [
      { date: '2026-10-20', day: 'Mon', pageViews: 295, uniqueVisitors: 142, engagement: 62 },
      { date: '2026-10-21', day: 'Tue', pageViews: 310, uniqueVisitors: 155, engagement: 68 },
      { date: '2026-10-22', day: 'Wed', pageViews: 280, uniqueVisitors: 138, engagement: 54 },
      { date: '2026-10-23', day: 'Thu', pageViews: 345, uniqueVisitors: 168, engagement: 79 },
      { date: '2026-10-24', day: 'Fri', pageViews: 420, uniqueVisitors: 195, engagement: 92 },
      { date: '2026-10-25', day: 'Sat', pageViews: 465, uniqueVisitors: 215, engagement: 104 },
      { date: '2026-10-26', day: 'Sun', pageViews: 374, uniqueVisitors: 182, engagement: 83 }
    ],
    sources: [
      { name: 'LinkedIn', percentage: 44, count: 1095, color: '#0077b5' },
      { name: 'WhatsApp Referrals', percentage: 24, count: 597, color: '#25D366' },
      { name: 'Direct / QR Code Scan', percentage: 17, count: 423, color: '#19e05f' },
      { name: 'Google Search', percentage: 10, count: 249, color: '#4285F4' },
      { name: 'Foodpanda / Industry', percentage: 5, count: 125, color: '#D70F64' }
    ],
    devices: [
      { device: 'Mobile', percentage: 67, count: 1667 },
      { device: 'Desktop', percentage: 29, count: 722 },
      { device: 'Tablet', percentage: 4, count: 100 }
    ],
    locations: [
      { city: 'Karachi', country: 'Pakistan', count: 1145, percentage: 46 },
      { city: 'Hyderabad', country: 'Pakistan', count: 423, percentage: 17 },
      { city: 'Lahore', country: 'Pakistan', count: 298, percentage: 12 },
      { city: 'Dubai', country: 'United Arab Emirates', count: 274, percentage: 11 },
      { city: 'Islamabad', country: 'Pakistan', count: 199, percentage: 8 },
      { city: 'Riyadh', country: 'Saudi Arabia', count: 150, percentage: 6 }
    ],
    actions: [
      { action: 'WhatsApp Chat Initiated', count: 94, category: 'lead' },
      { action: 'Certificate Lightbox Viewed', count: 186, category: 'engagement' },
      { action: 'Service Inquiry Clicked', count: 82, category: 'lead' },
      { action: 'Language Switched (Urdu)', count: 135, category: 'localization' },
      { action: 'Resume PDF Downloaded', count: 68, category: 'download' },
      { action: 'Contact Form Submitted', count: 23, category: 'lead' },
      { action: 'QR Code Enlarge Viewed', count: 54, category: 'engagement' }
    ],
    recentActivity: [
      {
        id: 'act-1',
        timestamp: 'Just now',
        action: 'Page View',
        details: 'Visitor landed on #top from LinkedIn Karachi',
        category: 'view'
      },
      {
        id: 'act-2',
        timestamp: '12 mins ago',
        action: 'WhatsApp Inquiry',
        details: 'User initiated WhatsApp query for "KPI Dashboards"',
        category: 'inquiry'
      },
      {
        id: 'act-3',
        timestamp: '34 mins ago',
        action: 'Certificate Viewed',
        details: 'Certificate "Employee of the Month (Khoj Resorts)" opened in Lightbox',
        category: 'click'
      },
      {
        id: 'act-4',
        timestamp: '1 hour ago',
        action: 'Resume Downloaded',
        details: 'Pir_Bux_Resume_2026.pdf downloaded by recruiter from Dubai, UAE',
        category: 'download'
      },
      {
        id: 'act-5',
        timestamp: '2 hours ago',
        action: 'Contact Form Submitted',
        details: 'Tariq Mehmood sent message: "Interview for Restaurant GM position"',
        category: 'inquiry'
      },
      {
        id: 'act-6',
        timestamp: '3 hours ago',
        action: 'Language Switched',
        details: 'Visitor toggled website language to Urdu',
        category: 'click'
      }
    ]
  },
  credentials: {
    username: 'pirbux',
    passwordHash: 'admin123',
    lastLogin: '2026-10-27 04:00',
    rememberMe: true
  }
};
