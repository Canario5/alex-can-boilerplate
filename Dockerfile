# syntax=docker/dockerfile:1@sha256:38387523653efa0039f8e1c89bb74a30504e76ee9f565e25c9a09841f9427b05

# -----------------------------------------------------------------------------
#
# Local Development (starts dev service with hot-reloading):
#   "docker-compose up dev"
#
# Build Production Image (builds prod service image):
#   "docker-compose build prod"
#
# Run Production Image Locally (localhost:8080, detached):
#   "docker-compose up -d prod"
#   (Stop it with "docker-compose down prod")
#
# Or just use pnpm scripts from package.json
# -----------------------------------------------------------------------------

# Base stage - pnpm installation
FROM node:24-alpine@sha256:be4d5e92ac68483ec71440bf5934865b4b7fcb93588f17a24d411d15f0204e4f AS base
WORKDIR /app
RUN npm install -g pnpm
COPY package.json pnpm-lock.yaml ./
RUN pnpm install --frozen-lockfile

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
FROM nginxinc/nginx-unprivileged:alpine-slim@sha256:c08c396099a0f66886404a35ec1610380a36ef9b8de2a2ba22dc7ee307d910ed AS prod
USER 101
COPY --from=build /app/dist /usr/share/nginx/html
EXPOSE 8080
CMD ["nginx", "-g", "daemon off;"]
