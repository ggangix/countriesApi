# Countries API

This API is used to get and update countries data like name and code. This rest api is using JWT token to authenticate the user.

## Env Variables

Create a file called .env with the following variables:

    MONGODB_URI= # MongoDB URI (e.g. mongodb://localhost:27017/countries-api)
    PORT= # Port to run the server on (e.g. 3000)
    JWT_SECRET= # Secret for JWT (e.g. 'secret')
    JWT_EXPIRY= # Expiry time for JWT (e.g. '86400')

## Initial Data

There is an initialData.js file in the root of the project. This file is used to populate the database with initial data on server start for testing purposes.

## Run the server

    npm intall
    npm start

## Test the server

    npm test

## Endpoints

### Countries

| method | path              | description            |
| ------ | ----------------- | ---------------------- |
| GET    | /countries        | Get all countries      |
| GET    | /countries/{code} | Get country by code    |
| PUT    | /countries/{code} | Update country by code |
| DELETE | /countries/{code} | Delete country by code |
| POST   | /countries        | Create new country     |

### User

| method | path              | description            |
| ------ | ----------------- | ---------------------- |
| POST   | /users/register   | Create new user        |
| POST   | /users/login      | Login user             |

### Auxiliary parameters

| parameter | description                   | default value |
| --------- | ----------------------------- | ------------- |
| limit     | Number of countries to return | returns all   |
| page      | Page number                   | 1             |
| sort      | Sort by field (name, code)    | code          |
| order     | Order by (asc, desc)          | asc           |
