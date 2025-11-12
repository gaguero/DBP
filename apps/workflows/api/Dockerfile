FROM node:18-alpine AS builder

WORKDIR /app

# Copy workspace manifests
COPY pnpm-workspace.yaml package.json pnpm-lock.yaml* ./

# Install pnpm
RUN npm install -g pnpm@8.15.5

# Copy workspace packages needed for install
COPY apps/workflows/api ./apps/workflows/api
COPY apps/workflows/shared ./apps/workflows/shared

# Install dependencies (workspace aware)
RUN pnpm install

# Build API
WORKDIR /app/apps/workflows/api
RUN pnpm build

# Production image
FROM node:18-alpine

WORKDIR /app

# Copy workspace manifests
COPY pnpm-workspace.yaml package.json pnpm-lock.yaml* ./

# Install pnpm
RUN npm install -g pnpm@8.15.5

# Copy workspace packages for production install
COPY apps/workflows/api ./apps/workflows/api
COPY apps/workflows/shared ./apps/workflows/shared

# Install production dependencies only
RUN pnpm install --filter @dbp/workflows-api --prod

# Copy built files
COPY --from=builder /app/apps/workflows/api/dist ./dist

EXPOSE 3000

CMD ["node", "dist/index.js"]

