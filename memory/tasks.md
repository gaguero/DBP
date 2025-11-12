# Task Ledger

Use this as the single source of truth for outstanding work. Keep entries lightweight—details should live in code comments, issues, or supporting docs when needed.

| ID | Title | Status | Owner | Notes |
|----|-------|--------|-------|-------|
| S0-001 | Discovery tracker: booking widget technical docs | in-progress | codex | Need embed specs + event hooks for analytics/CRM (ref PROJECT-ROADMAP.md §6) |
| S0-002 | Discovery tracker: consent/cookie solution decision | pending | ops | Shortlist tools (Cookiebot, Klaro) and confirm GA4 + Chatwoot compatibility |
| S0-003 | Discovery tracker: multilingual ops across site/Chatwoot/Espo | pending | product | Document translation workflow, canned responses, CRM templates |
| S0-004 | Discovery tracker: Railway EspoCRM service confirmation | in-progress | ops | Verify prod instance, API key, backup cadence, volume mount |
| S0-005 | Discovery tracker: staff training outline | pending | product | Draft curriculum covering EspoCRM, Chatwoot, analytics dashboards |
| S0-006 | Discovery tracker: service-level expectations | pending | leadership | Define support hours, update cadence, monitoring and escalation policy |
| S1-001 | Build bilingual content matrix + asset inventory | pending | content | Use SITEMAP.md + presentation deck requirements; include alt text/legal copy |
| S1-002 | Finalize brand asset package (logo, typography licenses, photo rights) | pending | design | Centralize in docs/assets with usage notes per STYLEGUIDE.md |
| S1-003 | Approve copy tone + voice samples for Notebook LM brief | pending | marketing | Needed before research sprint (presentation slide 10) |
| S2-001 | Define booking flow architecture + IA diagrams | blocked | product | Depends on S0-001 decision; informs Plan Your Journey and forms |
| S2-002 | Map analytics + event taxonomy (CTA, funnel, personalization) | pending | analytics | Align with GTM/GA4 helper; document in PROJECT-ROADMAP §5 |
| S2-003 | Draft low-fidelity wireframes for sitemap pillars | pending | ux | Incorporate value pillars and CTA strategy from presentation deck |
| S3-001 | High-fidelity visual system + component library | pending | design | Apply STYLEGUIDE.md; deliver UI kit and responsive mocks |
| S4-001 | Confirm monorepo plumbing + CI/CD for Railway | pending | eng | Validate apps/ infra structure, secrets strategy, backup plan |
| S4-002 | Define automation topology (n8n flows, webhooks) | pending | eng | Based on integration topology in roadmap; document triggers and payloads |
| S5-001 | Implement Next.js pages per sitemap (EN + ES) | pending | eng | Wait until content matrix + IA locked |
| S5-002 | Wire EspoCRM lead pipeline + Chatwoot widget | pending | eng | Reuse env vars; ensure localization + consent compliance |
| S5-003 | Configure 3CX PBX + integrate click-to-call | pending | ops | Uses requirements from presentation slide 7 |
| S5-004 | QA + launch runbook | pending | eng | Includes WCAG sweep, performance budget, analytics validation |
| WF-001 | Custom Workflow System - Implementation Planning | blocked | eng | Reemplazado por aplicación externa; ver tareas WX-001+ |
| WF-002 | Custom Workflow System - Entity Definitions | blocked | eng | Reemplazado por aplicación externa; ver tareas WX-002+ |
| WF-003 | Custom Workflow System - WorkflowEngine Core | blocked | eng | Reemplazado por aplicación externa; ver tareas WX-002/WX-004 |
| WF-004 | Custom Workflow System - Hooks Integration | blocked | eng | Enfoque actualizado: webhooks/REST externos (ver plan maestro) |
| WF-005 | Custom Workflow System - Job Scheduling | blocked | eng | Manejado vía BullMQ + Redis en nueva app |
| WF-006 | Custom Workflow System - React Flow Frontend | blocked | eng | React Flow vivirá en `apps/workflows/ui` (tarea WX-005) |
| WF-007 | Custom Workflow System - Frontend Integration | blocked | eng | Comunicación será via API/Webhooks (no iframe en Espo) |
| WF-008 | Custom Workflow System - Action Implementations | blocked | eng | Implementación se moverá a Workers BullMQ (WX-002/WX-003) |
| WF-009 | Custom Workflow System - Testing & Refinement | blocked | eng | Migrado a pruebas de app externa (`TESTING.md`, WX-004/WX-005) |
| WX-001 | Workflows App - Ejecución manual (endpoint + servicio) | in-progress | eng | POST `/workflows/:id/execute`, crea execution + job BullMQ |
| WX-002 | Workflows App - Worker ejecución nodos básicos | pending | eng | Procesar nodos trigger/action/condition, actualizar estado/logs |
| WX-003 | Workflows App - Cliente EspoCRM centralizado | pending | eng | Consolidar operaciones CRUD/email con cifrado y reintentos |
| WX-004 | Workflows App - Logging & monitoreo | pending | eng | Persistir `workflow_executions`/`workflow_logs`, exponer endpoints |
| WX-005 | Workflows App - Editor visual React Flow | pending | eng | Implementar UI en `apps/workflows/ui` con React Flow (Fase 2) |

## Guidelines
- Append new rows instead of rewriting history; mark `Status` as `pending`, `in-progress`, `blocked`, or `done`.
- Reference related files or commits in the Notes column for traceability.
- When a task is done, move any long-form learnings into `progress.md` and keep only a short completion note here.
- Reset numbering per major milestone if the list grows unwieldy (e.g., `M2-001`).
