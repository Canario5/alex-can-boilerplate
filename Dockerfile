# syntax=docker/dockerfile:1@sha256:38387523653efa0039f8e1c89bb74a30504e76ee9f565e25c9a09841f9427b05

# -----------------------------------------------------------------------------
# Use npm scripts for easy commands:
#
# Local Development (starts dev service with hot-reloading):
#   "docker-compose up dev" run as "npm run docker:dev"
#
# Build Production Image (builds prod service image):
#   "docker-compose build prod" run as "npm run docker:build"
#
# Run Production Image Locally (localhost:8080, detached):
#   "docker-compose up -d prod" run as "npm run docker:run"
#   (Stop with "npm run docker:stop" or "docker-compose down prod")
# -----------------------------------------------------------------------------

# Base stage - npm installation
FROM node:24-alpine@sha256:b13895216ed51cc6decab51466f86346884af1e3656dea02a2a9c1a7c4dedccd AS base
WORKDIR /app
COPY package*.json ./
RUN npm ci

# Development stage
FROM base AS dev
WORKDIR /app
COPY . .
EXPOSE 5173
CMD ["npm", "run", "dev"]

# Production build stage
FROM base AS build
WORKDIR /app
COPY . .
RUN npm run build

# Final production image (copies only built dist folder)
FROM nginxinc/nginx-unprivileged:alpine-slim@sha256:c08c396099a0f66886404a35ec1610380a36ef9b8de2a2ba22dc7ee307d910ed AS prod
USER 101
COPY --from=build /app/dist /usr/share/nginx/html
EXPOSE 8080
CMD ["nginx", "-g", "daemon off;"]
