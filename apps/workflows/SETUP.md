# Setup Inicial - Workflows Application

## Paso 1: Instalar Dependencias

Desde la raíz del monorepo:

```bash
pnpm install
```

## Paso 2: Configurar Variables de Entorno

### API (`apps/workflows/api/.env`)

```bash
PORT=3000
DATABASE_URL=postgresql://user:password@localhost:5432/workflows_db
REDIS_URL=redis://localhost:6379
JWT_SECRET=your-super-secret-jwt-key-change-in-production
ENCRYPTION_KEY=your-32-character-encryption-key!!
WEBHOOK_SECRET=your-webhook-secret-for-espo-validation
CORS_ORIGIN=http://localhost:5173
```

### Workers (`apps/workflows/workers/.env`)

```bash
REDIS_URL=redis://localhost:6379
DATABASE_URL=postgresql://user:password@localhost:5432/workflows_db
```

### UI (`apps/workflows/ui/.env`)

```bash
VITE_API_URL=http://localhost:3000
```

## Paso 3: Iniciar Servicios Localmente

**Terminal 1 - API:**
```bash
cd apps/workflows/api
pnpm dev
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
```

## Paso 4: Verificar

- API: http://localhost:3000/health
- UI: http://localhost:5173

## Próximos Pasos

1. Crear esquema de base de datos (migraciones)
2. Implementar autenticación
3. Implementar CRUD de workflows
4. Integrar con EspoCRM API
5. Implementar editor React Flow

Ver `../../docs/workflows-external-app-plan.md` para el plan completo.

