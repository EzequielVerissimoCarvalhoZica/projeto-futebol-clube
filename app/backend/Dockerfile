FROM node:16-alpine

WORKDIR /home/static

COPY package*.json /

RUN npm install && adduser -D static

USER static

COPY . .

EXPOSE 3001

ENTRYPOINT [ "npm", "start" ]
