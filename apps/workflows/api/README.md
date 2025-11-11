# Workflows API

Backend API para gestión de workflows integrado con EspoCRM.

## Setup

1. Instalar dependencias:
```bash
pnpm install
```

2. Copiar `.env.example` a `.env` y configurar variables

3. Ejecutar migraciones (cuando estén listas):
```bash
pnpm migrate
```

4. Iniciar desarrollo:
```bash
pnpm dev
```

## Endpoints Principales

- `GET /health` - Health check
- `POST /api/v1/auth/login` - Autenticación
- `GET /api/v1/integrations` - Listar integraciones EspoCRM
- `POST /api/v1/integrations/test` - Probar conexión
- `GET /api/v1/workflows` - Listar workflows
- `POST /api/v1/workflows` - Crear workflow
- `POST /api/v1/workflows/:id/publish` - Publicar workflow
- `POST /api/v1/webhooks/espo` - Receiver de webhooks

## Estructura de Carpetas (Fase 1)

```
src/
├── index.ts              # Entry point
├── routes/              # Route handlers
├── controllers/         # Business logic
├── services/            # Services (EspoCRM client, encryption, etc.)
├── models/              # Database models
├── middleware/          # Auth, validation, etc.
└── utils/               # Helpers
```

