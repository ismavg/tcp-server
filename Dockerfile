FROM node:current-alpine

# Create app directory
WORKDIR /usr/src/app

# Bundle app source
COPY . .

EXPOSE 8080
CMD [ "node", "server.js" ]