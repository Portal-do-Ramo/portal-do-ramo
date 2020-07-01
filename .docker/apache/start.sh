#!/usr/bin/env bash

set -e

role=${CONTAINER_ROLE}
env=${APP_ENV}

if [ "$env" = "production" ]; then
    php artisan config:cache && php artisan route:cache
fi

if [ "$role" = "server" ]; then
    exec apache2-foreground
elif [ "$role" = "queue" ]; then
    php artisan queue:work --queue=strike-recebido,broadcast,default,audiencia-strike-mail,mensagem-sistema-mail,abrir-fechar-vaquinha,notificar-fim-inatividade
elif [ "$role" = "scheduler" ]; then
    while [ true ]
    do
        php artisan schedule:run --verbose --no-interaction &
        sleep 60
    done
fi