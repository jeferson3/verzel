# API Rest de veículos desenvolvida em Framework Laravel consumida com React JS

## Clonar repositório
```sh
#-- Clonar repositório --#
https://github.com/jeferson3/verzel.git
```

## CONFIGURAÇÃO API

## Requisitos
- PHP 8
- Composer
- Mysql

## Instalação
```sh

#-- Navegar até a pasta do projeto (Verzel) --# 
cd api/

#-- Criar arquivo .env --# 
cp .env.example .env

#-- Alterar credenciais do banco no .env --# 
DB_CONNECTION=driver
DB_HOST=host
DB_PORT=port
DB_DATABASE=database_name
DB_USERNAME=username
DB_PASSWORD=password


#-- Instalar depências --# 
composer install

#-- Migrations - banco de dados --# 
php artisan migrate

#-- Geração de dados fakes --# 
php artisan db:seed

#-- Criar key app --# 
php artisan key:generate

#-- Criar secret JWT --# 
php artisan jwt:secret

#-- Gerar documentação --# 
php artisan l5-swagger:generate

#-- Iniciar servidor --# 
php artisan serve


```


## CONFIGURAÇÃO FRONT END REACT JS

## Requisitos
- Node
- NPM ou YARN

## Instalação
```sh

#-- Navegar até a pasta do projeto --# 
cd frontend/

#-- Instalar depências --# 
npm install

#-- Iniciar servidor --# 
npm start

```

