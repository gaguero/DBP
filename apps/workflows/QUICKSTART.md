# Guía Rápida de Inicio - Workflows Application

## Para Desarrollo Local

### 1. Instalar Dependencias
```bash
# Desde la raíz del monorepo
pnpm install
```

### 2. Configurar Base de Datos Local

**Opción A: Docker Compose (Recomendado)**
```bash
cd apps/workflows
docker-compose up -d postgres redis
```

**Opción B: Servicios Locales**
- PostgreSQL en puerto 5432
- Redis en puerto 6379

### 3. Ejecutar Migraciones
```bash
cd apps/workflows/api
# Copiar .env.example a .env y configurar DATABASE_URL
psql $DATABASE_URL -f migrations/001_initial_schema.sql
```

### 4. Iniciar Servicios

**Terminal 1 - API:**
```bash
cd apps/workflows/api
pnpm dev
# Debería iniciar en http://localhost:3000
```

**Terminal 2 - Workers:**
```bash
cd apps/workflows/workers
pnpm dev
```

**Terminal 3 - UI:**
```bash
cd apps/workflows/ui
pnpm dev
# Debería iniciar en http://localhost:5173
```

### 5. Verificar

- API Health: http://localhost:3000/health
- API Info: http://localhost:3000/api/v1
- UI: http://localhost:5173

## Para Railway

### 1. Crear Servicios

1. **PostgreSQL Addon:**
   - Crear nuevo PostgreSQL addon
   - Copiar `DATABASE_URL` de las variables

2. **Redis Addon:**
   - Crear nuevo Redis addon
   - Copiar `REDIS_URL` de las variables

3. **API Service:**
   - Nuevo servicio desde GitHub
   - Root directory: `apps/workflows/api`
   - Build command: `pnpm install && pnpm build`
   - Start command: `node dist/index.js`
   - Puerto: 3000

4. **Workers Service:**
   - Nuevo servicio desde GitHub
   - Root directory: `apps/workflows/workers`
   - Build command: `pnpm install && pnpm build`
   - Start command: `node dist/index.js`

5. **UI Service:**
   - Nuevo servicio desde GitHub
   - Root directory: `apps/workflows/ui`
   - Build command: `pnpm install && pnpm build`
   - Start command: `pnpm preview` (o servir con nginx)

### 2. Variables de Entorno

**Variable Group (compartido):**
```
DATABASE_URL=<postgres-url>
REDIS_URL=<redis-url>
JWT_SECRET=<generar-secreto-seguro>
ENCRYPTION_KEY=<32-caracteres-exactos>
WEBHOOK_SECRET=<generar-secreto>
```

**API específicas:**
```
PORT=3000
CORS_ORIGIN=https://workflows-ui.railway.app
```

**UI específicas:**
```
VITE_API_URL=https://workflows-api.railway.app
```

### 3. Ejecutar Migraciones en Railway

Conectar a PostgreSQL y ejecutar:
```bash
railway run psql $DATABASE_URL -f apps/workflows/api/migrations/001_initial_schema.sql
```

O desde Railway CLI:
```bash
railway connect postgres
# Luego ejecutar el SQL manualmente
```

## Próximos Pasos

1. ✅ Estructura creada
2. ⏳ Instalar dependencias (`pnpm install`)
3. ⏳ Ejecutar migraciones
4. ⏳ Implementar autenticación (Fase 1)
5. ⏳ Implementar CRUD de workflows (Fase 1)
6. ⏳ Integrar con EspoCRM API (Fase 1)

Ver `STATUS.md` para el estado actual y `../../docs/workflows-external-app-plan.md` para el plan completo.

