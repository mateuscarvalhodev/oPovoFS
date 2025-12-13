#!/bin/bash

docker-compose up -d

echo "Aguardando MySQL inicializar..."
sleep 10

docker-compose exec app php artisan key:generate

docker-compose exec app php artisan migrate --seed

docker-compose exec app php artisan config:clear
docker-compose exec app php artisan cache:clear

echo "Aplicação rodando em http://localhost:8000"
echo "PhpMyAdmin rodando em http://localhost:8080"