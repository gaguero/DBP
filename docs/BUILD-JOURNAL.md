# Build Journal

## Phase 1 - Technical Setup
- [x] Created monorepo directory structure (`apps`, `packages`, `infra`, `docs`).
- [x] Configured pnpm workspace (`package.json`, `.npmrc`, `pnpm-workspace.yaml`).
- [x] Scaffolded Next.js + Tailwind (App Router) in `apps/web`.
- [x] Add baseline GitHub Actions workflow.
- [x] Define linting/prettier configs shared across packages.

## Phase 2 - Foundation Build
- [x] Established global design tokens, fonts, and utility classes in `globals.css`.
- [x] Implemented persistent layout with header, footer, and metadata.
- [x] Replaced home template with hero, value pillars, and story highlights using curated imagery.
- [x] Added booking widget placeholder section ready for embed integration.
- [x] Build reusable button & card components for reuse across pages.
- [x] Configure responsive navigation menu for mobile interactions.

## Phase 3 - Page Implementations
- [x] Rooms listing and dynamic room detail pages.
- [x] Dining page with service schedule and storytelling modules.
- [x] Experiences index and detail template.
- [x] Sustainability & Impact and Volunteering pages.
- [x] Plan Your Journey travel guide with FAQs.
- [x] Stories hub, article template, and gallery showcase.
- [x] Contact form scaffold with CRM-ready fields.
- [x] Privacy and Terms placeholders for legal copy.
- [x] Spanish language routes and content localization.
- [ ] Blog CMS integration (pending content source decision).

## Phase 4 - Integrations
- [x] Added serverless lead endpoint posting to EspoCRM with locale-aware redirects.
- [x] Embedded Chatwoot widget and Google Tag Manager loader across layouts.
- [x] Implemented reusable analytics helper and wired CTA events + lead success tracking.
- [x] Provisioned EspoCRM 9.2.2 on Railway (PostgreSQL, persistent volume, cron automation) and completed production install.
- [ ] Finalize blog/CMS selection and content pipeline.

---
Update this log as phases progress to maintain traceability for stakeholders and Railway deployment chores.
