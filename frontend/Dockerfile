# Stage 1: Build the Angular application
FROM node:20 as build

WORKDIR /app

COPY frontend/package*.json ./
RUN npm install

COPY frontend/. .
RUN npm run build --prod

# Stage 2: Serve the Angular application using NGINX
FROM nginx:alpine
COPY --from=build /app/dist/fitlog-frontend/browser /usr/share/nginx/html
COPY frontend/nginx.conf /etc/nginx/nginx.conf

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
