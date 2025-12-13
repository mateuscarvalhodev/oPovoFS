@echo off
echo Subindo os containers...
docker-compose up -d

echo Aguardando MySQL inicializar...
timeout /t 10 /nobreak

echo Gerando chave da aplicacao...
docker-compose exec app php artisan key:generate

echo Rodando migrations...
docker-compose exec app php artisan migrate

echo Limpando cache...
docker-compose exec app php artisan config:clear
docker-compose exec app php artisan cache:clear

echo.
echo ========================================
echo Aplicacao rodando em http://localhost:8000
echo PhpMyAdmin rodando em http://localhost:8080
echo ========================================
pause