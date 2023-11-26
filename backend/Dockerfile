# Use a multi-stage build for optimization
# Stage 1: Build Stage
FROM node:16.13.0-alpine AS builder

# Set working directory
WORKDIR /usr/app

# Copy package.json and package-lock.json (if exists)
COPY package*.json ./
COPY prisma ./prisma/

# Install dependencies
RUN npm ci --only=production

# Copy the entire project files
COPY . .

# Generate Prisma files
RUN npx prisma generate

# Stage 2: Runtime Stage
FROM node:16.13.0-alpine

# Set working directory
WORKDIR /usr/app

# Copy only necessary files from the builder stage
COPY --from=builder /usr/app .
COPY --from=builder /usr/app/prisma ./prisma

# Expose the necessary ports
EXPOSE 3000

# Start the application
CMD ["npm", "start", "start:migrate:prod"]