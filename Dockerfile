FROM node:alpine
RUN apk add --no-cache \
    nano \
    bash \
    curl \
    && apk add --no-cache --virtual .build-deps \
    tzdata \
    && cp /usr/share/zoneinfo/Asia/Riyadh /etc/localtime \
    && apk del .build-deps
WORKDIR /usr/src/app
COPY . .
RUN npm install
COPY cronjob /etc/cron.d/cronjob
RUN chmod 0644 /etc/cron.d/cronjob
RUN crontab /etc/cron.d/cronjob
CMD ["crond", "-f"]
