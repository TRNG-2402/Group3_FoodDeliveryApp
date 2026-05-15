# Build stage
FROM node:22-alpine AS build

WORKDIR /app

# Copy package files first for better caching
COPY package*.json ./

RUN npm install

# Copy the rest of the frontend source
COPY . .

# Enviromental Variables
ARG VITE_GOOGLE_MAP_API_KEY
ARG VITE_API_BASE_URL

ENV VITE_GOOGLE_MAP_API_KEY=$VITE_GOOGLE_MAP_API_KEY
ENV VITE_API_BASE_URL=$VITE_API_BASE_URL

# Build Vite app
RUN npm run build


# Production stage
FROM nginx:alpine AS production

# Copy custom nginx config
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Copy built frontend from Vite dist folder
COPY --from=build /app/dist /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]