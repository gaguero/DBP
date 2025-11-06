# Dolphin Blue Paradise Website

> Eco-luxury resort website built with Next.js, EspoCRM, and modern web technologies

![Next.js](https://img.shields.io/badge/Next.js-15.5.3-black)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue)
![Tailwind](https://img.shields.io/badge/Tailwind-4-38bdf8)
![Railway](https://img.shields.io/badge/Deployed%20on-Railway-purple)

## 🏝️ About the Project

Dolphin Blue Paradise is a boutique eco-luxury resort website serving a 4-room off-grid resort in Isla San Cristóbal, Bocas del Toro, Panama. This project delivers a modern, bilingual (EN/ES) web presence with integrated CRM, chat, and marketing automation.

**Key Features:**
- 🌍 Fully bilingual (English/Spanish)
- 🔐 Admin panel with authentication
- 📝 Rich content management (blog system)
- 💬 Live chat integration (Chatwoot)
- 📊 CRM integration (EspoCRM)
- 📈 Analytics (Google Tag Manager)
- ♻️ Sustainable, off-grid resort showcase

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ (22.21.1 recommended)
- pnpm 8+
- PostgreSQL (or Railway database)
- Git

### Installation

```bash
# Clone the repository
git clone https://github.com/gaguero/DBP.git
cd DBPwix

# Install dependencies
pnpm install

# Set up environment variables
cd apps/web
cp .env.example .env.local
# Edit .env.local with your database URL and secrets

# Initialize database
pnpm db:push

# Run development server
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) to see the result.

### First Time Setup

```bash
# Create admin user (optional, auto-creates on Railway)
pnpm -F web db:setup
```

Default admin credentials (set via environment variables):
- Email: Value of `ADMIN_EMAIL`
- Password: Value of `ADMIN_PASSWORD`

## 📁 Project Structure

```
DBPwix/
├── apps/
│   ├── web/                     # Next.js application (main app)
│   │   ├── prisma/              # Database schema
│   │   ├── public/              # Static assets
│   │   ├── src/
│   │   │   ├── app/            # Next.js App Router pages
│   │   │   │   ├── (public pages)/  # Homepage, Rooms, Dining, etc.
│   │   │   │   ├── es/         # Spanish versions
│   │   │   │   ├── admin/      # Admin panel
│   │   │   │   └── api/        # API routes
│   │   │   ├── components/     # React components
│   │   │   ├── content/        # Static content data
│   │   │   ├── lib/           # Utilities, auth, database
│   │   │   ├── types/         # TypeScript definitions
│   │   │   └── middleware.ts   # Auth middleware
│   │   └── scripts/           # Utility scripts
│   └── espocrm/               # EspoCRM deployment config
├── docs/                      # Project documentation
│   ├── BUILD-JOURNAL.md       # Development history
│   └── espocrm-config-plan.md # CRM configuration
├── memory/                    # Context for AI assistants
│   ├── product_context.md     # Business & product info
│   ├── active_context.md      # Current technical state
│   ├── progress.md            # Milestone tracking
│   └── tasks.md               # Active tasks
├── rules/                     # Cursor IDE AI rules
│   ├── init.md               # Project initialization
│   ├── guide.md              # Development guidelines
│   ├── plan.md               # Planning process
│   ├── build.md              # Build process
│   └── review.md             # Review checklist
├── infra/                    # Infrastructure configs
├── STYLEGUIDE.md             # UI/UX design system
├── SITEMAP.md                # Site architecture
└── PROJECT-ROADMAP.md        # Strategic roadmap
```

## 🛠️ Technology Stack

### Frontend
- **Framework:** Next.js 15.5.3 (App Router, React Server Components)
- **Language:** TypeScript 5 (strict mode)
- **Styling:** Tailwind CSS 4
- **Components:** Custom UI components following brand guidelines
- **Forms:** React Hook Form + Zod validation
- **Rich Text:** TipTap editor (admin panel)

### Backend
- **Runtime:** Node.js 22.21.1
- **Database:** PostgreSQL 
- **ORM:** Prisma 6.19.0
- **Authentication:** NextAuth.js v5 (beta.25)
- **API:** Next.js API routes (REST)
- **Password Security:** bcryptjs

### Marketing & CRM
- **CRM:** EspoCRM (self-hosted on Railway)
- **Live Chat:** Chatwoot (planned deployment)
- **Analytics:** Google Analytics 4 via GTM
- **Email Marketing:** EspoCRM campaigns
- **Lead Capture:** Forms → EspoCRM API

### Infrastructure
- **Hosting:** Railway (web app + PostgreSQL)
- **Deployments:** Auto-deploy from GitHub main branch
- **CI/CD:** Railway + GitHub integration
- **Package Manager:** pnpm workspaces
- **Monorepo:** Multi-app workspace structure

## 📖 Key Documentation

### For Developers
- **[Product Context](memory/product_context.md)** - Business model, audiences, value proposition, CRM ecosystem
- **[Active Context](memory/active_context.md)** - Current technical state, recent changes, known issues
- **[Style Guide](STYLEGUIDE.md)** - UI/UX guidelines, components, branding
- **[Sitemap](SITEMAP.md)** - Site architecture and page blueprints
- **[Roadmap](PROJECT-ROADMAP.md)** - Strategic plan and delivery stages

### For AI Assistants
- **[Memory Bank](memory/)** - Complete project context
- **[Cursor Rules](rules/)** - Development guidelines and standards

### Technical Docs
- **[Build Journal](docs/BUILD-JOURNAL.md)** - Historical decisions
- **[EspoCRM Config](docs/espocrm-config-plan.md)** - CRM setup details

## 🌐 Features

### Public Website
- ✅ Bilingual (English `/` + Spanish `/es/`)
- ✅ Responsive design (desktop/tablet/mobile)
- ✅ Homepage with hero and value pillars
- ✅ Rooms showcase (4 accommodation types)
- ✅ Dining (Blø Bar & Restaurant)
- ✅ Experiences (activities and excursions)
- ✅ Sustainability practices
- ✅ Travel logistics guide
- ✅ Volunteering opportunities
- ✅ Contact forms → EspoCRM
- ✅ Newsletter popup → EspoCRM
- ✅ Gallery
- ✅ Dynamic stories pages

### Admin Panel (`/admin`)
- ✅ Secure authentication
- ✅ Blog management system
  - Rich content editor (TipTap)
  - Flexible content blocks
  - Draft/published workflow
  - Bilingual support
  - Category tagging
- ⏳ Public blog pages (to be rebuilt)

### Integrations
- ✅ EspoCRM lead capture
- ✅ Google Tag Manager
- ✅ Chatwoot chat widget (ready, needs credentials)
- ⏳ Booking engine (planned)
- ⏳ Payment gateway (planned)

## 🔧 Development

### Available Scripts

```bash
# Development
pnpm dev                    # Start dev server (all apps)
pnpm -F web dev            # Start web app only

# Database
pnpm -F web db:generate    # Generate Prisma client
pnpm -F web db:push        # Push schema to database
pnpm -F web db:migrate     # Run migrations
pnpm -F web db:setup       # Create admin user

# Build & Deploy
pnpm -F web build          # Build for production
pnpm -F web start          # Start production server

# Code Quality
pnpm -F web lint           # Run ESLint
```

### Environment Variables

Create `apps/web/.env.local`:

```bash
# Database
DATABASE_URL="postgresql://user:password@localhost:5432/dbp"

# Authentication
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="your-secret-key-here"

# Admin User (created automatically)
ADMIN_EMAIL="admin@donboscoperu.org"
ADMIN_PASSWORD="your-secure-password"

# Optional: EspoCRM Integration
ESPOCRM_URL="https://your-crm.com/api/v1"
ESPOCRM_API_KEY="your-api-key"

# Optional: Chatwoot
CHATWOOT_BASE_URL="https://your-chat.com"
CHATWOOT_TOKEN="your-token"

# Optional: Analytics
GTM_ID="GTM-XXXXXXX"
```

### Database Schema

Key models:
- **User** - Admin authentication
- **BlogPost** - Blog content with rich blocks (JSON)

See `apps/web/prisma/schema.prisma` for full schema.

## 🚢 Deployment

### Railway (Current)

**Auto-deployment:**
1. Push to `main` branch
2. Railway detects changes
3. Builds and deploys automatically
4. Runs database migrations
5. Creates admin user if needed

**Manual deployment:**
```bash
railway up
```

### Environment Setup (Railway)
Configure these variables in Railway dashboard:

**Required:**
- `DATABASE_URL` - `${{Postgres.DATABASE_URL}}`
- `NEXTAUTH_URL` - `https://${{RAILWAY_PUBLIC_DOMAIN}}`
- `NEXTAUTH_SECRET` - Generate with `openssl rand -base64 32`
- `ADMIN_EMAIL` - Your admin email
- `ADMIN_PASSWORD` - Secure password

**Optional:**
- `ESPOCRM_URL`, `ESPOCRM_API_KEY`
- `CHATWOOT_BASE_URL`, `CHATWOOT_TOKEN`
- `GTM_ID`

## 🎨 Style Guide

The project follows a comprehensive design system documented in [STYLEGUIDE.md](STYLEGUIDE.md).

### Brand Colors
- **Primary Ocean:** `#0E8BA8` - CTAs, links
- **Deep Navy:** `#1B2330` - Text, headers
- **Warm Sand:** `#F5EDE3` - Backgrounds
- **Golden Accent:** `#C7A46B` - Highlights
- **Coral Highlight:** `#D8684B` - Secondary CTAs

### Typography
- **Display:** Playfair Display
- **Headings:** Playfair Display
- **Body:** Source Sans Pro / Lato

## 🤝 Contributing

### Branch Strategy
- `main` - Production-ready code
- `feat/*` - New features
- `fix/*` - Bug fixes
- `docs/*` - Documentation

### Development Guidelines
1. Follow the style guide
2. Write TypeScript (strict mode)
3. Test responsive layouts
4. Maintain bilingual parity (EN/ES)
5. Document complex logic
6. Update memory bank for significant changes

### For New Developers
See [Product Context](memory/product_context.md) and [Active Context](memory/active_context.md) for complete project understanding.

## 📊 CRM & Marketing

### Lead Flow
```
Website Form → API Route → EspoCRM Lead → Sales Pipeline
Newsletter → API Route → EspoCRM Contact → Email Campaigns
Chat → Chatwoot → Webhook → EspoCRM Activity
```

### EspoCRM Pipeline Stages
1. New Inquiry
2. Qualified
3. Proposal Sent
4. Tentative Booking
5. Converted (Booked)
6. Lost/Unresponsive

### Data Captured
- Name (split: first/last)
- Email, Phone
- Language preference (EN/ES)
- Travel dates, party size
- Interests (rooms, activities, etc.)
- Source/campaign tracking

## 🔐 Security

- ✅ NextAuth session management
- ✅ Password hashing (bcryptjs, 10 rounds)
- ✅ Environment variable protection
- ✅ API route authentication
- ✅ CSRF protection (Next.js default)
- ⏳ Rate limiting (to implement)
- ⏳ Input sanitization review

## 📈 Analytics & Tracking

### Implemented
- Google Tag Manager container
- Page view tracking
- Form submission events (foundation)

### To Configure
- Conversion goals
- Event tracking (CTAs, chat, newsletter)
- E-commerce tracking (when booking system added)
- Campaign attribution

## 🐛 Known Issues

### High Priority
- Blog public pages removed (intentional, will rebuild)
- No automated booking system
- Mobile optimization incomplete

### Medium Priority
- SEO meta tags need review
- Image optimization needed
- Accessibility audit pending

See [Active Context](memory/active_context.md) for complete issue list.

## 📝 License

Proprietary - © 2025 Dolphin Blue Paradise. All rights reserved.

## 📞 Contact

- **Website:** [dolphinblueparadise.com](https://dolphinblueparadise.com)
- **Email:** contact@dolphinblueparadise.com
- **WhatsApp:** +507 6346 0605
- **Location:** Isla San Cristóbal, Bocas del Toro, Panama

---

## 🙏 Acknowledgments

- **Resort Team:** For authentic content and insights
- **Guests:** For testimonials and feedback
- **Community Partners:** Floating Doctors and local communities
- **Tech Stack:** Next.js, Prisma, Railway, EspoCRM teams

---

**Built with ❤️ for sustainable, eco-luxury travel**

Last updated: November 6, 2025
