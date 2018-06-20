FROM node:9.4 AS npm

ENV APP_DIR /app

RUN mkdir -p ${APP_DIR}
COPY ./interface/package.json ${APP_DIR}/
WORKDIR ${APP_DIR}
RUN npm install
COPY ./interface/ ${APP_DIR}/
RUN npm run build

FROM nginx:alpine

ENV APP_DIR /app
ENV TEMPLATES_DIR  /templates
ENV TZ=America/Sao_Paulo
RUN mkdir -p ${APP_DIR} ${TPD_DIR}

RUN apk add --no-cache python3 uwsgi uwsgi-python3 iputils

COPY requirements.txt ${APP_DIR}/

RUN apk add --no-cache --virtual build-dependencies \
	gcc \
	python3-dev \
	musl-dev \
	linux-headers \
	tzdata \
	&& cp /usr/share/zoneinfo/$TZ /etc/localtime \
	&& echo $TZ > /etc/timezone \
	&& pip3 install -r ${APP_DIR}/requirements.txt \
	&& apk del build-dependencies

COPY ./deploy/app/startup.sh /usr/bin/startup-uwsgi
COPY deploy/app/nginx.conf /etc/nginx/conf.d/default.conf
RUN chmod +x /usr/bin/startup-uwsgi
COPY deploy/app/uwsgi.ini run.py ${APP_DIR}/
COPY backend/ ${APP_DIR}/backend/
COPY --from=npm ${APP_DIR}/build ${APP_DIR}/build
#COPY configs.json /root/configs.json
CMD nginx && startup-uwsgi
