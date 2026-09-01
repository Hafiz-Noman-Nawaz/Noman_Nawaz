# ⚡ Noman Nawaz — Ultra-Premium 3D Interactive Portfolio & Headless CMS

> **An Awwwards-caliber, high-performance developer portfolio and headless Content Management System (CMS) engineered with React 19, Node.js, Express, MongoDB Atlas, Cloudinary CDN, Motion, and Tailwind CSS v4.**

[![React](https://img.shields.io/badge/React-19-61dafb?style=for-the-badge&logo=react&logoColor=black)](https://react.dev/)
[![Node.js](https://img.shields.io/badge/Node.js-24-339933?style=for-the-badge&logo=node.js&logoColor=white)](https://nodejs.org/)
[![Express.js](https://img.shields.io/badge/Express.js-4.x-000000?style=for-the-badge&logo=express&logoColor=white)](https://expressjs.com/)
[![MongoDB Atlas](https://img.shields.io/badge/MongoDB_Atlas-Cluster-47A248?style=for-the-badge&logo=mongodb&logoColor=white)](https://www.mongodb.com/atlas)
[![Tailwind CSS v4](https://img.shields.io/badge/Tailwind_CSS-v4.0-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![Motion](https://img.shields.io/badge/Motion-Framer-FF0055?style=for-the-badge&logo=framer&logoColor=white)](https://motion.dev/)
[![Cloudinary](https://img.shields.io/badge/Cloudinary-CDN-3448C5?style=for-the-badge&logo=cloudinary&logoColor=white)](https://cloudinary.com/)
[![Vite](https://img.shields.io/badge/Vite-6.4-646CFF?style=for-the-badge&logo=vite&logoColor=white)](https://vitejs.dev/)

---

## 🌟 Executive Overview & Live Links

This full-stack platform represents an **enterprise-grade developer portfolio and custom CMS architecture** engineered to deliver silky 60fps micro-interactions, physics simulations, and complete real-time content management backed by MongoDB Atlas and Cloudinary media delivery.

- 🌐 **Live Portfolio**: [https://www.nouman-nawaz.dev](https://www.nouman-nawaz.dev)
- 🔐 **Admin CMS Portal**: [https://www.nouman-nawaz.dev/admin](https://www.nouman-nawaz.dev/admin)
- 🐙 **GitHub Repository**: [https://github.com/Hafiz-Noman-Nawaz/Noman_Nawaz.git](https://github.com/Hafiz-Noman-Nawaz/Noman_Nawaz.git)

---

## 🚀 Core Features & Architectural Innovations

### 1. 🕹️ Interactive 2D Rigid-Body "Skill Gravity Sandbox"
- **Custom Physics Engine**: Built with Verlet numerical integration and rigid-body particle collisions on HTML5 Canvas.
- **Physics Micro-Interactions**: Visitors can grab, toss, fling, and bounce skill pills against viewport boundaries and other rigid bodies with realistic inertia and momentum.
- **Zero-G / Earth Gravity Toggle**: Switch instantly between terrestrial gravity and zero-gravity floating mode.
- **Viewport-Aware Performance**: Automatically pauses `requestAnimationFrame` render loops when scrolled out of view using `IntersectionObserver`, guaranteeing locked 60fps performance.

### 2. 📄 Multi-Layout Executive PDF Resume Engine
- **3 Switchable Design Engines**:
  - 🏛️ **Silicon Valley 2-Column Split**: Left high-contrast sidebar with photo, coordinates, skills tags, and education; right column with executive summary, milestones, and featured case studies.
  - ⚡ **Modern Dark Holographic**: Obsidian background, cyber accents, dark glass cards, and neon stack badges.
  - 📄 **Minimalist ATS Paper**: Clean monochrome typography and horizontal dividers optimized for automated corporate ATS parsers.
- **Isolated Clean Print Engine**: Generates razor-sharp, print-safe A4/Letter documents (`break-inside: avoid;`) strictly limited to 1–2 pages with zero page overflow.
- **Dynamic Case Study Formats**: Displays project title, live demo link, GitHub source code link, compact stack lines, and architectural highlights.
- **CMS Synchronization & Resume Toggle**: Add/remove projects from the resume in 1-click via the `showOnResume` toggle in the CMS.

### 3. ⚡ Fast-Track Hire & Real-Time Meeting System
- **Dynamic CMS Engagement Frameworks**: Direct synchronization with customized service tiers and engagement models configured in CMS Settings.
- **Target Onboarding & Budget Range Selectors**: Captures client timelines (*Immediate*, *Within 2 Weeks*, *Next Month*) and compensation requirements.
- **📅 Direct Calendly / Google Meet Scheduler**: Embedded 1-click appointment booking so prospective clients can schedule a 15-minute video call directly on your calendar.
- **💬 Instant WhatsApp Direct Connect**: Auto-generates a pre-filled WhatsApp conversation with your direct number.
- **📧 Real-Time Nodemailer Email Alerts**: Automatically forwards client briefing details directly to `nawaznoman7766@gmail.com` with 1-click reply buttons.
- **🗄️ MongoDB Inquiries Inbox**: Full tracking, unread badges, and deletion controls in the CMS Messages tab.

### 4. 🌍 Full Multi-Language Internationalization (i18n)
- Seamless real-time language switcher supporting:
  - 🇺🇸 **English** (`en`)
  - 🇵🇰 **Urdu** (`ur`)
  - 🇩🇪 **German** (`de`)
  - 🇪🇸 **Spanish** (`es`)
- Context-driven translations across Navigation, Hero, Skills, Physics Sandbox, Projects, Timeline, Certificates, Testimonials, Contact, and Footer.

### 5. 🎵 Motion-Driven Ambient Audio & Web Audio API SFX
- **Procedural Motion Hum**: Space drone audio synthesized via Web Audio API oscillators that activates subtly only when the mouse is moving and falls silent when idle.
- **Micro-Interaction Harmonic Swell**: Gain increases subtly (+60% harmonic boost) when hovering over interactive buttons, cards, and links.
- **Custom UI SFX**: Tactile feedback clicks and whooshes on modal open/close, tab switches, and form submissions.

### 6. 🎨 Dynamic Theme-Matched Custom Cursor
- Precision spring-lag circular follower and center point that dynamically shifts color palettes and glow radii according to the active theme:
  - 🌌 **Dark Theme**: Obsidian & electric violet glow (`#8b5cf6`).
  - ☀️ **Light Theme**: Porcelain & royal indigo glow (`#4f46e5`).
  - ⚡ **High-Contrast Theme**: Pure OLED black & neon green glow (`#00ff66`).

### 7. ⌨️ Global Command Palette (`Ctrl + K` / `Cmd + K`)
- Instant fuzzy-search overlay allowing keyboard navigation to any section, triggering modal popups (Resume, Estimator, Fast-Track Hire), switching themes, toggling sound, and changing languages.

### 8. 💻 Interactive Developer CLI Terminal (`~`)
- Press **`~`** (tilde) anywhere or click the terminal icon in the navbar.
- Fully functional shell supporting:
  - `help` — Show available commands
  - `skills` — Output full technical proficiencies
  - `projects` — List active engineering projects & repository links
  - `theme dark|light|contrast` — Switch active theme
  - `hire` — Trigger Fast-Track application modal with celebration confetti
  - `clear` — Clear terminal buffer

### 9. 📱 Multi-Device Hardware Frame Simulator
- In the project case study viewer, clients can test responsive viewports across simulated physical devices:
  - 💻 **MacBook Pro** (Desktop screen frame)
  - 📟 **iPad Pro** (Tablet viewport)
  - 📱 **iPhone 16 Pro** (Mobile portrait frame with hardware notch and bezel reflections)

### 10. 🎧 "Currently Coding" Live Status Dynamic Island
- Floating Apple-inspired Dynamic Island in the viewport corner displaying:
  - 🟢 Live availability beacon (*Available for Contracts & Roles*)
  - ⚡ Current development focus & framework activity
  - 🎵 Real-time Spotify / Lo-Fi soundtrack display with animated equalizer bars
  - 🎛️ 100% dynamic and configurable via the CMS Settings panel

### 11. 🧮 Interactive Project Architecture & Scope Estimator
- Multi-step client blueprint builder allowing founders to select project types, essential modules (Auth, Stripe Payments, Real-Time WebSockets, Cloud Storage), and desired velocity.
- Calculates projected delivery timelines and automatically pre-fills the Contact inquiry briefing with an architectural blueprint.

### 12. 📊 Real-Time GitHub Activity Heatmap & Metrics
- Direct integration with GitHub Public API tracking daily commit frequencies, active repositories, stars, and language breakdowns.

### 13. 🛡️ Headless CMS Admin Portal (`/admin`)
- Secure JWT-authenticated dashboard featuring 8 administrative management panels:
  - 🦸 **Hero Manager**: Update headline, sub-headline/bio, CTA buttons, and profile imagery.
  - ⚡ **Skills Wheel**: Add, edit, reorder, and tag technical stack items.
  - 🚀 **Projects Manager**: Create, edit, and categorize projects, upload media to Cloudinary, configure case studies, and toggle `showOnResume`.
  - ⭐ **Testimonials Manager**: Moderate public client reviews and add verified client endorsements.
  - ⏳ **Timeline Manager**: Chronological career milestones, roles, and education.
  - 📜 **Certificates Manager**: Verified accreditations with issuer badges and credential verification links.
  - 📬 **Messages Inbox**: View, filter, mark as read, and delete client submissions.
  - ⚙️ **Global Settings**: Configure identity, coordinates, Calendly URL, live status widget, Fast-Track roles, and admin credentials.

### 14. 🔗 Clean Social Profile Filtering
- Only displays social links (GitHub, LinkedIn, Twitter/X, Instagram) that are actively configured in CMS settings, automatically hiding empty links.

---

## 🛠️ Complete Technical Architecture

```
                               ┌─────────────────────────────────────────┐
                               │       Vercel Global Edge Network        │
                               │   React 19 + Vite + Tailwind CSS v4     │
                               └────────────────────┬────────────────────┘
                                                    │
                                       REST APIs / JSON / JWT
                                                    │
                               ┌────────────────────▼────────────────────┐
                               │           Render Web Service            │
                               │      Node.js 24 + Express.js API        │
                               └──────────────┬──────────────────┬───────┘
                                              │                  │
                                     Mongoose │                  │ Cloudinary Stream
                                              ▼                  ▼
                               ┌──────────────────────┐  ┌───────────────┐
                               │  MongoDB Atlas Cloud │  │  Cloudinary   │
                               │  (Multi-region DB)   │  │  Media CDN    │
                               └──────────────────────┘  └───────────────┘
```

---

## 📂 Repository Structure

```
Noman_Nawaz/
├── client/                           # React 19 Frontend Application
│   ├── src/
│   │   ├── components/
│   │   │   ├── certificates/         # Verified Certificates Section & Tilt Cards
│   │   │   ├── contact/              # Direct Contact Form & Dynamic Socials
│   │   │   ├── github/               # Live GitHub API Activity & Heatmap
│   │   │   ├── hero/                 # 3D Tilt Hero Section & Glare Effects
│   │   │   ├── layout/               # Navbar, Footer, ResumeModal, HireMeModal, CustomCursor
│   │   │   ├── projects/             # Projects Gallery, Filter Tabs & Frame Simulator
│   │   │   ├── skills/               # Infinite Skills Marquee & Physics Sandbox
│   │   │   ├── testimonials/         # Review Carousel & Client Modal
│   │   │   ├── timeline/             # Scrollytelling Career Milestones
│   │   │   └── ui/                   # CommandPalette, InteractiveTerminal, Dynamic Island
│   │   ├── context/                  # AuthContext, ThemeContext, SoundContext, LanguageContext
│   │   ├── pages/                    # Home.jsx, Login.jsx, /admin/ (8 CMS Managers)
│   │   ├── services/                 # Axios API Pipeline & Interceptors
│   │   └── index.css                 # Tailwind CSS v4 Tokens, Animations & @media print
│   └── vite.config.js                # Vite 6.4 Build Pipeline & Code Splitting
│
└── server/                           # Node.js + Express Backend API
    ├── middleware/                   # JWT Auth & Protected Route Middleware
    ├── models/                       # Mongoose Schemas (Hero, Project, Testimonial, Settings, etc.)
    ├── routes/                       # REST Endpoints (auth, projects, messages, settings, etc.)
    ├── utils/                        # mailer.js (Nodemailer email alerting utility)
    ├── seed.js                       # Initial Database Seeder
    └── server.js                     # Express Server Entrypoint & CORS Configuration
```

---

## ⚡ Getting Started Locally

### Prerequisites
- Node.js (v20+ recommended)
- MongoDB Atlas database URI or local MongoDB instance
- Cloudinary Account (for media uploads)

### 1. Clone the Repository
```bash
git clone https://github.com/Hafiz-Noman-Nawaz/Noman_Nawaz.git
cd Noman_Nawaz
```

### 2. Backend Setup
```bash
cd server
npm install
```

Create a `.env` file in the `server` directory:
```env
PORT=5000
MONGODB_URI=your_mongodb_atlas_connection_string
JWT_SECRET=your_secure_jwt_secret_key
CLIENT_URL=http://localhost:5173

# Cloudinary
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret

# Optional Email Alerts
EMAIL_USER=your_gmail@gmail.com
EMAIL_PASS=your_gmail_app_password
NOTIFICATION_EMAIL=nawaznoman7766@gmail.com
```

Start the backend:
```bash
npm run dev
```

### 3. Frontend Setup
```bash
cd ../client
npm install
npm run dev
```

The application will be accessible at `http://localhost:5173`.

---

## 🔐 Admin Authentication
- **Admin Portal**: `/admin`
- Default administrator credentials can be seeded or updated securely via the CMS Settings panel.

---

## 📜 License
This project is licensed under the MIT License — feel free to use and adapt for your own engineering showcases.

---

<div align="center">
  <sub>Engineered with ❤️ by <strong>Noman Nawaz</strong></sub>
</div>
