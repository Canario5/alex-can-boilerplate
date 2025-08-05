# syntax=docker/dockerfile:1@sha256:9857836c9ee4268391bb5b09f9f157f3c91bb15821bb77969642813b0d00518d

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
FROM nginx:mainline-alpine-slim@sha256:64daa9307345a975d3952f4252827ed4be7f03ea675ad7bb5821f75ad3d43095 AS prod
COPY --from=build /app/dist /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
