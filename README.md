# ShortLink

A URL Shortener service based on Node.js, Express, MongoDB/Mongoose and Typescript.

Endpoints exposed include:

- Encode URL (_/encode_) : Encodes a URL to a shortened URL
- Decode URL (_/decode/:hash_) : Decodes a shortened URL to it's original URL
- Decode URL (_/:hash_) : Decoding a shortened URL and redirect to original URL
- Statistic (_/statistic/:urlpath_) : Return basic stat of a short URL path

## Requirements

[NodeJS](https://nodejs.org/en/)

Install global TypeScript and TypeScript Node (incase you don't have it installed on your machine)

```
npm install -g typescript ts-node
```

[Docker](https://docs.docker.com/get-docker/)

The project has also been setup and configured to be run on any machine via docker. Install [Docker](https://docs.docker.com/get-docker/) on your local machine.

[MongoDB](https://docs.mongodb.com/manual/administration/install-community/)

Install Mongo DB Community Edition on your local machine, and manage collections via MongoDB Compass GUI [MongoDB Compass](https://www.mongodb.com/try/download/compass)

## Clone this repository

```
git clone git@github.com:phalconVee/url-shortner-service.git
```

Navigate to the folder where you will notice, the project is divided into backend and frontend. Most of the work is on the backend, the frontend is just to provide a user interface around consuming the service.

In the folder, load up the service and the frontend app by running a simple command on your terminal

```
docker compose up
```

## Consideration for Testing

The default URL for backend service: _http://localhost:3001_
The default URL for frontend app: _http://localhost:3000_

API documentation is available on [POSTMAN](https://documenter.getpostman.com/view/3832128/UUxtGWgb).
You can as well find the exported postman collection in the root folder.

The project has been setup to use Jest for unit testing and supertest for integration testing and MongoDB-memory-server that allows us to start a mongod process that stores data in memory.

The MongoDB-in Memory Server was used to simulate how to test dummy data will be saved into your real database. Basically providing a layer to store data in memory only during tests.
