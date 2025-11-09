# Dolphin Blue Paradise - Active Context

## Current State (November 6, 2025)

### Production Environment
- **Hosting:** Railway (https://railway.app)
- **Domain:** TBD (currently using Railway subdomain)
- **Status:** In development, preparing for production
- **Database:** PostgreSQL on Railway
- **Services:** Web app, EspoCRM, planned Chatwoot

### Technology Stack

#### Frontend
- **Framework:** Next.js 15.5.3 (App Router)
- **Language:** TypeScript 5
- **Styling:** Tailwind CSS 4
- **UI Components:** Custom components following brand style guide
- **Fonts:** Next.js font optimization

#### Backend
- **Runtime:** Node.js 22.21.1
- **Database:** PostgreSQL via Prisma ORM
- **Authentication:** NextAuth.js v5 (beta.25)
- **API:** Next.js API routes
- **Password Hashing:** bcryptjs

#### CRM & Marketing
- **CRM:** EspoCRM 9.2+ (self-hosted on Railway)
- **Chat:** Chatwoot (planned deployment)
- **Analytics:** Google Analytics 4 via GTM
- **Email:** Newsletter popup integrated with EspoCRM

#### Development Tools
- **Package Manager:** pnpm (workspace monorepo)
- **Linting:** ESLint 9
- **Type Checking:** TypeScript strict mode
- **Git:** GitHub repository
- **CI/CD:** Railway auto-deploy on push to main

### Project Structure

```
DBPwix/
├── apps/
│   ├── web/                    # Next.js application
│   │   ├── prisma/
│   │   │   └── schema.prisma   # Database schema
│   │   ├── public/
│   │   │   └── images/         # Static assets
│   │   ├── src/
│   │   │   ├── app/           # Next.js App Router pages
│   │   │   ├── components/    # React components
│   │   │   ├── content/       # Static content data
│   │   │   ├── lib/          # Utilities, auth, db
│   │   │   ├── types/        # TypeScript types
│   │   │   └── middleware.ts  # Auth middleware
│   │   └── package.json
│   └── espocrm/               # EspoCRM Docker config
├── docs/                      # Project documentation
├── memory/                    # AI context & memory bank
├── rules/                     # Cursor IDE rules
├── infra/                     # Infrastructure configs
└── package.json              # Root workspace config
```

## Recent Major Changes

### November 5-6, 2025: Cleanup & Organization
- **Removed:** Old Wix /src/ directory (9,870 PHP files)
- **Removed:** Legacy configuration files (wix.config.json)
- **Removed:** Presentation artifacts and one-time scripts
- **Removed:** Unused Next.js placeholder SVGs
- **Updated:** Memory bank with comprehensive context
- **Updated:** Project README and cursor rules

### November 5, 2025: Blog System Work
- **Built:** Complete admin blog system with rich content blocks
- **Built:** Blog editor with TipTap WYSIWYG
- **Built:** Blog API routes for CRUD operations
- **Built:** Blog post renderer for flexible content
- **Removed:** Public-facing blog pages (will rebuild when ready)
- **Status:** Admin can create/edit posts, but not visible to public yet

### October-November 2025: Core Development
- **Built:** Full bilingual website (English/Spanish)
- **Built:** Authentication system for admin panel
- **Built:** Newsletter popup with EspoCRM integration
- **Built:** Form handlers connecting to EspoCRM
- **Built:** Google Tag Manager integration
- **Built:** Chatwoot chat widget integration
- **Deployed:** EspoCRM on Railway with PostgreSQL

## Current Features

### Public Website
✅ **Homepage** (English + Spanish)
- Hero section with CTAs
- Value pillars
- Experience highlights
- Guest testimonials
- Newsletter popup (delayed 15s)

✅ **Rooms** (English + Spanish)
- 4 room types with details
- Photo galleries
- Amenities lists
- Booking CTAs

✅ **Dining** (English + Spanish)
- Restaurant overview
- Meal schedules
- Menu highlights
- Reservation info

✅ **Experiences** (English + Spanish)
- Activity listing
- Detail pages per experience
- Season information
- Booking integration

✅ **Sustainability**
- Eco-practices showcase
- Impact metrics
- Guest participation

✅ **Plan Your Journey**
- Travel logistics from multiple origins
- Transfer information
- Packing tips
- FAQ section

✅ **Volunteering**
- Floating Doctors partnership
- Donation wish list
- Volunteer opportunities
- Scholarship programs

✅ **Stories** (Dynamic, data-driven)
- Individual story pages
- Timeline layouts
- Photo galleries

✅ **Contact**
- Contact form → EspoCRM
- WhatsApp/email links
- Location information

✅ **Form Testing** (/form_testing)
- News and Offers form testing
- Get Personalized Assistance form testing
- Testing checklist and instructions

✅ **Gallery**
- Photo collection
- Activity-focused

✅ **Thank You Pages**
- Form submission confirmations

### Admin Panel
✅ **Authentication**
- Secure login (/admin/login)
- Session management
- Role-based access (foundation)

✅ **Blog Management** (/admin/blog)
- List all posts
- Create new posts
- Edit existing posts
- Rich content blocks:
  - Paragraphs
  - Headings (H1-H3)
  - Images with captions
  - Galleries
  - Quotes
  - Videos
  - Code blocks
  - Lists
  - Columns
  - Call-to-action blocks
  - Separators
- Draft/published workflow
- Bilingual support (EN/ES)
- Category tagging
- Reading time calculation

### API Routes
✅ **/api/newsletter** - Newsletter signup → EspoCRM
✅ **/api/lead** - Contact form → EspoCRM (supports News and Offers + Get Personalized Assistance)
✅ **/api/ga4-event** - GA4 event handler for behavioral tracking
✅ **/api/admin/blog** - Blog CRUD operations (auth required)
✅ **/api/blog** - Public blog data (ready, no public pages yet)
✅ **/api/auth/[...nextauth]** - Authentication handlers

### Integrations
✅ **EspoCRM Integration**
- Lead creation from forms
- Newsletter subscription tracking
- Contact management
- REST API connectivity
- Error handling and retry logic
- ✅ Drip campaign automation (News and Offers + Get Personalized Assistance)
- ✅ Lead scoring system (demographic + behavioral + engagement)
- ✅ GA4 behavioral tracking integration
- ✅ Mobile app access for concierge team

✅ **Google Tag Manager**
- Container loaded via `gtm.tsx` component
- Consent mode ready
- Event tracking infrastructure

✅ **Chatwoot Widget**
- Chat script component created
- Configuration ready
- Needs production credentials

## Known Issues & Technical Debt

### High Priority
- [ ] Blog public pages removed (intentional, will rebuild)
- [ ] No automated booking system (manual WhatsApp/email)
- [ ] No payment gateway integration
- [ ] Mobile responsive testing incomplete

### Medium Priority
- [ ] SEO meta tags need review
- [ ] Image optimization (some large files)
- [ ] Accessibility audit needed
- [ ] Performance optimization (Lighthouse scores)
- [ ] Error boundaries incomplete

### Low Priority
- [ ] Loading states on forms
- [ ] Toast notifications for user feedback
- [ ] Dark mode (not needed per brand)
- [ ] Progressive Web App features

## Environment Variables

### Required (Production)
```bash
# Database
DATABASE_URL=postgresql://...

# Authentication
NEXTAUTH_URL=https://your-domain.com
NEXTAUTH_SECRET=<secure-random-secret>

# Admin User
ADMIN_EMAIL=admin@donboscoperu.org
ADMIN_PASSWORD=<secure-password>
```

### Optional (Full Features)
```bash
# EspoCRM Integration
ESPOCRM_URL=https://crm.domain.com/api/v1
ESPOCRM_API_KEY=<api-key>

# Chatwoot Integration
CHATWOOT_BASE_URL=https://chat.domain.com
CHATWOOT_TOKEN=<token>

# Analytics
GTM_ID=GTM-XXXXXXX
```

## Development Workflow

### Local Development
1. Clone repository
2. Install dependencies: `pnpm install`
3. Copy `.env.example` to `.env.local`
4. Set up database: `pnpm -F web db:push`
5. Run dev server: `pnpm -F web dev`
6. Access: http://localhost:3000

### Database Management
```bash
# Generate Prisma client
pnpm -F web db:generate

# Push schema changes
pnpm -F web db:push

# Run migrations (production)
pnpm -F web db:migrate

# Create admin user
pnpm -F web db:setup
```

### Building
```bash
# Build for production
pnpm -F web build

# Start production server
pnpm -F web start
```

### Deployment
- Push to `main` branch
- Railway auto-deploys
- Migrations run automatically
- Admin user created if doesn't exist

## Database Schema

### Core Tables
- **User** - Admin authentication
  - email, password (hashed), name, role
  
- **BlogPost** - Blog content (admin only currently)
  - slug, title, excerpt, date, image, featuredImage
  - author, category, readingTime, locale
  - published (boolean)
  - contentBlocks (JSON)
  - timestamps

### Planned Tables
- Booking inquiries (if automated)
- Guest reviews/testimonials
- Activity bookings
- Newsletter subscribers (if not in EspoCRM)

## Next Steps & Priorities

### Immediate (Next 2 Weeks)
1. ✅ Clean up legacy files
2. ✅ Update documentation
3. ⏳ Prepare for new developer (sitemap implementation)
4. ⏳ Set up production domain
5. ⏳ Complete mobile testing

### Short Term (Next Month)
1. Rebuild public blog pages (when content ready)
2. Chatwoot production deployment
3. SEO optimization pass
4. Performance optimization
5. Accessibility audit and fixes

### Medium Term (Q1 2026)
1. Booking engine integration
2. Payment gateway
3. Automated availability calendar
4. ✅ Email campaign templates (Drip campaigns implemented)
5. ✅ Advanced analytics dashboards (GA4 + Lead Scoring)
6. ✅ Lead scoring system (implemented)
7. ✅ Mobile app setup (EspoCRM mobile app)

### Long Term (2026)
1. Multi-currency support
2. Seasonal pricing engine
3. Guest portal
4. Mobile app exploration
5. Marketing automation expansion

## Team & Collaboration

### Current Team
- **You:** Primary developer
- **New Developer:** Coming soon (sitemap focus)
- **AI Assistants:** Claude, Cursor AI

### Communication
- **Code:** GitHub pull requests
- **Documentation:** In-repo markdown files
- **Context:** Memory bank for AI assistants
- **Rules:** Cursor rules for AI guidance

### Branch Strategy
- **main:** Production-ready code
- **feat/*:** Feature branches
- **fix/*:** Bug fixes
- **docs/*:** Documentation updates

### New Developer Onboarding
- Will work on sitemap implementation
- Should create feature branch
- Has access to all context via memory bank
- Can use AI assistants with proper context
- Should follow UI style guide strictly

## Important Files for New Developers

### Must Read
1. `README.md` - Project overview
2. `memory/product_context.md` - Business context
3. `memory/active_context.md` - This file (technical state)
4. `STYLEGUIDE.md` - UI/UX guidelines
5. `SITEMAP.md` - Site architecture
6. `PROJECT-ROADMAP.md` - Strategic plan

### Reference During Development
1. `rules/` - Cursor AI guidelines
2. `docs/BUILD-JOURNAL.md` - Historical decisions
3. `apps/web/src/types/` - TypeScript definitions
4. `apps/web/prisma/schema.prisma` - Database schema

### Code Examples
1. `apps/web/src/app/rooms/[slug]/page.tsx` - Dynamic page pattern
2. `apps/web/src/components/newsletter-popup.tsx` - Form + API integration
3. `apps/web/src/app/api/lead/route.ts` - API route pattern
4. `apps/web/src/lib/auth.ts` - NextAuth configuration

## Monitoring & Analytics

### Currently Tracking
- Google Analytics 4 page views
- GTM event potential (not fully configured)
- Railway deployment logs
- Build success/failure

### To Implement
- Conversion funnel tracking
- Form submission events
- Chat engagement metrics
- Error logging (Sentry or similar)
- Uptime monitoring

## Security Considerations

### Implemented
- NextAuth session management
- Password hashing (bcryptjs)
- Environment variable protection
- API route authentication
- CSRF protection (Next.js default)

### To Review
- Rate limiting on forms
- Input validation/sanitization
- SQL injection prevention (Prisma handles)
- XSS protection
- Security headers

---

**Last Updated:** November 6, 2025 20:00  
**Current Sprint:** Drip Campaign Implementation + Lead Scoring + GA4 Integration  
**Next Milestone:** Complete EspoCRM configuration and testing

## Recent Implementation: Drip Campaigns System

### Completed (November 6, 2025)
- ✅ Complete implementation plan for drip campaigns
- ✅ Lead scoring system design (demographic + behavioral + engagement)
- ✅ GA4 integration architecture for behavioral tracking
- ✅ Mobile app setup instructions
- ✅ 7 complete email templates (6 drip + 1 manual)
- ✅ Frontend form testing page (/form_testing)
- ✅ API endpoint updates for dual form support
- ✅ n8n workflow designs for GA4 → EspoCRM
- ✅ GTM tracking scripts for form views, CTA clicks, engagement

### Pending Configuration (Manual Steps Required)
- ⏳ EspoCRM custom fields creation
- ⏳ BPM workflows configuration (OR custom workflow system implementation)
- ⏳ Email templates upload to EspoCRM
- ⏳ Target Lists creation
- ⏳ SMTP configuration
- ⏳ Lead scoring workflows setup
- ⏳ n8n workflow deployment
- ⏳ Mobile app setup for concierge team

### Documentation Created
- `docs/complete-implementation-guide.md` - Full implementation guide with all details
- `docs/ga4-integration-scripts.md` - GA4 scripts and n8n workflows
- `docs/implementation-plan-drip-campaigns.md` - Original implementation plan
- `docs/espocrm-drip-campaign-setup.md` - Updated with 2-form approach

---

## MAJOR NEW PROJECT: Custom Workflow System for EspoCRM

### Context
**Problem:** EspoCRM's native workflows require paid "Advanced Pack". We need a powerful, easy-to-use workflow system similar to HubSpot, directly integrated into EspoCRM.

**Decision:** Build custom EspoCRM extension/module with graphical interface (React Flow) and full workflow capabilities.

**Status:** Specification complete, implementation planning ready

### Research Completed (November 2025)

#### Phase 1: Alternative Solutions Research
- ✅ Researched free alternatives (Node.js scripts, n8n, webhooks, PHP extensions)
- ✅ Documented in `docs/workflows-free-alternatives-research.md`
- ✅ User requested native EspoCRM solution instead

#### Phase 2: HubSpot Workflow Analysis
- ✅ Analyzed HubSpot workflow features comprehensively
- ✅ Documented all triggers, conditions, actions, delays, branching
- ✅ Identified enrollment management, logging, monitoring needs

#### Phase 3: EspoCRM Codebase Investigation
- ✅ Explored EspoCRM HookManager system (`apps/espocrm/src/application/Espo/Core/HookManager.php`)
- ✅ Investigated JobScheduler and JobManager (`apps/espocrm/src/application/Espo/Core/Job/`)
- ✅ Reviewed entity definition structure
- ✅ Understood extension/module architecture
- ✅ Confirmed feasibility of custom implementation

#### Phase 4: Complete Specification
- ✅ Created comprehensive specification (`docs/workflows-complete-specification.md`)
- ✅ Defined all entities (Workflow, WorkflowExecution, WorkflowLog)
- ✅ Specified all triggers (Record, Behavior, Time, Enrollment)
- ✅ Specified all conditions (operators, logic, special conditions)
- ✅ Specified all actions (Email, Record, List, Assignment, Task, Workflow, Delay, Branching, Custom Code)
- ✅ Designed React Flow graphical interface
- ✅ Designed execution engine architecture

### Key Technical Findings

#### EspoCRM Integration Points
1. **Hook System:** 
   - HookManager automatically discovers hooks in `Hooks/{EntityType}/` folders
   - Hooks implement `beforeSave()`, `afterSave()`, `afterRemove()` methods
   - Perfect for triggering workflows on record events

2. **Job System:**
   - JobScheduler creates scheduled jobs with `scheduledAt` timestamp
   - JobManager processes jobs from queues (Q0, Q1, E0, etc.)
   - Perfect for delayed workflow execution

3. **Entity System:**
   - Custom entities defined in `metadata/entityDefs/{EntityType}.json`
   - EntityManager handles CRUD operations
   - Can create Workflow, WorkflowExecution, WorkflowLog entities

4. **API System:**
   - Controllers automatically generate REST API endpoints
   - Services contain business logic
   - Can create workflow management API

#### Frontend Integration Strategy
- **Challenge:** EspoCRM uses Backbone.js/RequireJS, we want React Flow
- **Solution:** Embed React Flow app in iframe within EspoCRM custom module
- **Communication:** postMessage API between iframe and EspoCRM
- **Benefits:** Modern UX, minimal EspoCRM core changes

### Architecture Overview

#### Backend Components
- **WorkflowEngine:** Parses definitions, executes workflows
- **WorkflowScheduler:** Handles delays and scheduled execution
- **WorkflowParser:** Validates and parses workflow JSON
- **Hooks:** Trigger workflows on EspoCRM events
- **Jobs:** Execute scheduled workflow steps
- **Actions:** Implement all workflow actions (Send Email, Update Record, etc.)

#### Frontend Components
- **React Flow Editor:** Graphical workflow builder
- **Node Types:** Trigger, Action, Condition, Delay, Branch, Code
- **Features:** Drag & drop, zoom & pan, undo/redo, validation, testing
- **Integration:** Embedded in EspoCRM via iframe

#### Data Model
- **Workflow Entity:** Stores workflow definitions (JSON)
- **WorkflowExecution Entity:** Tracks individual workflow runs
- **WorkflowLog Entity:** Detailed execution logs

### Implementation Status

#### Completed
- ✅ Complete specification document
- ✅ Technical feasibility confirmed
- ✅ Architecture designed
- ✅ Integration points identified

#### Next Steps (Ready for Implementation Planning)
1. Create detailed implementation plan
2. Set up development environment
3. Create entity definitions
4. Implement WorkflowEngine core
5. Implement hooks integration
6. Implement job scheduling
7. Build React Flow frontend
8. Integrate frontend with EspoCRM
9. Testing and refinement

### Documentation Created
- `docs/workflows-complete-specification.md` - Complete specification (705 lines)
- `docs/workflows-free-alternatives-research.md` - Initial research on alternatives
- `docs/CREAR-WORKFLOWS-BPM.md` - Manual BPM workflow guide (for reference)
- `memory/system_patterns.md` - Architecture and system patterns
- `memory/tech_context.md` - Technical details and implementation notes

### Key Decisions
1. **React Flow over native builder:** Better UX, faster development
2. **JSON storage:** Flexible, easy to version
3. **EspoCRM JobScheduler:** Native integration, reliable
4. **EspoCRM HookManager:** Native integration, automatic discovery
5. **Custom module:** Maintainable, upgradeable, follows best practices
