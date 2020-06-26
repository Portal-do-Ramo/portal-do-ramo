FROM node:alpine as builder

WORKDIR /app

COPY . .
RUN npm install --silent
RUN npm run build --silent

FROM nginx:stable-alpine

COPY ./nginx/default.conf /etc/nginx/conf.d/default.conf
COPY --from=builder /app/build /usr/share/nginx/html

EXPOSE 80 443
ENTRYPOINT ["nginx", "-g", "daemon off;"]