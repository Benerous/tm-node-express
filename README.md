# Application
> REST API application to extract data about to-do list from local MongoDB. Can be used for client part application to CRUD data of to-do list, to-do items from list. Each item has unique 'name' (mandatory), 'description' (optional) and 'done' flag (true/false).

## Table of contents
* [General info](#general-info)
* [Technologies](#technologies)
* [Setup & Running](#setup-and-running)
* [Features](#features)
* [Contact](#contact)

## General info
Application based on Node.js REST API, where are declareted main requests which CRUD data from local data base. Would be useful for any to-do list application, where needed to store, edit or read data about to-do list and it's items from data base.

## Technologies
* REST API
* Node.js
* Express.js
* npm
* MongoDB, Mongoose
* joi (for validating mongoose's models)
* Jest & Supertest (for integration testing)

## Setup and running server
* To setup
```
git clone https://github.com/Benerous/tm-node-express.git
tm-node-express
npm install
```
* To run server
```
npm start
```
* To run tests
```
npm test
```

## Features
List of features:
* get to-do list (method: GET, url: '/api/todolist/', result: if list exists then shows all to-do items in DB)
* add new to-do item (method: POST, url:'/api/todolist/', body: { "name" (mandatory, unique), "description" (optional), "done": (true/false, optional) }, result: if task is created returns this task, name of task should be unique)
* remove to-do item (method: DELETE, url:'/api/todolist/?id=*todo-item-id*' (also possible to send id via body), result: removes to-do task with current ID from url or body, after that shows updated list of to-dos)
* mark done/undone to-do item (method: PUT, url:'/api/todolist/?id=*todo-item-id*&done=*true/false*' (also possible to send name and done via body), result: changes completeness of task with current ID, variable 'done' is optional, if is called without 'done' variable, changes completeness of task to opposite (false -> true, true -> false))

## To-do list of improvements:
* improving architecture of project
* additional validations of API requests
* full coverage with tests

## Contact
Created by [@benerous](https://github.com/Benerous) - feel free to contact me!