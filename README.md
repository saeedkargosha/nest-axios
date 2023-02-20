# Nest.js + RabbitMQ + MongoDB + Sendgrid + Axios.

This project is built with Nest.js and utilizes RabbitMQ, MongoDB, Sendgrid, and Axios.

## Prerequisites

Before you begin, ensure you have met the following requirements:

- Node.js
- Docker
- Docker Compose
- A Sendgrid API key
- Postman

## Installation

To install dependencies, run the following command:

```
yarn install
```

## Docker Compose

To run the project with MongoDB and RabbitMQ, run the following commands:

```
docker-compose -f ./docker-compose.db.yml up
docker-compose -f ./docker-compose.rabbitMQ.yml up
```

## Running the Application

To run the application in development mode, use the following command:

```
yarn start:dev
```

## RabbitMQ

This project utilizes RabbitMQ for message queuing. To use RabbitMQ, you will need to set up a RabbitMQ server and configure the application to use it. You can view the RabbitMQ interface by visiting http://localhost:15672 in your web browser.

More details on how to set up and configure RabbitMQ can be found in the project code.

## Sendgrid

This project utilizes Sendgrid for sending emails. To use Sendgrid, you will need to set up a Sendgrid account and obtain an API key. You can then configure the application to use the API key. More details on how to do this can be found in the project code.
