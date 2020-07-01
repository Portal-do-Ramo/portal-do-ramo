FROM node:alpine as builder
ENV GENERATE_SOURCEMAP false

WORKDIR /app

COPY ./frontend .
RUN npm install --silent
RUN npm run build --silent

FROM nginx:stable-alpine

COPY .docker/nginx/default.prod.conf /etc/nginx/conf.d/default.conf
COPY --from=builder /app/build /usr/share/nginx/html

EXPOSE 80 443
ENTRYPOINT ["nginx", "-g", "daemon off;"]
