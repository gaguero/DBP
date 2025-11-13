FROM node:18-alpine AS builder

ARG NODE_AUTH_TOKEN

WORKDIR /app

# Copiamos manifiestos
COPY package.json pnpm-lock.yaml* ./
RUN test -f pnpm-lock.yaml || touch pnpm-lock.yaml

# Configuramos pnpm y registro
RUN npm install -g pnpm@8.15.5
RUN npm config set @dbp:registry https://npm.pkg.github.com
RUN if [ -n "$NODE_AUTH_TOKEN" ]; then npm config set //npm.pkg.github.com/:_authToken "$NODE_AUTH_TOKEN"; fi

# Instalamos dependencias
RUN pnpm install

# Copiamos el resto del código
COPY . .

# Build
RUN pnpm build

# Verify build output
RUN ls -la /app/dist || (echo "ERROR: dist directory not found" && exit 1)
RUN test -f /app/dist/index.html || (echo "ERROR: index.html not found" && exit 1)
RUN echo "Build verification: $(find /app/dist -type f | wc -l) files generated"

# Production image
FROM nginx:alpine

# Copy built files
COPY --from=builder /app/dist /usr/share/nginx/html

# Copy nginx config
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]

