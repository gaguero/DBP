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
- **Automation externa:** Nueva aplicación de workflows descrita en `docs/workflows-external-app-plan.md`, que reemplaza la extensión interna y se integra vía API/Webhooks.
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
│  ├─ workflows/      # Nueva app externa de workflows (API, workers, UI)
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
- **Goals:** Finalise monorepo architecture, Railway service plan (incluyendo la nueva app de workflows), y CI/CD pipeline (Railway + GitHub Actions).
- **Inputs needed:** DevOps constraints, budget for hosting, integration endpoints (booking widget embed, CRM, chat, workflows API).
- **Outputs:** Architecture diagram, environment plan (dev/stage/prod on Railway), infrastructure-as-code manifests, dependency list.

### Stage 5 - Implementation & Integrations
- **Goals:** Build templates, components, CMS collections, y conectar EspoCRM + Chatwoot + GA4 + aplicación externa de workflows.
- **Inputs needed:** Approved designs, structured content, integration credentials, workflow definitions.
- **Outputs:** Functional site, synchronized lead flows, multilingual chat widget, analytics dashboards, n8n automation flows, production EspoCRM service on Railway (PostgreSQL + cron automation), workflows API desplegado.

### Stage 6 – QA, Performance & Compliance
- **Goals:** Validate functionality, responsive behavior, accessibility, SEO, performance benchmarks.
- **Inputs needed:** Test plans, device/browser matrix, Lighthouse thresholds, privacy/legal review.
- **Outputs:** QA reports, bug backlog, compliance sign-off.

### Stage 7 – Launch & Post-Launch Optimisation
- **Goals:** Deploy to production Railway environments, monitor analytics, enable continuous improvement loop, y entregar plan de capacitación de personal.
- **Inputs needed:** Launch checklist, rollback strategy, communication plan; training curriculum drafted during QA for delivery post-launch.
- **Outputs:** Release notes, scheduled staff training sessions, backlog of enhancements (incl. evoluciones en workflows externos).

## 4. Railway Deployment & Environment Strategy
- **Services:**
  - `web-app` (apps/web) – Node.js build, static export or SSR.
  - `espocrm` (apps/espocrm) – Docker service with MariaDB add-on or managed Railway database.
  - `chatwoot` (apps/chatwoot) – Docker deployment with Redis + Postgres Railway addons.
  - `automations` (apps/automations) – n8n container with secure webhook URLs.
  - `workflows` (apps/workflows) – API + workers + SPA según plan maestro.
  - `monitoring` – Optional health check service or status page.
- **Environments:** Use Railway environments (`development`, `staging`, `production`) via web UI. Link GitHub repo and configure service-specific deploy paths.
- **CI/CD:** GitHub Actions pipeline to lint/test; Railway web integration triggers deploys on branch merges, with optional `railway up` CLI for manual promotion.
- **Secrets Management:** Use Railway variable groups for shared secrets (API keys, SMTP, EspoCRM workflow tokens). Rotate credentials quarterly and mirror in local `.env.example` for onboarding.
- **Logging & Monitoring:** Enable Railway logs + integrar con open-source ELK stack o Grafana Cloud si es necesario. Configurar checks de uptime para cada servicio.
- **Backups:** Programar snapshots de base de datos automáticos (EspoCRM/Postgres) y exportar flujos n8n y definiciones de workflows externos.

## 5. Analytics, Chat, and CRM Implementation Details
### Google Analytics 4 + Tag Manager Best Practices
- Implement GA4 via Google Tag Manager para separar la lógica de medición de las liberaciones de código.
- Configurar el modo de consentimiento para respetar las regulaciones de privacidad de la UE/LatAm; integrar con la bandeja de cookies.
- Track key events: page views, clicks de CTA de hero, interacciones con widget de reserva, envíos de formularios, interacciones de chat, descargas de itinerarios.
- Usar parámetros UTM para el seguimiento de campañas (ads, referencias de socios) y configurar objetivos de conversión alineados con las etapas de CRM.
- Habilitar la medición cruzada de dominios si el widget de reserva incrustado carga de un dominio diferente.

### Chatwoot Deployment Notes
- Autohospedar vía Docker en Railway; seguro con HTTPS (Railway proporciona certificados automáticos) y aplicar SSO si es posible.
- Configurar buzones: chat en vivo del sitio web, WhatsApp (si está licenciado), reenvío de correo electrónico. Establecer horas de trabajo y reglas de escalamiento a personal de turno.
- Crear playbooks: mensaje de bienvenida automatizado, pop-ups proactivos en páginas clave (Habitaciones, Planifica tu viaje), y correo electrónico de seguimiento cuando el chat se pierde.
- Conectar webhooks de Chatwoot a EspoCRM o n8n para registrar conversaciones como leads/actividades.

### EspoCRM Lead Management Blueprint
1. **Canales de Captura de Leads**
   - Formularios web (solicitud de reserva, contacto, voluntariado) envían a EspoCRM vía API REST o webhook de n8n.
   - Webhook de Chatwoot crea o actualiza contactos/leads coincidentes.
   - Importaciones manuales de solicitudes de caminata o OTA usando plantillas CSV con reglas de validación.

2. **Higiene de Datos**
   - Estandarizar campos requeridos: nombre, email/teléfono, idioma preferido, fechas de viaje, tamaño de grupo, intereses (habitaciones, comida, actividades, voluntariado).
   - Aplicar reglas de deduplicación (email/teléfono) y usar fusión automática para evitar duplicados.
   - Etiquetar leads por fuente (CTA Hero del Sitio Web, Chatwoot, Socio de Referencia) para el seguimiento.

3. **Estructura de Pipeline**
   - Etapas sugeridas: `Nueva Solicitud → Calificado → Propuesta Enviada → Reserva Tentativa → Convertido → Perdido/Inactivo`.
   - Para solicitudes de voluntariado/comunidad, mantener un pipeline paralelo o un campo de estado adicional.
   - Usar vista Kanban para visualizar el trabajo de concierge y asignar propietarios.

4. **Automatizaciones & Flujos de Trabajo**
   - Asignar leads automáticamente según el idioma o el interés (habitaciones vs experiencias) a coordinadores relevantes.
   - Activar confirmaciones de correo electrónico/SMS (via BPM de EspoCRM + SMTP) confirmando la recepción y detallando los siguientes pasos.
   - Programar recordatorios de tareas de seguimiento (24h, 72h) y escalar a gerentes si no hay respuesta.
   - Sincronizar con Google Calendar/ICS para rastrear visitas de sitio o llamadas.
   - Para flujos de trabajo complejos, usar la nueva aplicación externa (ver plan maestro).

5. **Análisis & Reportes**
   - Crear paneles personalizados: consultas por fuente, tasa de conversión por tipo de habitación, tiempo de respuesta, análisis de razón de pérdida.
   - Alimentar eventos GA4 en CRM vía parámetros UTM para rastrear campañas digitales a ingresos.
   - Exportar resumen semanal a la dirección; archivar instantáneas mensuales para pronósticos.

6. **Gobernanza de Datos**
   - Definir política de retención (ej. purgar leads inactivos después de 24 meses) y anonimizar datos a petición.
   - Restringir roles de usuario (concierge, marketing, admin) con el principio de privilegio mínimo.
   - Registrar el estado del consentimiento (marketing, WhatsApp) directamente en los registros de contacto; honrar opt-outs en todos los canales.

### Topología de Integración
- **Sitio Web → EspoCRM:** Endpoints REST API usando usuario de servicio seguro + límites de tasa; enviar payloads JSON desde funciones serverless o backend.
- **Sitio Web → Chatwoot:** Incrustar widget de chat con parámetros de inicialización (idioma, contexto de invitado). Pasar ID de contacto de CRM cuando se conoce.
- **EspoCRM ↔ Chatwoot:** Usar webhooks de Chatwoot para crear/actualizar leads; opcionalmente enviar resúmenes de conversaciones de vuelta a CRM a través de scripts de automatización.
- **EspoCRM ↔ Workflows externos:** Webhooks desde EspoCRM hacia la nueva API, y llamadas REST desde el motor para crear/actualizar registros.
- **Analytics ↔ CRM:** Sincronización n8n nocturna para empujar datos de campaña de GA4 en EspoCRM para paneles de atribución.
- **Backups:** Instantáneas de base de datos nocturnas para EspoCRM (PostgreSQL) y Chatwoot (Postgres), más almacenamiento de exportación de n8n, workflows externos y copias de seguridad de CMS.

## 6. Lista de Verificación de Información Pendiente
- ✅ Servicio CRM de Railway provisionado (EspoCRM 9.2.2 en Railway con PostgreSQL, volumen persistente, automatización de cron).
- ✅ Plan externo de workflows disponible en `docs/workflows-external-app-plan.md`.
- Documentación técnica del widget de reserva (snippet de incrustación, opciones de personalización, hooks de eventos para etiquetas GA4/CRM).
- Solución de consentimiento compatible con GA4 y Chatwoot (ej. Cookiebot, open-source Klaro!).
- Plan de soporte multilingüe en el sitio web, respuestas de Chatwoot personalizadas y plantillas de EspoCRM.
- Currículo de capacitación de personal a entregar después del lanzamiento, cubriendo pipelines de EspoCRM, consola de Chatwoot, paneles de análisis y uso básico de la nueva aplicación de workflows.
- Expectativas de nivel de servicio para el paquete integrado (horas de soporte, cadencia de actualización, monitoreo).

Use este roadmap para alinear a los stakeholders y entregar la suite digital de Dolphin Blue Paradise como un paquete integrado, hospedado en Railway, y de código abierto.
