FROM node:lts-slim AS base
ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
RUN corepack enable
COPY . /app
WORKDIR /app

FROM base AS build
RUN --mount=type=cache,id=pnpm,target=/pnpm/store pnpm install --frozen-lockfile
RUN pnpm run build

FROM alpine:latest AS runner
RUN apk add --no-cache nodejs
COPY --from=build /app/dist/index.js /dist/index.js
WORKDIR /dist
CMD [ "node", "index.js" ]
