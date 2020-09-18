const TodoItem = require('../models/todo.model');

async function getTodoList() {
    const todoList = await TodoItem.find();
    return todoList.length ? todoList : {
        message: "There is nothing to be found ;("
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
    const id = req.query.id || req.body.id;
    return id;
}

async function changeTodoItem(req) {
    const id = req.query.id || req.body.id;
    let compliteness = req.query.done || req.body.done;
    if (compliteness === undefined) {
        compliteness = !((await TodoItem.findById(id))).done;
    }
    return {
        id: id,
        done: compliteness
    }
}

module.exports = {
    getTodoList: getTodoList,
    addTodoItem: addTodoItem,
    deleteTodoItem: deleteTodoItem,
    changeTodoItem: changeTodoItem
}
  