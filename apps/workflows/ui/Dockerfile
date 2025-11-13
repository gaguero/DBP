FROM node:18-alpine AS builder

ARG NODE_AUTH_TOKEN

WORKDIR /repo

# Copiamos el workspace para resolver dependencias locales
COPY pnpm-workspace.yaml ./
COPY package.json pnpm-lock.yaml* ./
COPY apps/workflows/shared ./apps/workflows/shared
COPY apps/workflows/ui ./apps/workflows/ui

# Instalamos pnpm
RUN npm install -g pnpm@8.15.5

# Configuramos acceso opcional a GitHub Packages
RUN npm config set @dbp:registry https://npm.pkg.github.com
RUN if [ -n "$NODE_AUTH_TOKEN" ]; then npm config set //npm.pkg.github.com/:_authToken "$NODE_AUTH_TOKEN"; fi

# Instalamos dependencias del workspace
RUN pnpm install --filter @dbp/workflows-shared --filter @dbp/workflows-ui

# Build
RUN pnpm --filter @dbp/workflows-ui build

# Verify build output
RUN ls -la /repo/apps/workflows/ui/dist || (echo "ERROR: dist directory not found" && exit 1)
RUN test -f /repo/apps/workflows/ui/dist/index.html || (echo "ERROR: index.html not found" && exit 1)
RUN echo "Build verification: $(find /repo/apps/workflows/ui/dist -type f | wc -l) files generated"

# Production image
FROM nginx:alpine

# Copy built files
COPY --from=builder /repo/apps/workflows/ui/dist /usr/share/nginx/html

# Copy nginx config
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]

