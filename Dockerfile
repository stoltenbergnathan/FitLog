FROM node:20 as build

WORKDIR /app

COPY ./frontend/package*.json ./
RUN npm install

COPY ./frontend ./
RUN npm run build --prod

FROM node:20

WORKDIR /app

COPY ./backend/package*.json ./
RUN npm install --only=production

COPY --from=build /app/dist /app/dist
COPY ./backend ./

EXPOSE 3000

CMD [ "npm", "run", "prod" ]