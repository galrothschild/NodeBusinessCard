FROM node:lts-alpine

# Create app directory
WORKDIR /app

# Install app dependencies
COPY package*.json ./

RUN npm i --include=dev

COPY . .