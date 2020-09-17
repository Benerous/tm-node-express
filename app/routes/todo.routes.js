const express = require('express')
const routes = express.Router();
const todoController = require('../controllers/todo.controller');
// request validation
const { buildCheckFunction } = require('express-validator');
const checkBodyAndQuery = buildCheckFunction(['body', 'query']);

routes
    .get('/', todoController.getTodoList)
    .post('/', [
        checkBodyAndQuery('name').isString(),
        checkBodyAndQuery('description').optional().isString(),
        checkBodyAndQuery('done').optional().isBoolean()
      ], todoController.addTodoItem)
    .delete('/', [
        checkBodyAndQuery('id').isString().isLength({min:24, max:24})
      ], todoController.deleteTodoItem)
    .put('/', [
        checkBodyAndQuery('id').isString().isLength({min:24, max:24}),
        checkBodyAndQuery('done').optional().isBoolean()
      ], todoController.changeTodoItem)

module.exports = routes;
