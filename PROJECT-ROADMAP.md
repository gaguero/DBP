# Dolphin Blue Paradise – Pre-Build Roadmap

## 1. Project Foundations
- **Business objectives:** Define revenue targets, booking mix (direct vs OTA), and KPIs (conversion rate, lead volume, average booking value).
- **Audience profiles:** Prioritise segments (eco-luxury couples, families, volunteers) with key motivations and objections.
- **Brand assets:** Confirm final logo files, typography licenses, color specs, tone of voice, and photography usage rights.
- **Operational inputs:** Booking engine provider/API (embedded widget), payment workflows, cancellation policies, pricing update cadence, bilingual content process.
- **Compliance:** Data privacy requirements (GDPR/CCPA), cookie consent approach, accessibility targets (WCAG 2.1 AA), analytics opt-in rules.

Collect this information before locking technical architecture or content outlines.

## 2. Selected Digital Stack (Unified Offering)
- **CRM:** EspoCRM (self-hosted) deployed on Railway. Provides customizable entities, workflow automation, REST API, multilingual support, and lightweight UI suitable for concierge/staff use.
- **Analytics:** Google Analytics 4 via Google Tag Manager. Configure consent mode, custom events, and booking funnel tracking.
- **Live Chat & Shared Inbox:** Chatwoot (self-hosted on Railway). Supports multilingual chat, WhatsApp/SMS/email channels, canned responses, assignment rules, and integrates with EspoCRM via webhooks/API.
- **Automation Layer:** n8n (Railway) for workflow orchestration between site, CRM, chat, and external services while remaining open-source.
- **Website:** Modern framework (e.g., Next.js/SvelteKit) backed by headless CMS or content layer as needed, deployed to Railway.
- **Infrastructure Packaging:** Monorepo with service-specific folders and shared tooling. Railway instances reference subdirectories via build commands to deliver a managed “all-in-one” digital suite under one SLA.

### Monorepo Blueprint
```
project-root/
├─ apps/
│  ├─ web/            # Front-end site
│  ├─ espocrm/        # EspoCRM Docker definition & extensions
│  ├─ chatwoot/       # Chatwoot deployment assets
│  ├─ automations/    # n8n flows and custom workers
│  └─ ops-console/    # Optional admin dashboard / status page
├─ packages/
│  ├─ ui-kit/         # Shared UI components
│  ├─ config/         # Shared config schemas, env definitions
│  └─ scripts/        # CLI tooling for deployment
├─ infra/
│  ├─ railway/        # Railway service templates (json/yaml)
│  └─ monitoring/     # Observability configs (Grafana, alerting)
└─ docs/              # Internal runbooks, SOPs
```
- Railway projects will be managed via the web dashboard and connected to GitHub; each service uses monorepo path settings in Railway UI.
- Shared environment variables stored in Railway variable groups; secrets injected per service.

## 3. Staged Delivery Plan
### Stage 0 – Discovery & Alignment
- **Goals:** Validate objectives, gather stakeholders, audit legacy Wix content.
- **Inputs needed:** Stakeholder interviews, existing analytics (if any), customer feedback, sales/service pain points.
- **Outputs:** Project charter, success metrics, prioritized requirements backlog.

### Stage 1 – Content & Asset Preparation
- **Goals:** Finalise copy, translations, media selection, legal text.
- **Inputs needed:** Approved sitemap (`SITEMAP.md`), brand photography (curated from `legacy-media/` + new shoots), menu PDFs, activity pricing.
- **Outputs:** Content matrix, localization plan, updated asset library with alt text & captions.

### Stage 2 – Experience Architecture
- **Goals:** Translate sitemap into user journeys, outline navigation, define data models.
- **Inputs needed:** Booking flow decisions (embedded widget specs), form field requirements, SEO keyword map, analytics events list.
- **Outputs:** Low-fidelity wireframes, interaction diagrams, CMS/content model schema.

### Stage 3 – Visual Design System
- **Goals:** Apply `STYLEGUIDE.md` to high-fidelity layouts.
- **Inputs needed:** Accessibility checklist, device breakpoints, photography grading references.
- **Outputs:** Desktop/mobile mockups, component library, UI kit specification.

### Stage 4 – Technical Architecture & Tooling
- **Goals:** Finalise monorepo architecture, Railway service plan, and CI/CD pipeline (Railway + GitHub Actions).
- **Inputs needed:** DevOps constraints, budget for hosting, integration endpoints (booking widget embed, CRM, chat).
- **Outputs:** Architecture diagram, environment plan (dev/stage/prod on Railway), infrastructure-as-code manifests, dependency list.

### Stage 5 – Implementation & Integrations
- **Goals:** Build templates, components, CMS collections, and connect EspoCRM + Chatwoot + GA4.
- **Inputs needed:** Approved designs, structured content, integration credentials, workflow definitions.
- **Outputs:** Functional site, synchronized lead flows, multilingual chat widget, analytics dashboards, n8n automation flows.

### Stage 6 – QA, Performance & Compliance
- **Goals:** Validate functionality, responsive behavior, accessibility, SEO, performance benchmarks.
- **Inputs needed:** Test plans, device/browser matrix, Lighthouse thresholds, privacy/legal review.
- **Outputs:** QA reports, bug backlog, compliance sign-off.

### Stage 7 – Launch & Post-Launch Optimisation
- **Goals:** Deploy to production Railway environments, monitor analytics, enable continuous improvement loop, and deliver staff training plan.
- **Inputs needed:** Launch checklist, rollback strategy, communication plan; training curriculum drafted during QA for delivery post-launch.
- **Outputs:** Release notes, scheduled staff training sessions, backlog of enhancements.

## 4. Railway Deployment & Environment Strategy
- **Services:**
  - `web-app` (apps/web) – Node.js build, static export or SSR.
  - `espocrm` (apps/espocrm) – Docker service with MariaDB add-on or managed Railway database.
  - `chatwoot` (apps/chatwoot) – Docker deployment with Redis + Postgres Railway addons.
  - `automations` (apps/automations) – n8n container with secure webhook URLs.
  - `monitoring` – Optional health check service or status page.
- **Environments:** Use Railway environments (`development`, `staging`, `production`) via web UI. Link GitHub repo and configure service-specific deploy paths.
- **CI/CD:** GitHub Actions pipeline to lint/test; Railway web integration triggers deploys on branch merges, with optional `railway up` CLI for manual promotion.
- **Secrets Management:** Use Railway variable groups for shared secrets (API keys, SMTP). Rotate credentials quarterly and mirror in local `.env.example` for onboarding.
- **Logging & Monitoring:** Enable Railway logs + integrate with open-source ELK stack or Grafana Cloud if needed. Configure uptime checks for each service.
- **Backups:** Schedule automated database snapshots (EspoCRM/Postgres) and export n8n flows. Store in object storage (Railway volumes or external S3-compatible bucket).

## 5. Analytics, Chat, and CRM Implementation Details
### Google Analytics 4 + Tag Manager Best Practices
- Implement GA4 via Google Tag Manager to separate measurement logic from code releases.
- Configure consent mode to respect EU/LatAm privacy regulations; integrate with cookie banner.
- Track key events: page views, hero CTA clicks, booking widget interactions, form submissions, chat engagements, itinerary downloads.
- Use UTM parameters for campaign tracking (ads, partner referrals) and set up conversion goals aligned with CRM stages.
- Enable cross-domain measurement if the embedded booking widget loads from a different domain.

### Chatwoot Deployment Notes
- Self-host via Docker on Railway; secure with HTTPS (Railway provides automatic certificates) and enforce SSO if possible.
- Configure inboxes: website live chat, WhatsApp (if licensed), email forwarding. Set business hours and escalation rules to on-call staff.
- Create playbooks: automated welcome message, proactive pop-ups on key pages (Rooms, Plan Your Journey), and follow-up email when chat is missed.
- Connect Chatwoot webhooks to EspoCRM or n8n to log conversations as leads/activities.

### EspoCRM Lead Management Blueprint
1. **Lead Capture Channels**
   - Web forms (booking inquiry, contact, volunteering) submit to EspoCRM via REST API or n8n webhook.
   - Chatwoot webhook creates or updates matching contacts/leads.
   - Manual imports from walk-in or OTA requests using CSV template with validation rules.

2. **Data Hygiene**
   - Standardise required fields: name, email/phone, preferred language, travel dates, party size, interests (rooms, dining, activities, volunteering).
   - Apply deduplication rules (email/phone) and use automated merging to avoid duplicates.
   - Tag leads by source (Website Hero CTA, Chatwoot, Referral Partner) for reporting.

3. **Pipeline Structure**
   - Suggested stages: `New Inquiry → Qualified → Proposal Sent → Tentative Booking → Converted → Lost/Unresponsive`.
   - For volunteering/community requests, maintain a parallel pipeline or additional status field.
   - Use Kanban view to visualise concierge workload and assign owners.

4. **Automations & Workflows**
   - Auto-assign leads based on language or interest (rooms vs experiences) to relevant coordinators.
   - Trigger email/SMS acknowledgements (via EspoCRM BPM + SMTP) confirming receipt and outlining next steps.
   - Schedule follow-up tasks reminders (24h, 72h) and escalate to managers if no response.
   - Sync with Google Calendar/ICS to track site tours or calls.

5. **Analytics & Reporting**
   - Create custom dashboards: inquiries by source, conversion rate by room type, time-to-first-response, lost reason analysis.
   - Feed GA4 events into CRM via UTM parameters to trace digital campaigns to revenue.
   - Export weekly summary to leadership; archive monthly snapshots for forecasting.

6. **Data Governance**
   - Define retention policy (e.g., purge inactive leads after 24 months) and anonymise data on request.
   - Restrict user roles (concierge, marketing, admin) with principle of least privilege.
   - Log consent status (marketing, WhatsApp) directly on contact records; honor opt-outs across channels.

### Integration Topology
- **Website → EspoCRM:** REST API endpoints using secured service user + rate limiting; send JSON payloads from serverless functions or backend.
- **Website → Chatwoot:** Embed chat widget with initialization parameters (language, guest context). Pass CRM contact ID when known.
- **EspoCRM ↔ Chatwoot:** Use Chatwoot webhooks to create/update leads; optionally send conversation summaries back to CRM via automation scripts.
- **Analytics ↔ CRM:** Nightly n8n sync to push GA4 campaign data into EspoCRM for attribution dashboards.
- **Backups:** Nightly database snapshots for EspoCRM (MariaDB) and Chatwoot (Postgres), plus storage of n8n export and CMS backups.

## 6. Outstanding Information Checklist
- Final confirmation of Railway project setup (linked GitHub repo, environment names, resource tiers).
- Booking widget technical documentation (embed snippet, customization options, event hooks for GA4/CRM tags).
- Consent/banner solution compatible with GA4 and Chatwoot (e.g., Cookiebot, open-source Klaro!).
- Multilingual support plan across website, Chatwoot canned responses, and EspoCRM templates.
- Draft staff training curriculum to deliver post-launch, covering EspoCRM pipelines, Chatwoot console, analytics dashboards.
- Service-level expectations for the bundled package (support hours, update cadence, monitoring).

Use this roadmap to align stakeholders and deliver the Dolphin Blue Paradise digital suite as an integrated, Railway-hosted, open-source package.
