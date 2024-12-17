# Build stage
FROM node:18-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

# Production stage
FROM nginx:alpine
# Copy from "dist" instead of "build"
COPY --from=builder /app/dist /usr/share/nginx/html

# Create nginx config for SPA routing
RUN mkdir -p /etc/nginx/conf.d
COPY nginx/nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
