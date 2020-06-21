FROM node:12.18.0-alpine

RUN npm i -g laravel-echo-server 

WORKDIR /app

ENTRYPOINT ["laravel-echo-server"]
CMD ["start", "--force"]