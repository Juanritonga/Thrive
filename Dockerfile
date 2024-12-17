# Build stage
FROM node:18-alpine AS builder
WORKDIR /app

# Declare the build arg
ARG VITE_API_BASE_URL
# Set it as an environment variable during build
ENV VITE_API_BASE_URL=$VITE_API_BASE_URL

# Install dependencies
COPY package*.json ./
RUN npm ci

# Copy source files and build
COPY . .
RUN echo "VITE_API_BASE_URL=${VITE_API_BASE_URL}" > .env
RUN npm run build

# Production stage
FROM nginx:alpine
COPY --from=builder /app/dist /usr/share/nginx/html
COPY nginx/nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
