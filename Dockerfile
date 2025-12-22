# syntax=docker/dockerfile:1@sha256:b6afd42430b15f2d2a4c5a02b919e98a525b785b1aaff16747d2f623364e39b6

# --------------------------------------------
#? Just use pnpm scripts from package.json
#* more info: docs/scripts.md
# --------------------------------------------

# Base stage - pnpm installation
FROM node:24-alpine@sha256:c921b97d4b74f51744057454b306b418cf693865e73b8100559189605f6955b8 AS base
WORKDIR /app
RUN corepack enable
COPY pnpm-lock.yaml pnpm-workspace.yaml ./
#! Note: pnpm fetch runs before package.json is copied so corepack can use inproper pnpm version!
RUN --mount=type=cache,id=pnpm,target=/root/.local/share/pnpm/store pnpm fetch --frozen-lockfile

#* package.json is copied after fetch to leverage Docker caching when dependencies in package.json do not change (like edits of scripts for example)
COPY package.json ./
RUN --mount=type=cache,id=pnpm,target=/root/.local/share/pnpm/store pnpm install --frozen-lockfile --offline

# Development stage
FROM base AS dev
WORKDIR /app
COPY . .
EXPOSE 5173
CMD ["pnpm", "run", "dev"]

# Production build stage
FROM base AS build
WORKDIR /app
COPY . .
RUN pnpm run build

# Final production image (copies only built dist folder)
FROM nginxinc/nginx-unprivileged:alpine-slim@sha256:d9def221bf58500eb9d2f896367d149af317dce65a67bfdd1260754a4a8bc073 AS prod
USER 101
COPY --from=build /app/dist /usr/share/nginx/html
EXPOSE 8080
CMD ["nginx", "-g", "daemon off;"]
