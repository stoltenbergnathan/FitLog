# Stage: Build the Node.js backend
FROM node:20

WORKDIR /app

COPY ./package*.json ./
RUN npm install --only=production

COPY . ./

CMD ["npm", "run", "prod"]
