FROM node:18-alpine AS builder

WORKDIR /app

# Copy workspace manifests and source
COPY pnpm-workspace.yaml package.json pnpm-lock.yaml* ./
COPY . .

# Install pnpm and dependencies
RUN npm install -g pnpm@8.15.5
RUN pnpm install

# Build shared utilities and API
RUN pnpm --filter @dbp/workflows-shared build
RUN pnpm --filter @dbp/workflows-api build

# Production image
FROM node:18-alpine

WORKDIR /app/apps/workflows/api

# Copy built application, shared package, and node modules
COPY --from=builder /app/apps/workflows/api ./ 
COPY --from=builder /app/apps/workflows/shared /app/apps/workflows/shared
COPY --from=builder /app/node_modules /app/node_modules

EXPOSE 3000

CMD ["node", "dist/index.js"]

