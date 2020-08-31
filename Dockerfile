FROM node:latest

WORKDIR /app

COPY package.* .

RUN yarn install

RUN yarn global add nodemon
