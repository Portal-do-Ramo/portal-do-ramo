FROM php:7.4-fpm

RUN docker-php-ext-install pdo pdo_mysql 

COPY . /var/www/html

CMD ["/var/www/html/start/start.sh"]