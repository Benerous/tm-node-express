const todoService = require('../services/todo.service');
// model, model validation
const modelValidator = require('../validators/todo.validator');
const TodoItem = require('../models/todo.model');
// request validation
const requestValidator = require('../validators/request.validator');

async function getTodoList(req, res, next){
    const reqNotValidated = requestValidator(req);
    if (reqNotValidated) {
        return next(reqNotValidated);
    }
    try {
        const returnFromService = await todoService.getTodoList();
        return res.status(200).send(returnFromService);
    } catch(err) {
        next(err);
    }
};

async function addTodoItem(req, res, next){
    const reqNotValidated = requestValidator(req);
    if (reqNotValidated) {
        return next(reqNotValidated);
    }
    try {
        const returnFromService = await modelValidator(todoService.addTodoItem(req, res, next));
        const todoItem = new TodoItem(returnFromService);
        const newItem = await todoItem.save()
        return res.status(201).send(newItem);
    } catch(err) {
        next(err);
    }
};

async function deleteTodoItem(req, res, next){
    const reqNotValidated = requestValidator(req);
    if (reqNotValidated) {
        return next(reqNotValidated);
    }
    try {
        const returnFromService = todoService.deleteTodoItem(req);
        const todoItem = await TodoItem.findById(returnFromService);
        if (!todoItem) {
            const err = new Error("There is no such to-do item in list ;(");
            return next(err);
        }
        await todoItem.remove();
        return res.status(200).send(await TodoItem.find());
    } catch(err) {
        next(err);
    }
};

async function changeTodoItem(req, res, next){
    const reqNotValidated = requestValidator(req);
    if (reqNotValidated) {
        return next(reqNotValidated);
    }
    try {
        const returnFromService = await todoService.changeTodoItem(req);
        const { id, done } = returnFromService;
        const updatedItem = await TodoItem.findByIdAndUpdate(id, { "done": done }, { new: true });
        if (!updatedItem) {
            const err = new Error("There is no such to-do item in list ;(");
            return next(err);
        }
        return res.status(200).send(updatedItem);
    } catch(err) {
        next(err);
    }
};

module.exports = {
    getTodoList: getTodoList,
    addTodoItem: addTodoItem,
    deleteTodoItem: deleteTodoItem,
    changeTodoItem: changeTodoItem
};
  