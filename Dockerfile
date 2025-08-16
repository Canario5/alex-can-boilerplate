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
FROM node:24-alpine@sha256:e8e882c692a08878d55ec8ff6c5a4a71b3edca25eda0af4406e2a160d8a93cf2 AS base
WORKDIR /app
COPY package*.json ./
COPY scripts/npm-prepare.js scripts/npm-prepare.js
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
FROM nginxinc/nginx-unprivileged:alpine-slim@sha256:f60d6f99ab130cbaca7a1356e27ead0ca64cee16362f3a52dbca9795044eb1cd AS prod
USER 101
COPY --from=build /app/dist /usr/share/nginx/html
EXPOSE 8080
CMD ["nginx", "-g", "daemon off;"]
