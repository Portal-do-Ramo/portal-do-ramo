FROM php:7.4-apache

RUN apt-get update && apt-get install -y \
    libfreetype6-dev \
    libjpeg62-turbo-dev \
    libpng-dev \
    libzip-dev 

RUN docker-php-ext-install pdo pdo_mysql 

RUN docker-php-ext-configure gd --prefix=/usr --with-jpeg  --with-freetype
RUN docker-php-ext-install gd

RUN docker-php-ext-install zip

COPY ./backend /var/www/html
COPY .docker/apache/vhost.conf /etc/apache2/sites-available/000-default.conf
COPY .docker/apache/start.sh /usr/local/bin/start

RUN usermod -u 1000 www-data \
    && groupmod -g 1000 www-data \
    && chown -R www-data:www-data /var/www/html \
    && chmod u+x /usr/local/bin/start \
    && a2enmod rewrite

EXPOSE 8080
CMD ["/usr/local/bin/start"]
