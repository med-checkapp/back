FROM node:alpine

ENV PORT=3000 \
    APP_DIR=/usr/src/app

WORKDIR ${APP_DIR}

RUN npm i -g @nestjs/cli

COPY package.json yarn.lock ./

RUN yarn install

COPY . ./

EXPOSE ${PORT}

CMD yarn start:dev
