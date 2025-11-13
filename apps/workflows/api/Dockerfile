FROM node:18-alpine AS builder

ARG NODE_AUTH_TOKEN

WORKDIR /app

# Copiamos manifiestos locales
COPY package.json pnpm-lock.yaml* ./
RUN test -f pnpm-lock.yaml || touch pnpm-lock.yaml

# Preparamos pnpm y acceso a GitHub Packages
RUN npm install -g pnpm@8.15.5
RUN npm config set @dbp:registry https://npm.pkg.github.com
RUN if [ -n "$NODE_AUTH_TOKEN" ]; then npm config set //npm.pkg.github.com/:_authToken "$NODE_AUTH_TOKEN"; fi

# Instalamos dependencias (incluye @dbp/workflows-shared remoto)
RUN pnpm install

# Copiamos el resto del código
COPY . .

# Compilamos
RUN pnpm build
RUN pnpm prune --prod

# Imagen final
FROM node:18-alpine

WORKDIR /app

COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/dist ./dist
COPY package.json ./

EXPOSE 3000

CMD ["node", "dist/index.js"]

