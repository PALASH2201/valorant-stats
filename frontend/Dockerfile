# Dockerfile for the frontend
FROM node:18-alpine AS builder

WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application files
COPY . .

# Build the application
RUN npm run build

# Second stage for serving the app
FROM node:18-alpine

WORKDIR /app

# Copy the build artifacts from the builder stage
COPY --from=builder /app/dist ./dist

# Install serve to serve the build
RUN npm install -g serve

# Expose the application port (Vite default port is 4173)
EXPOSE 4173

# Start the app
CMD ["serve", "-s", "dist", "-l", "4173"]
