# This is a Bookmark App - Backend

Description : this is an my exsercise to learn nestjs with bookmark app study case.  
Learn Duration : 3 Days.  
Author : Rizqi Pratama  

The point that i get from this lesson is :

- How to build Backend with nestjs
- How to build Backend with Typescript
- Using Different db environment
- Dependency Injection
- NestJS DTO
- E2E Testing
- Prisma Database ORM
- and other.

## How to run

Requirements:

- NodeJS Environment
- Docker Engine / Desktop

Api Collection :

[<img src="https://run.pstmn.io/button.svg" alt="Run In Postman" style="width: 128px; height: 32px;">](https://documenter.getpostman.com/view/31887036/2s9YsNeASs)

On Local :

- Clone this repo
- Install dependencies ``yarn install``
- Setup the database or using docker compose ``docker compose up``
- setup the env file, ``.env`` and ``.env.test``
- then start the app using ``yarn start:dev``

> Note: if you are using docker, you can get the ``DATABASE_URL`` from the configuration below.

## Environment

Save configuration below to ``.env`` or ``.env.test`` , if you are using docker compose to setup the db, you can using this env below to fill the ``DATABASE_URL``.

Fill with config below for the dev environment:  
``DATABASE_URL="postgres://postgres:good-password@localhost:5434/postgres"``

Or Fill with config below for the dev environment:  
``DATABASE_URL="postgres://postgres:good-password@localhost:5435/postgres"``

For the configuration you can check on config below.

```shell
#
# The default APP_PORT is 3000, fill app port bellow to overwrite
#
APP_URL="http://localhost:9000"
APP_PORT="9000"
JWT_SECRET="fill-by-your-own-secret"

# This was inserted by `prisma init`:
# Environment variables declared in this file are automatically made available to Prisma.
# See the documentation for more detail: https://pris.ly/d/prisma-schema#accessing-environment-variables-from-the-schema

# Prisma supports the native connection string format for PostgreSQL, MySQL, SQLite, SQL Server, MongoDB and CockroachDB.
# See the documentation for all the connection string options: https://pris.ly/d/connection-strings

DATABASE_URL="postgres://postgres:good-password@localhost:5434/postgres"
```

## Credit

- [FreeCodeCamp](https://www.freecodecamp.org/news/learn-nestjs-by-building-a-crud-api)
- [Code with Vlad](hcodewithvlad.com)
