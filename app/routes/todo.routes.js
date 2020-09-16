const express = require('express')
const routes = express.Router();
const todoController = require('../controllers/todo.controller');

routes
    .get('/', todoController.getTodoList)
    .post('/', todoController.addTodoItem)
    .delete('/', todoController.deleteTodoItem)
    .put('/', todoController.changeTodoItem)

module.exports = routes;
