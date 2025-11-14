## Dolphin Blue Paradise – Web App

Next.js 15 (App Router) project that powers the public website and internal admin tools for Dolphin Blue Paradise.  
Package manager: **pnpm** (workspace root).

---

## Requisitos

- Node.js 20+
- pnpm 9+
- PostgreSQL (Railway en producción)

Variables obligatorias (ver `.env.example` en la raíz del repositorio):

```bash
DATABASE_URL=postgresql://...
NEXTAUTH_URL=https://admin.dolphinblueparadise.com
NEXTAUTH_SECRET=...
ADMIN_EMAIL=...
ADMIN_PASSWORD=...
ESPOCRM_URL=https://crm.dolphinblueparadise.com/api/v1
ESPOCRM_API_KEY=...
```

### Comentarios de Stakeholders (Dev Feedback)

Nueva funcionalidad para captar feedback visual sobre el sitio:

| Variable | Descripción |
|----------|-------------|
| `COMMENTS_FEATURE_ENABLED` | `true` para mostrar la interfaz de comentarios (ocúltala en producción final). |
| `COMMENTS_NOTIFY_TO` | Lista separada por comas de correos que recibirán notificaciones. |
| `SMTP_HOST` / `SMTP_PORT` / `SMTP_SECURITY` / `SMTP_USER` / `SMTP_PASSWORD` | Credenciales SMTP para enviar alertas. |

Endpoints generados:
- `GET /api/comments/[pageId]`
- `POST /api/comments/[pageId]`
- `PATCH /api/comments/[pageId]/[commentId]`

Cada comentario guarda nombre, apellido, estado (`pending`, `in_progress`, `resolved`, `rejected`), enlace opcional y mantiene historial de ediciones junto con notas obligatorias cada vez que cambia el estado.

> El backend ejecuta automáticamente `ensureCommentTables` al inicializar APIs de comentarios. Este bootstrap crea las tablas, índices y la columna `statusNote` si aún no existen (útil en Railway cuando las migraciones no se han corrido).

**Modo de uso en el UI**

1. Activa el feature flag (`COMMENTS_FEATURE_ENABLED=true`).
2. En la parte inferior derecha verás el botón “Modo comentarios”.
3. Al activar el modo, cada sección envolta con `FeedbackSection` muestra “Add comment”.
4. Al guardar o editar un comentario se envía un correo a los destinatarios configurados.
5. `/comments_dashboard` incluye un dashboard global con filtros, vista dividida y control de estados (con notas).
6. Desde el dashboard puedes eliminar un comentario ingresando la contraseña `deletedbp` (solo para administradores).

---

## Scripts principales

```bash
# Desarrollo
pnpm dev

# Build de producción
pnpm build && pnpm start

# Linter
pnpm lint

# Prisma
pnpm db:generate
pnpm db:migrate
pnpm db:push
```

Para una migración nueva:

```bash
cd apps/web
pnpm prisma migrate dev --name your_migration_name
```

> Nota: en Railway utiliza `pnpm prisma migrate deploy`.

---

## Estructura relevante

- `apps/web/src/components/feedback/*` – componentes del sistema de comentarios.
- `apps/web/src/app/*` – páginas públicas (App Router).
- `apps/web/src/app/api/comments/*` – API para comentarios.
- `apps/web/prisma/schema.prisma` – modelos `PageComment` y `PageCommentRevision`.

---

## Checklist antes de desplegar

1. Ejecutar `pnpm lint` y `pnpm build`.
2. Confirmar que la migración de Prisma esté aplicada en Railway.
3. Verificar variables (`COMMENTS_FEATURE_ENABLED`, SMTP) en Railway.
4. Revisar `/notes` para ver el dashboard global de feedback.

---

## Soporte

- CRM / Integraciones: ver `apps/workflows`, `apps/espocrm`.
- Docs de contexto adicional en `docs/` y `memory/`.
