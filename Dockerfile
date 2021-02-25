FROM node:14.15

WORKDIR /movie-app/client

COPY package.json /movie-app/client
COPY package-lock.json /movie-app/client

RUN npm install 

COPY . /movie-app/client

CMD ["npm", "start"]
