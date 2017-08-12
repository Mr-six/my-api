FROM node:8.0.0
MAINTAINER mrsix '582497915@qq.com'

RUN mkdir -p /usr/src/app

WORKDIR /usr/src/app

COPY . /usr/src/app
RUN npm install && npm cache clean --force

CMD [ "npm", "start prod" ]
