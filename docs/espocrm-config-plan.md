# EspoCRM Configuration Plan

Use this plan to guide the end-to-end setup of the Dolphin Blue Paradise EspoCRM instance that is already running on Railway. Tasks are grouped so the concierge team can begin operating once content and automation assets are ready.

## 1. Environment Snapshot
- **Hosting:** Railway Docker service (`apps/espocrm`) backed by managed PostgreSQL and a single `/persistent` volume (apps/espocrm/README.md:11).
- **Access:** Admin credentials stored in secure vault; API key to be generated for the website and automations.
- **Backups:** Daily PostgreSQL snapshots plus weekly `/persistent` exports to object storage (PROJECT-ROADMAP.md:146).
- **Cron:** Entry point registers cron on boot; confirm scheduled jobs from Administration -> Scheduled Jobs.

## 2. Configuration Workstreams
1. **Data Model & Dictionaries**
   - Finalise lead/contact/account fields: travel dates, party size, stay interests, traveller language, consent status, source tags (PROJECT-ROADMAP.md:116).
   - Build dropdown dictionaries for interests, room type, referral partner, booking intent confidence.
   - Apply validation rules and duplicate-prevention logic (email/phone) for clean intake.
2. **Lead Pipelines & Views**
   - Implement primary pipeline: `New Inquiry -> Qualified -> Proposal Sent -> Tentative Booking -> Converted -> Lost/Unresponsive` (PROJECT-ROADMAP.md:121).
   - Create volunteer/community track via parallel pipeline or status field (PROJECT-ROADMAP.md:122).
   - Configure Kanban and list views with WIP limits and concierge ownership filters (PROJECT-ROADMAP.md:123).
3. **Automations & Notifications**
   - Auto-assign by preferred language, channel, or interest bucket (rooms vs experiences) (PROJECT-ROADMAP.md:126).
   - Draft bilingual acknowledgement templates (email/SMS) with dynamic placeholders.
   - Schedule 24h/72h follow-up activities and managerial escalation for idle leads (PROJECT-ROADMAP.md:128).
   - Sync confirmed calls/tours to Google Calendar via BPM and service account (PROJECT-ROADMAP.md:129).
4. **Inbound Channel Wiring**
   - Website forms: confirm JSON schema, n8n webhook, and REST authentication using service API key (PROJECT-ROADMAP.md:110; PROJECT-ROADMAP.md:142).
   - Chatwoot: map webhook payload to upsert contacts, log transcripts, attach tags (PROJECT-ROADMAP.md:144).
   - CSV imports: provide template with validation rules for concierge/OTA/walk-in data (PROJECT-ROADMAP.md:113).
   - Preserve tracking context (UTM, device, stay interest) on leads for attribution (docs/presentation.html#L365).
5. **Multilingual Assets**
   - Prepare EN/ES copies for pipeline stage names, email templates, canned replies, and lead fields (PROJECT-ROADMAP.md:152).
   - Ensure concierge teams have schedule-based routing and SLA notes per language.
6. **Security & Governance**
   - Define roles: concierge, marketing, admin, contractor with least-privilege permissions (PROJECT-ROADMAP.md:138).
   - Enforce MFA, password policy, and login IP alerts if supported.
   - Track consent flags (marketing, WhatsApp) and purge logic for inactive records after 24 months (PROJECT-ROADMAP.md:137).
   - Document incident response and data subject request workflow.
7. **Analytics & Reporting**
   - Build dashboards: inquiries by source, conversion rate by room type, time-to-first-response, lost reason breakdown (PROJECT-ROADMAP.md:132).
   - Automate weekly leadership PDF/CSV export and monthly archive (PROJECT-ROADMAP.md:134).
   - Configure GA4 attribution sync via nightly n8n job (PROJECT-ROADMAP.md:145).
8. **Training & QA**
   - Execute end-to-end tests for each inbound channel and automation.
   - Capture admin runbook covering backups, upgrades, and hotfix deployment.
   - Prepare concierge training deck + recordings aligned with staff curriculum (memory/tasks.md:5).

## 3. Dependencies & Inputs
- **From Marketing:** Final bilingual templates, pipeline terminology approvals, consent text, UTM taxonomy.
- **From Ops:** Backup schedule confirmation, data retention policy sign-off, user roster with roles, escalation matrix.
- **From Engineering:** n8n flow diagrams, Chatwoot webhook payloads, website form payload specs, API key issuance.
- **From Leadership:** Reporting cadence requirements, SLA targets (response time, follow-up windows), scope for future integrations (e.g., 3CX call ingestion) (PROJECT-ROADMAP.md:395; docs/presentation.html#L395).

## 4. Proposed Sequence
1. Lock data model, dropdowns, and pipelines (Workstreams 1-2).
2. Draft automations and multilingual templates (Workstreams 3 & 5).
3. Connect inbound channels and validate payloads (Workstream 4).
4. Enable dashboards, exports, and GA4 sync (Workstream 7).
5. Harden security/governance, then run QA and staff training (Workstreams 6 & 8).

## 5. Next Actions
- Confirm which prerequisites are already satisfied on the live instance (API key, volume backups, cron health).
- Schedule working session with marketing + concierge to finalise field definitions and template copy.
- Collect engineering specs for n8n and Chatwoot payloads to unlock automation implementation.
