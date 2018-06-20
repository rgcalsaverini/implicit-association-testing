FROM node:9.4 AS npm

ENV APP_DIR /front

RUN mkdir -p ${APP_DIR}
COPY ./interface/package.json ${APP_DIR}/
WORKDIR ${APP_DIR}
RUN npm install
COPY ./interface/ ${APP_DIR}/
RUN npm run build
