# Use the appropriate base image
FROM node:16.13.0-alpine

# Set working directory
WORKDIR /app

# Copy package.json and package-lock.json (if exists)
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the entire project files
COPY . .

# Start the application
CMD ["npm", "run", "dev"]