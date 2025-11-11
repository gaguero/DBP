# Railway Configuration

Este proyecto se despliega en Railway con múltiples servicios.

## Servicios Necesarios

1. **PostgreSQL** - Base de datos (addon)
2. **Redis** - Cola de trabajos (addon)
3. **API** - Backend (apps/workflows/api)
4. **Workers** - Procesadores (apps/workflows/workers)
5. **UI** - Frontend (apps/workflows/ui)

## Configuración en Railway

### Para cada servicio:

1. Crear nuevo servicio en Railway
2. Conectar repositorio GitHub
3. Configurar root directory:
   - API: `apps/workflows/api`
   - Workers: `apps/workflows/workers`
   - UI: `apps/workflows/ui`

### Variables de Entorno Compartidas

Crear variable group en Railway con:

```
DATABASE_URL=<postgres-url>
REDIS_URL=<redis-url>
JWT_SECRET=<secret>
ENCRYPTION_KEY=<32-char-key>
WEBHOOK_SECRET=<secret>
```

### Variables Específicas por Servicio

**API:**
```
PORT=3000
CORS_ORIGIN=https://workflows-ui.railway.app
```

**Workers:**
```
WORKER_CONCURRENCY_EXECUTE=5
WORKER_CONCURRENCY_SCHEDULE=2
```

**UI:**
```
VITE_API_URL=https://workflows-api.railway.app
```

## Build Commands

Railway detectará automáticamente los Dockerfiles o puedes configurar:

**API/Workers:**
```
pnpm install && pnpm build
```

**UI:**
```
pnpm install && pnpm build
```

## Health Checks

- API: `GET /health`
- Workers: Logs continuos
- UI: Servir archivos estáticos

