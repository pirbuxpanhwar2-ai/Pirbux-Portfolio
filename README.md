# Pir Bux — Hospitality & Restaurant Management Portfolio

A modern, high-performance web portfolio and interactive owner management dashboard for **Pir Bux**, an accomplished Hospitality Professional and Restaurant Manager with over 6 years of expertise across premier fine dining and resort operations.

![License](https://img.shields.io/badge/license-MIT-green.svg)
![React](https://img.shields.io/badge/React-19-blue.svg)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue.svg)
![Vite](https://img.shields.io/badge/Vite-6-purple.svg)
![TailwindCSS](https://img.shields.io/badge/TailwindCSS-4-cyan.svg)

---

## 🌟 Overview

This portfolio showcases the professional career trajectory of Pir Bux—from dedicated food server to senior restaurant manager at esteemed establishments including Marhaba Restaurant (Hyderabad), Khoj Resorts Allana, and Hotel Indus.

The application includes both a client-facing showcase designed to impress restaurant owners and recruiters, as well as an authenticated **Owner Management Portal** allowing real-time content updates, photo gallery management, inquiry inbox tracking, and visitor engagement analytics.

---

## ✨ Features

### Public Portfolio
- **Hero Presentation**: High-impact header displaying career status, 6+ years verified leadership experience badge, and quick contact actions.
- **Career Journey Timeline**: Interactive timeline chronicling promotions, leadership milestones, and team achievements.
- **Why Hire Me**: Core hospitality competencies including P&L oversight, staff mentoring, health/safety standards, guest satisfaction, and floor coordination.
- **Experience Details**: In-depth records of roles, promotions, key responsibilities, and quantified operational results.
- **Recommendations & Endorsements**: Testimonials from restaurant owners, executive chefs, and colleagues.
- **Interactive Contact Modal**: Direct contact form routing inquiries to the management inbox with instant feedback.
- **Resume Viewer & Download**: Quick access to downloadable CV documents.

### Owner Management Portal
- **Secure Access**: Protected management gateway for the portfolio owner.
- **Content Management**: Update biography, headline, contact information, and hospitality philosophy directly in browser.
- **Photo & Document Hub**: Upload and organize profile portraits, food presentation showcases, and certificates with local storage persistence.
- **Direct Inquiry Inbox**: Manage, review, and filter incoming messages and employment offers.
- **Analytics & Telemetry**: Monitor visitor interactions, tab views, engagement metrics, and contact clicks.
- **Data Export & Import**: Backup your customized portfolio profile to JSON or restore anytime.

---

## 🛠️ Tech Stack

- **Framework**: [React 19](https://react.dev/)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Bundler & Dev Server**: [Vite](https://vitejs.dev/)
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/)
- **Icons**: [Lucide React](https://lucide.dev/)
- **Animation**: [Motion](https://motion.dev/)

---

## 🚀 Getting Started

### Prerequisites

Ensure you have [Node.js](https://nodejs.org/) (version 18 or later) installed on your machine.

### Installation

1. **Clone the repository**:
   ```bash
   git clone https://github.com/your-username/pir-bux-portfolio.git
   cd pir-bux-portfolio
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Start the local development server**:
   ```bash
   npm run dev
   ```
   Open [http://localhost:3000](http://localhost:3000) in your browser.

4. **Build for production**:
   ```bash
   npm run build
   ```
   The production-ready assets will be compiled into the `dist/` directory.

5. **Preview the production build**:
   ```bash
   npm run preview
   ```

---

## 📦 Project Structure

```text
├── .github/
│   └── workflows/
│       └── deploy.yml        # GitHub Actions workflow for automated GitHub Pages deployment
├── public/                   # Static assets, icons, and document templates
├── src/
│   ├── components/           # UI components & section modules
│   │   ├── AnalyticsDashboardTab.tsx
│   │   ├── CertificationsModal.tsx
│   │   ├── ContactModal.tsx
│   │   ├── EndorsementsModal.tsx
│   │   ├── ExperienceSection.tsx
│   │   ├── Footer.tsx
│   │   ├── HeroSection.tsx
│   │   ├── JourneySection.tsx
│   │   ├── Navbar.tsx
│   │   ├── OwnerPortalModal.tsx
│   │   └── WhyHireMeSection.tsx
│   ├── data/                 # Portfolio default datasets & schema
│   ├── types/                # TypeScript interface definitions
│   ├── utils/                # Helper utilities & storage management
│   ├── App.tsx               # Root application view & routing
│   ├── index.css             # Tailwind styling configuration
│   └── main.tsx              # Application entry point
├── index.html                # HTML entry point with SEO metadata
├── netlify.toml              # Netlify deployment and SPA routing config
├── package.json              # Package manifest and build scripts
├── tsconfig.json             # TypeScript configuration
└── vite.config.ts            # Vite build setup with relative base paths
```

---

## 🌐 Deployment

### GitHub Pages (Automatic)
The repository includes a ready-to-run GitHub Actions workflow (`.github/workflows/deploy.yml`).
1. Push your repository to GitHub.
2. In your GitHub repository, navigate to **Settings > Pages**.
3. Under **Build and deployment > Source**, select **GitHub Actions**.
4. Pushes to the `main` or `master` branch will automatically build and publish your site!

### Netlify
1. Connect your repository to [Netlify](https://www.netlify.com/).
2. The included `netlify.toml` automatically configures the build command (`npm run build`), publish directory (`dist`), and single-page routing redirects.

### Vercel
1. Import your project on [Vercel](https://vercel.com/).
2. Vercel automatically detects Vite and configures standard build presets.

---

## 👤 Contact & Inquiries

- **Pir Bux**
- **Email**: [pirbuxpanhwar2@gmail.com](mailto:pirbuxpanhwar2@gmail.com)
- **Role**: Restaurant Manager & Hospitality Professional
- **Specialization**: Operations Leadership, Fine Dining Guest Service, Team Training

---

## 📄 License

This project is open source and available under the [MIT License](LICENSE).
