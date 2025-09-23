# syntax=docker/dockerfile:1@sha256:dabfc0969b935b2080555ace70ee69a5261af8a8f1b4df97b9e7fbcf6722eddf

# --------------------------------------------
#? Just use pnpm scripts from package.json
#* more info: docs/scripts.md
# --------------------------------------------

# Base stage - pnpm installation
FROM node:24-alpine@sha256:be4d5e92ac68483ec71440bf5934865b4b7fcb93588f17a24d411d15f0204e4f AS base
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
FROM nginxinc/nginx-unprivileged:alpine-slim@sha256:0d019e980f83728002de7a6d8819d0d4af7179046d3946b8b37749953fbb28e6 AS prod
USER 101
COPY --from=build /app/dist /usr/share/nginx/html
EXPOSE 8080
CMD ["nginx", "-g", "daemon off;"]
