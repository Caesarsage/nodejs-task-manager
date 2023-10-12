FROM node:18

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm run install
COPY . .

RUN npm run build

CMD [ "node", "index.js" ]
