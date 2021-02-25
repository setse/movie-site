# Install movie-app/client

Client for gastromatic movie test api

## Setup Without Docker

```
npm install
npm run start
```

Test running server by accessing `http://localhost:3000/`

## Setup with Docker (Not tested)

Docker and docker-compose need to be installed. To start the services run

```
docker build -t client
docker run -it -p 8080:3000 client
```

Test running server by accessing `http://localhost:8080/`
