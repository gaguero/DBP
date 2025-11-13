FROM node:18-alpine AS builder

ARG NODE_AUTH_TOKEN

WORKDIR /repo

# Copiamos archivos del workspace necesarios para las dependencias locales
COPY pnpm-workspace.yaml ./
COPY package.json pnpm-lock.yaml* ./
COPY apps/workflows/shared ./apps/workflows/shared
COPY apps/workflows/api ./apps/workflows/api

# Instalamos pnpm
RUN npm install -g pnpm@8.15.5

# Configuramos acceso opcional a GitHub Packages (por si el paquete se publica)
RUN npm config set @dbp:registry https://npm.pkg.github.com
RUN if [ -n "$NODE_AUTH_TOKEN" ]; then npm config set //npm.pkg.github.com/:_authToken "$NODE_AUTH_TOKEN"; fi

# Instalamos dependencias usando el workspace completo
RUN pnpm install --filter @dbp/workflows-shared --filter @dbp/workflows-api

# Construimos el paquete API
RUN pnpm --filter @dbp/workflows-api build

# Preparamos artefacto final con dependencias de producción
RUN pnpm --filter @dbp/workflows-api deploy /app

# Imagen final
FROM node:18-alpine

WORKDIR /app

COPY --from=builder /app/ ./

EXPOSE 3000

CMD ["node", "dist/index.js"]

