const todoService = require('../services/todo.service');
const validator = require('../models/todo.validator');
const TodoItem = require('../models/todo.model');

async function getTodoList(req, res, next){
    try {
        const returnFromService = await todoService.getTodoList();
        return res.status(200).send(returnFromService);
    } catch(err) {
        next(err);
    }
}

async function addTodoItem(req, res, next){
    try {
        const returnFromService = await validator(todoService.addTodoItem(req, res, next));
        const todoItem = new TodoItem(returnFromService);
        const newItem = await todoItem.save()
        return res.status(200).send(newItem);
    } catch(err) {
        next(err);
    }
}

async function deleteTodoItem(req, res, next){
    try {
        const returnFromService = todoService.deleteTodoItem(req);
        const todoItem = await TodoItem.findById(returnFromService);
        await todoItem.remove();
        return res.status(200).send(await TodoItem.find());
    } catch(err) {
        next(err);
    }
}

async function changeTodoItem(req, res, next){
    try {
        const returnFromService = await todoService.changeTodoItem(req);
        const { id, done } = returnFromService;
        const updatedItem = await TodoItem.findByIdAndUpdate(id, { "done": done }, { new: true });
        return res.status(200).send(updatedItem);
    } catch(err) {
        next(err);
    }
}

module.exports = {
    getTodoList: getTodoList,
    addTodoItem: addTodoItem,
    deleteTodoItem: deleteTodoItem,
    changeTodoItem: changeTodoItem
  }
  