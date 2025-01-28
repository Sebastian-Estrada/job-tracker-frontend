# Base image for building the React app
FROM node:18-alpine AS build

# Set working directory
WORKDIR /app

# Install dependencies
COPY package*.json ./
RUN npm install --silent

# Copy source files
COPY . .

# Build the Vite app for production
RUN npm run build

# Production Stage: Use Nginx to serve static files
FROM nginx:1.25-alpine AS production

# Copy built Vite app from build stage
COPY --from=build /app/dist /usr/share/nginx/html

# Copy custom Nginx config
COPY nginx/default.conf /etc/nginx/conf.d/default.conf

# Expose port 80
EXPOSE 80

# Start Nginx
CMD ["nginx", "-g", "daemon off;"]

# Development Stage: Use Vite dev server
FROM node:18-alpine AS development

WORKDIR /app

# Install dependencies
COPY package*.json ./
RUN npm install --silent

# Copy source files
COPY . .

# Expose the development server's default port
EXPOSE 5173

# Start the Vite development server
CMD ["npm", "run", "dev", "--", "--host"]