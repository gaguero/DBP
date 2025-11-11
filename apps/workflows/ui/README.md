# Workflows UI

Frontend React + React Flow para editor visual de workflows.

## Setup

1. Instalar dependencias:
```bash
pnpm install
```

2. Configurar variables de entorno:
```bash
VITE_API_URL=http://localhost:3000
```

3. Iniciar desarrollo:
```bash
pnpm dev
```

## Estructura (Fase 1)

```
src/
├── main.tsx           # Entry point
├── App.tsx            # Root component
├── pages/             # Páginas (Dashboard, Editor, Executions)
├── components/        # Componentes reutilizables
├── stores/            # Zustand stores
├── hooks/             # Custom hooks
└── api/               # Cliente API
```

