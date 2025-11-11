# Workflows Application - Aplicación Externa de Workflows para EspoCRM

Aplicación independiente para gestión avanzada de workflows que se integra con EspoCRM mediante REST API y Webhooks.

## Estructura del Proyecto

```
workflows/
├── api/          # Backend API (NestJS/Express + TypeScript)
├── workers/      # Workers BullMQ para ejecución de workflows
├── ui/           # Frontend React + React Flow
└── shared/       # Tipos TypeScript compartidos
```

## Requisitos

- Node.js >= 18
- PostgreSQL >= 14
- Redis >= 6
- pnpm >= 8

## Setup Local

1. Instalar dependencias:
```bash
pnpm install
```

2. Configurar variables de entorno (ver `.env.example` en cada subproyecto)

3. Iniciar servicios:
```bash
# Terminal 1: API
cd api && pnpm dev

# Terminal 2: Workers
cd workers && pnpm dev

# Terminal 3: UI
cd ui && pnpm dev
```

## Despliegue en Railway

Cada servicio se despliega independientemente en Railway:

- **API**: `apps/workflows/api` (puerto 3000)
- **Workers**: `apps/workflows/workers` (proceso continuo)
- **UI**: `apps/workflows/ui` (build estático)

Ver documentación detallada en cada subdirectorio.

## Documentación Completa

Ver `../../docs/workflows-external-app-plan.md` para el plan maestro completo.

