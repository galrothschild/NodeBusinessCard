FROM node:20.12.2-alpine

# Create app directory
WORKDIR /app

# Install app dependencies
COPY package*.json ./

RUN npm i --include=dev

COPY . .