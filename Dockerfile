# Use an official Node.js image as the base image
FROM node:18-alpine AS builder

WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build
RUN npm ci --only=production
FROM node:18-alpine AS runner
WORKDIR /app

COPY --from=builder /app/.next ./.next
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package*.json ./
COPY --from=builder /app/public ./public

ENV NODE_ENV=production
ENV PORT=3000

# Expose the port that the application will run on
EXPOSE 3000

# Start the Next.js application
CMD ["npm", "start"]