# Base image for building the React app
FROM node:18-alpine AS build

# Set working directory
WORKDIR /app

# Install dependencies
COPY package*.json ./
RUN npm install

# Copy source files
COPY . .

# Build the Vite app for production
RUN npm run build

# Fase final: Servir con Nginx
FROM nginx:alpine
COPY --from=build /app/dist /usr/share/nginx/html
COPY nginx/default.conf /etc/nginx/conf.d/default.conf

# Exponer el puerto 80 para el tráfico HTTP
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]

# Development Stage: Use Vite dev server

FROM node:18-alpine AS development

# Set working directory
WORKDIR /app

# Copy dependencies and source files from the build stage
COPY --from=build /app /app

# Expose the development server's default port
EXPOSE 5173

# Start the Vite development server, ensure it listens on all interfaces
CMD ["npm", "run", "dev", "--", "--host"]



