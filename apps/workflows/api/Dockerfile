FROM node:18-alpine AS builder

WORKDIR /app

# Copy package manifest (lock file is optional)
COPY package.json pnpm-lock.yaml* ./

# Install pnpm
RUN npm install -g pnpm@8.15.5

# Install dependencies (workspace manifest not required in container)
RUN pnpm install

# Copy source
COPY . .

# Build
RUN pnpm build

# Production image
FROM node:18-alpine

WORKDIR /app

# Copy package manifest (lock file is optional)
COPY package.json pnpm-lock.yaml* ./

# Install pnpm
RUN npm install -g pnpm@8.15.5

# Install production dependencies only
RUN pnpm install --prod

# Copy built files
COPY --from=builder /app/dist ./dist

EXPOSE 3000

CMD ["node", "dist/index.js"]

