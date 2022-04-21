FROM node:16-alpine

WORKDIR /home/static

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 3001

ENTRYPOINT [ "npm", "start" ]
