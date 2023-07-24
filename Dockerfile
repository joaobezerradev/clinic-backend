
FROM node:18-alpine3.17

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm ci

RUN npm run build

COPY dist

EXPOSE 8080

CMD [ "npm", "start" ]
