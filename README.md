[travis-image]: https://api.travis-ci.org/nestjs/nest.svg?branch=master
[travis-url]: https://travis-ci.org/nestjs/nest
[linux-image]: https://img.shields.io/travis/nestjs/nest/master.svg?label=linux
[linux-url]: https://travis-ci.org/nestjs/nest

# Typescript Node Js API Postgres TypeORM Swagger

NESTJs - A Typescript/ Javascript equivalent of Spring boot.

API branch - No front end integration

Default url opens API docs - localhost:3000/

Opioniated very similar to Angular. Modular

## Description

[Nest](https://github.com/nestjs/nest) framework TypeScript starter repository.

## Installation

```bash
$ npm install
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## Running in docker

### Building docker image

docker build -t ts-nest .

### Running docker image pointing to local postgres

docker run -p 3000:3000 -e DB_PORT=5432 -e DB_HOST=host.docker.internal -e DB_USERNAME=root -e DB_PASSWORD=root -e DB_NAME=photos ts-nest:latest

## PostGres

Postgres commands

### Connect locally

psql -h localhost

### Create Database

create database <dbName>

\c <dbName>

### Create user

create user root with encrypted password 'root';

### Grant priveleges to a user

grant all privileges on database photos to root;

### List all databases

\l

### List all tables

\dt
