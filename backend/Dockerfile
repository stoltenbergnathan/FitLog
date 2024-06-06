# Stage: Build the Node.js backend
FROM node:20

WORKDIR /app

COPY backend/package*.json ./
RUN npm install --only=production

COPY backend/. ./

EXPOSE 3000

CMD ["npm", "run", "prod"]
