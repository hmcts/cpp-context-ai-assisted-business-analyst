FROM node:22-alpine AS build

WORKDIR /app

COPY package.json ./
RUN npm install --omit=dev

COPY src ./src

FROM node:22-alpine

# node:22-alpine ships npm 10.9.9, which bundles sigstore 3.1.0 (CVE-2026-48815).
# npm 12.2.0 bundles sigstore 5.0.0.
RUN npm install -g npm@12.2.0 \
 && npm cache clean --force \
 && addgroup -g 2000 app && adduser -D -u 2000 -G app app

WORKDIR /app

COPY --from=build /app/node_modules ./node_modules
COPY --from=build /app/src ./src
COPY package.json ./

USER 2000:2000

ENV NODE_ENV=production
ENV PORT=4550
ENV CONTEXT_PATH=/cpp-context-ai-assisted-business-analyst

EXPOSE 4550

CMD ["npm", "start"]
