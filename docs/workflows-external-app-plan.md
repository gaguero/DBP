# Plan Maestro: Aplicación Externa de Workflows para EspoCRM

## 1. Objetivo y Alcance
- Desarrollar un servicio independiente que gestione workflows avanzados para EspoCRM sin depender de extensiones internas.
- Ofrecer editor visual, motor de ejecución, monitoreo y registro de acciones.
- Mantener compatibilidad con cualquier instancia de EspoCRM vía REST API y webhooks.

## 2. Arquitectura General
- **Frontend**: React 18 + React Flow + Tailwind/Chakra para el editor y paneles.
- **Backend API**: Node.js (NestJS o Express con TypeScript) que expone endpoints REST.
- **Workers**: BullMQ sobre Redis para ejecutar acciones y programaciones.
- **Base de datos**: PostgreSQL para workflows, ejecuciones, logs y credenciales.
- **Integraciones**: REST API de EspoCRM, Webhooks entrantes, limitador de llamadas.
- **Infraestructura**: Railway (servicios API, workers y frontend) + addons PostgreSQL y Redis.

## 3. Modelo de Datos (PostgreSQL)
- `users`: credenciales y roles (admin/editor/viewer).
- `integration_accounts`: URL y credenciales cifradas de cada EspoCRM.
- `workflows`: definición actual (JSON), estado y metadatos.
- `workflow_versions`: historial de versiones publicadas.
- `workflow_executions`: estado de cada ejecución, nodo actual, errores.
- `workflow_logs`: trazas por nodo ejecutado.
- `workflow_schedules`: cron expresiones y próxima ejecución.
- `webhook_events`: cola de eventos recibidos por Webhook.

## 4. Endpoints Principales (Backend)
- Autenticación (`/auth/login`, `/auth/register`, `/auth/refresh`).
- Integraciones (`/integrations`, `/integrations/test`).
- Workflows (`/workflows`, `/workflows/:id`, `/workflows/:id/publish`, `/workflows/:id/run-test`).
- Ejecuciones (`/executions`, `/executions/:id`, `/executions/:id/retry`, `/executions/:id/cancel`).
- Webhooks (`/webhooks/espo` con firma HMAC y reintentos).
- Utilidades (`/metadata/entities`, `/metadata/fields`, `/actions/preview`).

## 5. Motor y Colas
- Colas BullMQ: `workflow:execute`, `workflow:schedule`, `workflow:webhooks`, `workflow:delayed`.
- Reintentos con backoff exponencial y registro de errores.
- Soporte para nodos de acción (emails, actualizar/crear registros, listas), condición, delay, branch.
- Programador que respeta cron expressions y timezone.

## 6. Integración con EspoCRM
- Usuario técnico dedicado y API Key almacenada de forma cifrada.
- Uso de endpoints REST (`/api/v1/{Entity}`, `/api/v1/Email`, `/api/v1/Notification`, `/api/v1/TargetListMember`).
- Webhooks configurados en EspoCRM para eventos Created/Updated/Deleted.
- Rate limiting (por ejemplo 5 peticiones/segundo) y cache de metadata.

## 7. Frontend (SPA)
- Dashboard con lista de workflows y estado.
- Editor visual con React Flow (nodos trigger, acción, condición, delay, split, código).
- Panel de propiedades con validaciones en vivo y vista previa.
- Historial de ejecuciones y logs con filtros.
- Uso de React Query para datos y Zustand/Redux para estado del editor.

## 8. DevOps y Entornos
- Repositorio monorepo: `apps/workflow-api`, `apps/workflow-workers`, `apps/workflow-ui`, `packages/shared`.
- Railway: servicios API, workers, frontend; addons PostgreSQL y Redis.
- Variables recomendadas: `DATABASE_URL`, `REDIS_URL`, `JWT_SECRET`, `ENCRYPTION_KEY`, `WEBHOOK_SECRET`.
- CI/CD con GitHub Actions (lint, tests, build, deploy).
- Docker Compose para desarrollo local.

## 9. Seguridad
- Cifrado AES-256 para credenciales de EspoCRM.
- JWT con expiración corta y refresh tokens.
- Roles con principio de mínimo privilegio.
- Validación de firmas de Webhooks y protección anti replay.
- Logs sin PII y backups automáticos de PostgreSQL.
- Auditoría básica (tabla `audit_events`).

## 10. Roadmap de Implementación
1. **Fase 0**: Configuración de repos, entornos Railway, wireframes, user stories.
2. **Fase 1 (MVP)**: Auth, integraciones, CRUD de workflows, ejecución manual.
3. **Fase 2**: Editor React Flow, motor completo, Webhooks integrados.
4. **Fase 3**: Acciones avanzadas, analíticas, paneles de monitoreo.
5. **Fase 4**: Seguridad, roles, documentación, QA y pruebas E2E.
6. **Fase 5**: Despliegue, capacitación interna, plan de soporte.

## 11. Próximos Pasos
- Crear wireframes detallados del editor y dashboard.
- Redactar user stories y criterios de aceptación por módulo.
- Preparar scripts de despliegue inicial (Railway + Docker Compose).
- Agendar sesión de revisión con el equipo para validar Alcance y Roadmap.
