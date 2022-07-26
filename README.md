# RabbitMQ-Microservices
## Description
This repository contains 3 microservices that connect each other through HTTP request and messages' queues. The *User* API contains the information about the users (nickname, fullname, age, attendances number, attendances list), this API is connected with PostgreSQL throught TypeORM and runs with Node, Express and TypeScript. It's folder structure is based on onion architecture to lose database coupling and remark that the application core is the business domain. The *Attendance* API stores the information about all user's attendances (user id, start time, end time, date, notes), this API is connected with MongoDB throught TypeORM and runs with Node, Express and TypeScript. An attendance can be only created when a user asociated exists and updates the attedances number and list. Finally, the *Stats* service works as a third-party service that updates the number of attendances when an attendance is created or deleted, this service does not store anything and runs the RabbitMQ server.
## Installation
First, [RabbitMQ](https://www.rabbitmq.com/download.html) must be installed in your local machine or runned as a docker container. Also, is important to have [NPM](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm) installed. Then you can clone the reporsitory and for each folder have to run the command `npm install`, and then `npm serve`. *User* runs in port **3000**, *Attendance* runs in port **3001** and *Stats* runs in port **3002**.
