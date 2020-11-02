FROM node:alpine

ENV PORT=3000 \
    APP_DIR=/usr/src/app

WORKDIR ${APP_DIR}

RUN npm i -g @nestjs/cli && \
    apk add --update chromium nss freetype freetype-dev harfbuzz ca-certificates ttf-freefont

COPY package.json ./

RUN yarn install

COPY . ./

EXPOSE ${PORT}

CMD yarn start:dev
