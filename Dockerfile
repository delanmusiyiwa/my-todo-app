FROM node:18-alpine as builder
WORKDIR /app
COPY package*.json ./
COPY prisma ./prisma
RUN npm install
RUN npx prisma generate
COPY . .
RUN npm run build

FROM node:18-alpine as runner
WORKDIR /app

COPY --from=builder /app/package*.json ./
COPY --from=builder /app/prisma ./prisma
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/node_modules ./node_modules

# Expose port
ENV PORT=3000
ENV DATABASE_URL=postgresql://postgres:postgres@multex.cbac8osi8jre.us-east-1.rds.amazonaws.com:5432/todo
EXPOSE 3000

# No DATABASE_URL is set here, we will pass it at runtime

CMD npx prisma migrate deploy && npm run start
