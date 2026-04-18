# =========================
# 1. Base image
# =========================
FROM node:22-alpine

# =========================
# 2. Working directory
# =========================
WORKDIR /app

# =========================
# 3. Copy package files
# =========================
COPY package*.json ./

# =========================
# 4. Install dependencies
# =========================
RUN npm install

# =========================
# 5. Copy all source code
# =========================
COPY . .

# =========================
# 6. Prisma generate
# =========================
RUN npx prisma generate

# =========================
# 7. Build TypeScript
# =========================
RUN npm run build

# =========================
# 8. Expose port
# =========================
EXPOSE 5000

# =========================
# 9. Start app
# =========================
CMD ["npm", "run", "start"]