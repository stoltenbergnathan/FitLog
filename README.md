# FitLog
## How to run
1. Clone the repo
2. Create a `docker-compose.yaml` file in the root directory that looks like so
```
version: '3'

services:
  frontend:
    build: 
      context: .
      dockerfile: ./frontend/Dockerfile
    ports:
      - "80:80"
    depends_on:
      - backend

  backend:
    build:
      context: .
      dockerfile: ./backend/Dockerfile
    environment:
      - DB_URL=
    ports:
      - "3000:3000"
    depends_on:
      - db

  db:
    image: mongo:7
    volumes:
      - './.data:/data/db'
    environment:
      MONGO_INITDB_ROOT_USERNAME:
      MONGO_INITDB_ROOT_PASSWORD:
```
3. Run with `docker compose up --build`
