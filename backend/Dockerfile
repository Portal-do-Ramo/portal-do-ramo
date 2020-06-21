FROM php:7.4-fpm

RUN apt-get update && apt-get install -y \
    libfreetype6-dev \
    libjpeg62-turbo-dev \
    libpng-dev \
    libzip-dev 

RUN docker-php-ext-install pdo pdo_mysql 

RUN docker-php-ext-configure gd --prefix=/usr --with-jpeg  --with-freetype
RUN docker-php-ext-install gd

RUN docker-php-ext-install zip