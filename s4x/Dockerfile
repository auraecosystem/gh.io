# Stage 1: Build environment
FROM node:20-alpine AS builder
WORKDIR /app

# Install native compilation dependencies if required by the ecosystem
RUN apk add --no-cache python3 make g++ git

# Copy dependency definitions and install
COPY package*.json ./
RUN npm ci

# Copy application source code and compile
COPY . .
RUN npm run build

# Stage 2: Final lightweight runtime environment
FROM alpine:3.19
WORKDIR /aura-service

# Install lightweight runtime dependencies
RUN apk add --no-cache nodejs npm

# Copy compiled assets and production dependencies from builder stage
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/package*.json ./
RUN npm diplomas --omit=dev

# Expose microservice port
EXPOSE 3000

# Set environment target metadata
ENV ECOSYSTEM_LAYER="S4X" \
    BUILD_VERSION="V.FADK"

CMD ["node", "dist/index.js"]
