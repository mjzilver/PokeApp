# Build frontend    
FROM node:18 AS build-env
WORKDIR /app

# install dependencies
COPY package*.json ./
RUN npm install
# build app
COPY . .
RUN npm run build

# Build runtime image
FROM nginx:alpine
WORKDIR /usr/share/nginx/html
COPY --from=build-env /app/dist .

# Expose port 80
EXPOSE 80

# Start nginx
CMD ["nginx", "-g", "daemon off;"]
