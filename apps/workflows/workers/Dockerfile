FROM node:18-alpine AS builder

ARG NODE_AUTH_TOKEN

WORKDIR /repo

# Copiamos el workspace para resolver dependencias locales
COPY pnpm-workspace.yaml ./
COPY package.json pnpm-lock.yaml* ./
COPY apps/workflows/shared ./apps/workflows/shared
COPY apps/workflows/workers ./apps/workflows/workers

# Instalamos pnpm
RUN npm install -g pnpm@8.15.5

# Configuramos acceso opcional a GitHub Packages
RUN npm config set @dbp:registry https://npm.pkg.github.com
RUN if [ -n "$NODE_AUTH_TOKEN" ]; then npm config set //npm.pkg.github.com/:_authToken "$NODE_AUTH_TOKEN"; fi

# Instalamos dependencias del workspace
RUN pnpm install --filter @dbp/workflows-shared --filter @dbp/workflows-workers

# Construimos los workers
RUN pnpm --filter @dbp/workflows-workers build

# Preparamos artefacto productivo
RUN pnpm --filter @dbp/workflows-workers deploy /app

# Imagen final
FROM node:18-alpine

WORKDIR /app

COPY --from=builder /app/ ./

CMD ["node", "dist/index.js"]

