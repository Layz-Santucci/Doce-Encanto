# Etapa 1: instala dependências e gera o build do Angular
FROM node:22-alpine AS build
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci --no-audit --no-fund
COPY . .
RUN npx ng build

# Etapa 2: roda o servidor Node gerado pelo Angular (dist/.../server/server.mjs)
FROM node:22-alpine
WORKDIR /app
COPY --from=build /app/dist/loja-doces ./dist/loja-doces
ENV NODE_ENV=production
ENV PORT=4000
# Proteção do Angular SSR: só responde para estes hosts (separados por vírgula)
ENV NG_ALLOWED_HOSTS=localhost,127.0.0.1
EXPOSE 4000
CMD ["node", "dist/loja-doces/server/server.mjs"]
