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

# Fase final: Servir con Nginx
FROM nginx:alpine
COPY --from=build /app/dist /usr/share/nginx/html
COPY nginx/default.conf /etc/nginx/conf.d/default.conf

# Exponer el puerto 80 para el tráfico HTTP
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]



