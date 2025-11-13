# @dbp/workflows-shared

Paquete con tipos, utilidades y clientes compartidos entre los servicios `api`, `workers` y `ui` del sistema de workflows de Dolphin Blue Paradise.

## Contenido principal

- Tipos de workflows y ejecuciones (`types.ts`, `executions.ts`).
- Utilidades de cifrado simétrico (`encryption.ts`).
- Cliente HTTP para EspoCRM (`espo-client.ts`).
- Helpers para colas BullMQ (`queue.ts`).

## Scripts

- `pnpm build`: compila TypeScript y genera artefactos en `dist/` con declaraciones (`.d.ts`) y mapas de origen.

## Publicación

El paquete está configurado para publicarse en GitHub Packages (`https://npm.pkg.github.com`). Durante la publicación:

1. Ejecutar `pnpm install` en la raíz del monorepo para asegurar dependencias.
2. Compilar el paquete: `pnpm --filter @dbp/workflows-shared build`.
3. Publicar con `pnpm publish --filter @dbp/workflows-shared --access public`, definiendo `NODE_AUTH_TOKEN` con un token válido de GitHub.

Consulta `apps/workflows/TESTING.md` y `apps/workflows/STATUS.md` para pasos adicionales y notas de integración.

# Shared Types

Tipos TypeScript compartidos entre API, Workers y UI.

## Uso

```typescript
import { Workflow, WorkflowDefinition } from '@dbp/workflows-shared';
```

## Build

```bash
pnpm build
```

