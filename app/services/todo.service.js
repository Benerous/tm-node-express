const e = require('express');
const TodoItem = require('../models/todo.model');

async function getTodoList() {
    const todoList = await TodoItem.find();
    return todoList.length ? todoList : {
        message: "There is nothing to be done ;("
    };
}

function addTodoItem(req) {
    const { name, description, done } = req.body;
    return {
        name: name,
        description: description,
        done: done || false
    };
}

function deleteTodoItem(req) {
    const id = req.query.id;
    return id;
}

async function changeTodoItem(req) {
    const id = req.query.id;
    const done = req.query.done || !((await TodoItem.findById(id))).done;
    return {
        id: id,
        done: done
    }
}

module.exports = {
    getTodoList: getTodoList,
    addTodoItem: addTodoItem,
    deleteTodoItem: deleteTodoItem,
    changeTodoItem: changeTodoItem
}
  