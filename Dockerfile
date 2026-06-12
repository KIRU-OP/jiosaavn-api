# Base stage
FROM oven/bun:1 AS base

WORKDIR /user/app

COPY package.json ./
COPY bun.lockb ./

# Install production dependencies
RUN bun install --production

# Build stage
FROM base AS build

WORKDIR /user/app

COPY . .

# Install all dependencies needed for build
RUN bun install

# Build project
RUN bun run build

# Production stage
FROM oven/bun:alpine AS production

WORKDIR /user/app

COPY --from=build /user/app/dist ./dist
COPY --from=build /user/app/node_modules ./node_modules
COPY --from=build /user/app/package.json ./package.json

EXPOSE 3000

CMD ["bun", "run", "start"]
