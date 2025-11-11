FROM node:18-alpine AS builder

WORKDIR /app

# Copy package manifest (lock file is optional)
COPY package.json pnpm-lock.yaml* ./

# Install pnpm
RUN npm install -g pnpm@8.15.5

# Install dependencies
RUN pnpm install

# Copy source
COPY . .

# Build
RUN pnpm build

# Production image
FROM nginx:alpine

# Copy built files
COPY --from=builder /app/dist /usr/share/nginx/html

# Copy nginx config
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]

