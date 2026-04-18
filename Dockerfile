# =========================
# Stage 1: Builder
# =========================
FROM node:22-alpine AS builder

WORKDIR /app

COPY package.json package-lock.json ./
RUN npm install

COPY prisma ./prisma/
COPY prisma.config.ts ./

# Prisma generate (build-time safe dummy env)
RUN DATABASE_URL="postgresql://placeholder:5432" npx prisma generate

COPY . .

RUN npm run build


# =========================
# Stage 2: Production
# =========================
FROM node:22-alpine

WORKDIR /app

ENV NODE_ENV=production

COPY package.json package-lock.json ./
RUN npm install --omit=dev

COPY prisma ./prisma/
COPY prisma.config.ts ./
COPY docs ./docs

# Prisma generate again for runtime
RUN DATABASE_URL="postgresql://placeholder:5432" npx prisma generate

COPY --from=builder /app/dist ./dist

EXPOSE 5000

# Start app
CMD ["sh", "-c", "npx prisma migrate deploy && node dist/index.js"]