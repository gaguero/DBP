# Project Cleanup & Developer Onboarding Preparation Plan
## Dolphin Blue Paradise Website

**Date:** November 6, 2025  
**Purpose:** Prepare the project for new developer implementing sitemap features

---

## 🎯 Goals
1. Remove unused, old, and unnecessary files
2. Organize project documentation
3. Create clear onboarding materials
4. Establish development guidelines
5. Document UI/UX style, CRM context, and marketing integration

---

## 📋 Phase 1: File Cleanup & Organization

### A. Files to REMOVE (Unused/Deprecated)

#### Root Level - Legacy Wix Files
- [ ] `/src/` directory (entire folder - **9,870 PHP files**, old Wix backend)
  - Contains old Wix pages, permissions, and backend files
  - Not used in Next.js implementation
- [ ] `wix.config.json` - No longer needed
- [ ] `test-layout.js` - Root level test file, should be in app if needed
- [ ] `media-gallery.html` - Static legacy file
- [ ] `media-urls.txt` - Text file for migration (completed)

#### Docs Cleanup
- [ ] `/docs/presentation.html` - One-time presentation artifact
- [ ] `/docs/presentation-script.html` - One-time presentation artifact
- [ ] `/docs/presentation-script.md` - One-time presentation artifact
- [ ] `/docs/track.srt` - Subtitle file artifact
- [ ] `/docs/track_en.srt` - Subtitle file artifact
- [ ] `/docs/transcribe.py` - One-time use script
- [ ] `/docs/translate.py` - One-time use script

#### Unnecessary Root Files
- [ ] `CLAUDE.md` - AI assistant notes (consolidate into memory/)

#### Web App - Unused SVG Placeholders
- [ ] `/apps/web/public/file.svg` - Next.js placeholder
- [ ] `/apps/web/public/globe.svg` - Next.js placeholder
- [ ] `/apps/web/public/next.svg` - Next.js placeholder
- [ ] `/apps/web/public/vercel.svg` - Next.js placeholder
- [ ] `/apps/web/public/window.svg` - Next.js placeholder

### B. Files to CONSOLIDATE

#### Documentation
- [ ] Move `CLAUDE.md` content to `memory/ai_assistant_notes.md`
- [ ] Merge `apps/web/README.md` with main project README
- [ ] Merge `apps/web/BLOG_SETUP.md` into main docs
- [ ] Merge `apps/web/RAILWAY_DEPLOY.md` into deployment docs

---

## 📋 Phase 2: Documentation Structure

### New Documentation Organization

```
docs/
├── 00-START-HERE.md                  # NEW: First stop for new developers
├── 01-ONBOARDING.md                  # NEW: Complete setup guide
├── 02-ARCHITECTURE.md                # NEW: Technical architecture
├── 03-DEVELOPMENT-GUIDE.md           # NEW: How to develop features
├── 04-UI-STYLE-GUIDE.md             # Move from STYLEGUIDE.md
├── 05-CRM-INTEGRATION.md            # NEW: EspoCRM & Chatwoot guide
├── 06-DEPLOYMENT.md                  # Consolidate deployment docs
├── 07-TESTING.md                     # NEW: Testing guidelines
├── BUILD-JOURNAL.md                  # Keep (historical reference)
└── espocrm-config-plan.md           # Keep (technical reference)

memory/
├── product_context.md                # UPDATE: Consolidate project context
├── active_context.md                 # UPDATE: Current state
├── progress.md                        # UPDATE: Milestone tracking
├── tasks.md                          # UPDATE: Active tasks
└── ai_assistant_notes.md             # NEW: AI collaboration notes

rules/
├── init.md                           # UPDATE: Project initialization
├── guide.md                          # UPDATE: Development guidelines
├── plan.md                           # UPDATE: Planning process
├── build.md                          # UPDATE: Build process
└── review.md                         # UPDATE: Review checklist
```

---

## 📋 Phase 3: New Documentation to CREATE

### 1. **docs/00-START-HERE.md**
**Purpose:** First page for any new developer

**Contents:**
- Project overview (what is DBP?)
- Quick start (get running in 10 minutes)
- Key links to other documentation
- Who to contact for what
- Common tasks quick reference

### 2. **docs/01-ONBOARDING.md**
**Purpose:** Complete developer onboarding

**Contents:**
- Prerequisites (Node, pnpm, Docker, Railway CLI)
- Environment setup
- Database setup (Prisma)
- Running locally
- Understanding the monorepo structure
- Getting access to services (EspoCRM, Chatwoot, Railway)

### 3. **docs/02-ARCHITECTURE.md**
**Purpose:** Technical architecture overview

**Contents:**
- Technology stack
- Monorepo structure
- Next.js app architecture
- Database schema
- API routes
- Authentication system
- CRM integration points
- External services (GTM, Chatwoot)

### 4. **docs/03-DEVELOPMENT-GUIDE.md**
**Purpose:** How to develop new features

**Contents:**
- Branch strategy
- Creating new pages
- Component guidelines
- Styling conventions (Tailwind)
- Bilingual content (EN/ES)
- Form handling
- API route patterns
- Testing requirements
- Commit conventions

### 5. **docs/05-CRM-INTEGRATION.md**
**Purpose:** Marketing & CRM context

**Contents:**
- EspoCRM overview
- Lead capture flows
- Newsletter popup behavior
- Form submission handling
- Analytics tracking (GTM)
- Chatwoot chat widget
- Marketing automation context
- Data flow diagrams

### 6. **docs/04-UI-STYLE-GUIDE.md**
**Purpose:** Rename and update STYLEGUIDE.md

**Contents:**
- All existing style guide content
- Component examples with code
- Responsive breakpoints
- Animation guidelines
- Accessibility requirements
- Brand voice & tone
- Content guidelines

### 7. **memory/product_context.md** (UPDATE)
**Purpose:** Complete product & business context

**Contents:**
- Business model
- Target audience
- Value proposition
- Competitive advantages
- Key features
- Content strategy
- SEO strategy
- Booking funnel
- Guest journey map

---

## 📋 Phase 4: Update Existing Documentation

### README.md (Root) - Major Update
**Current state:** Wix-focused legacy content

**New structure:**
```markdown
# Dolphin Blue Paradise Website

> Eco-luxury resort website built with Next.js, EspoCRM, and modern tooling

## Quick Links
- [🚀 Start Here](docs/00-START-HERE.md)
- [📚 Full Documentation](docs/)
- [🎨 UI Style Guide](docs/04-UI-STYLE-GUIDE.md)
- [🏗️ Architecture](docs/02-ARCHITECTURE.md)

## Project Overview
[Brief description]

## Tech Stack
- Next.js 15 (App Router)
- TypeScript
- Tailwind CSS
- Prisma + PostgreSQL
- NextAuth.js
- EspoCRM
- Chatwoot
- Railway (hosting)

## Getting Started
See [Onboarding Guide](docs/01-ONBOARDING.md)

## Project Structure
[Monorepo layout]

## Contributing
See [Development Guide](docs/03-DEVELOPMENT-GUIDE.md)

## Deployment
See [Deployment Guide](docs/06-DEPLOYMENT.md)
```

### PROJECT-ROADMAP.md - Update Status
- [ ] Update with current completed stages
- [ ] Mark what's done vs pending
- [ ] Add timeline estimates

### SITEMAP.md - Enhance
- [ ] Add implementation status per page
- [ ] Add component inventory
- [ ] Add integration points per page
- [ ] Link to actual page files

---

## 📋 Phase 5: Create Developer Aids

### 1. **COMPONENT_INVENTORY.md**
- List all components
- Usage examples
- Props documentation
- When to use what

### 2. **API_ROUTES.md**
- Document all API endpoints
- Request/response examples
- Authentication requirements
- Rate limiting notes

### 3. **CONTENT_MANAGEMENT.md**
- How content is structured
- Where to find English vs Spanish
- Adding new pages
- Blog system overview

### 4. **TROUBLESHOOTING.md**
- Common issues
- Database connection problems
- Build errors
- Deployment issues
- Environment variable problems

---

## 📋 Phase 6: Code Organization

### Standardize File Naming
- [ ] Ensure consistent component naming
- [ ] Organize by feature where possible
- [ ] Group related components

### Add Code Comments
- [ ] Document complex logic
- [ ] Add JSDoc to utility functions
- [ ] Explain business logic contexts

### Create Examples
- [ ] Example page component
- [ ] Example API route
- [ ] Example form handler
- [ ] Example bilingual page

---

## 📋 Phase 7: Memory Bank Updates

### Update memory/product_context.md
```markdown
# Product Context - Dolphin Blue Paradise

## Business Model
- Boutique eco-luxury resort
- 4 room types, off-grid location
- Bocas del Toro, Panama

## Target Audience
1. Eco-conscious luxury travelers
2. Adventure couples
3. Families seeking unique experiences
4. Purpose-driven volunteers

## Value Proposition
[Details...]

## Marketing Strategy
- Direct bookings priority
- SEO & content marketing
- EspoCRM for lead management
- Newsletter campaigns
- Chat-based conversion

## Key Metrics
- Conversion rate targets
- Lead sources
- Booking patterns
```

### Update memory/active_context.md
```markdown
# Active Context

## Current State
- Production site: [URL]
- Blog system: Implemented (admin only, no public pages yet)
- CRM: EspoCRM integrated
- Chat: Chatwoot installed
- Authentication: NextAuth working

## Active Development
- Sitemap implementation (new developer)
- [Other features]

## Recent Changes
[Git history reference]

## Known Issues
[List any bugs or technical debt]
```

---

## 📋 Phase 8: Pre-Developer Checklist

### Before New Developer Starts

#### Access & Permissions
- [ ] GitHub repository access (collaborator)
- [ ] Railway project access
- [ ] EspoCRM admin account
- [ ] Chatwoot agent account
- [ ] Google Analytics view access
- [ ] GTM access (if needed)

#### Documentation Complete
- [ ] All new docs created
- [ ] README updated
- [ ] Component inventory complete
- [ ] API documentation done
- [ ] Troubleshooting guide ready

#### Code Quality
- [ ] Remove all console.logs (except intentional)
- [ ] Fix any ESLint warnings
- [ ] Ensure all types are proper
- [ ] No unused imports

#### Repository
- [ ] All cleanup items removed
- [ ] Git history clean
- [ ] No sensitive data in commits
- [ ] .env.example up to date
- [ ] Dependencies up to date

#### Communication
- [ ] Slack/Discord channel setup
- [ ] Introduction email sent
- [ ] Kickoff meeting scheduled
- [ ] Sitemap requirements shared

---

## 📋 Phase 9: Developer Handoff Package

### Create a **DEVELOPER_HANDOFF.md** with:

1. **Welcome & Context**
   - Who we are
   - What we're building
   - Why it matters

2. **Your Mission**
   - Sitemap implementation scope
   - Expected deliverables
   - Timeline

3. **Getting Started**
   - Step-by-step first day
   - Who to ask for help
   - Communication guidelines

4. **Working with AI Assistants**
   - How we use AI in development
   - Best practices for AI-assisted coding
   - Context files to share with AI
   - Quality standards

5. **Branch Strategy**
   - Name your branch: `feat/sitemap-implementation`
   - PR process
   - Code review expectations

6. **Success Criteria**
   - What "done" looks like
   - Testing requirements
   - Documentation expectations

---

## 🎯 Execution Priority

### Week 1: Critical Cleanup
1. Remove `/src/` directory (9,870 PHP files)
2. Remove unnecessary root files
3. Remove docs artifacts
4. Remove SVG placeholders

### Week 1: Core Documentation
1. Create docs/00-START-HERE.md
2. Create docs/01-ONBOARDING.md
3. Update root README.md
4. Update memory/product_context.md

### Week 2: Technical Documentation
1. Create docs/02-ARCHITECTURE.md
2. Create docs/03-DEVELOPMENT-GUIDE.md
3. Create docs/05-CRM-INTEGRATION.md
4. Update SITEMAP.md with status

### Week 2: Developer Prep
1. Create COMPONENT_INVENTORY.md
2. Create API_ROUTES.md
3. Create DEVELOPER_HANDOFF.md
4. Set up access & permissions

---

## 📊 Success Metrics

### Documentation Quality
- [ ] New developer can run project in <30 minutes
- [ ] No questions about where to find things
- [ ] AI assistants can understand project context
- [ ] Clear separation of concerns

### Code Quality
- [ ] Zero linting errors
- [ ] All TypeScript strict mode passing
- [ ] No unused files
- [ ] Clean git history

### Onboarding Experience
- [ ] Positive developer feedback
- [ ] Fast time to first commit
- [ ] Minimal setup friction
- [ ] Clear contribution path

---

## 🚀 Next Steps

1. **Review this plan** with team
2. **Prioritize** what's most critical
3. **Execute** cleanup (Phase 1-2)
4. **Create** documentation (Phase 3-4)
5. **Test** onboarding flow
6. **Invite** new developer

---

**Questions? Updates?**
Keep this document updated as we execute the plan.

