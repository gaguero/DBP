FROM node:18-alpine AS builder

WORKDIR /app

# Copy workspace manifests
COPY pnpm-workspace.yaml package.json pnpm-lock.yaml* ./

# Install pnpm
RUN npm install -g pnpm@8.15.5

# Copy workspace packages needed for install
COPY apps/workflows/workers ./apps/workflows/workers
COPY apps/workflows/shared ./apps/workflows/shared
COPY apps/workflows/api ./apps/workflows/api

# Install dependencies
RUN pnpm install

# Build
WORKDIR /app/apps/workflows/workers
RUN pnpm build

# Production image
FROM node:18-alpine

WORKDIR /app

# Copy workspace manifests
COPY pnpm-workspace.yaml package.json pnpm-lock.yaml* ./

# Install pnpm
RUN npm install -g pnpm@8.15.5

# Copy workspace packages for production install
COPY apps/workflows/workers ./apps/workflows/workers
COPY apps/workflows/shared ./apps/workflows/shared
COPY apps/workflows/api ./apps/workflows/api

# Install production dependencies only for workers
RUN pnpm install --filter @dbp/workflows-workers --prod

# Copy built files
COPY --from=builder /app/apps/workflows/workers/dist ./dist

CMD ["node", "dist/index.js"]

