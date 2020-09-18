const request = require('supertest');
const app = require('../index');

const uniqid = require('uniqid');

const TodoItem = require('../models/todo.model');
async function lastItemOfTodoList() {
    const todoList = await TodoItem.find();
    return todoList[todoList.length - 1];
};

const notExistingId = "a00000000000000000000000";

describe("Getting list of to-do items", () => {
    const url = "/api/todolist/";
    test("It should response with todo list", done => {
        request(app)
        .get(url)
        .then(response => {
            expect(response.statusCode).toBe(200);
            expect(response.type).toBe("application/json");
            expect(response.body).toBeInstanceOf(Array);
            if (response.body.length > 0) {
                expect(response.body[0]).toBeInstanceOf(Object);
                expect(response.body[0]).toHaveProperty("_id");
                expect(response.body[0]).toHaveProperty("name");
                expect(response.body[0]).toHaveProperty("done");
            } else {
                expect(response.body).toHaveProperty("message");
                expect(response.body.message).toBe("There is nothing to be found ;(");
            }
            done();
        });
    });
});

describe("Sending wrong API Request", () => {
    const url = "/api/to-do-list/";
    test("It should response with error message 'Invalid API Request'", done => {
        request(app)
        .get(url)
        .then(response => {
            expect(response.statusCode).toBe(404);
            expect(response.type).toBe("application/json");
            expect(response.body).toBeInstanceOf(Object);
            expect(response.body).toHaveProperty("message");
            expect(response.body.message).toBe("Invalid API Request");
            done();
        });
    });
});

describe("Creating a new to-do item", () => {
    const url = "/api/todolist/";
    test("It should response with a new to-do item", done => {
        request(app)
        .post(url)
        .send({
            "name": `testing_${uniqid()}`
        })
        .then(response => {
            expect(response.statusCode).toBe(201);
            expect(response.type).toBe("application/json");
            expect(response.body).toBeInstanceOf(Object);
            expect(response.body).toHaveProperty("_id");
            expect(response.body).toHaveProperty("name");
            expect(response.body).toHaveProperty("done");
            done();
        });
    });
});

describe("Creating a new to-do item with the same name", () => {
    const url = "/api/todolist/";
    test("It should response with a new to-do item", done => {
        request(app)
        .post(url)
        .send({
            "name": `testing_0`
        })
        .then(response => {
            expect(response.statusCode).toBe(500);
            expect(response.type).toBe("application/json");
            expect(response.serverError).toBe(true);
            expect(response.body).toBeInstanceOf(Object);
            expect(response.body).toHaveProperty("message");
            expect(response.body.message).toBe("Task with such name is already in list! ;(");
            done();
        });
    });
});

describe("Deleting to-do item", () => {
    const url = "/api/todolist/";
    test("It should response with updated do-to list", async (done) => {
        const lastTodoItem = await lastItemOfTodoList();
        request(app)
        .delete(url)
        .send({
            "id": lastTodoItem._id
        })
        .then(response => {
            expect(response.type).toBe("application/json");
            if (response.body.length > 0) {
                expect(response.statusCode).toBe(200);
                expect(response.body).toBeInstanceOf(Array);
                expect(response.body[0]).toBeInstanceOf(Object);
                expect(response.body[0]).toHaveProperty("_id");
                expect(response.body[0]).toHaveProperty("name");
                expect(response.body[0]).toHaveProperty("done");
            } else {
                expect(response.statusCode).toBe(500);
                expect(response.body).toBeInstanceOf(Object);
                expect(response.body).toHaveProperty("message");
                expect(response.body.message).toBe("There is no such to-do item in list ;(");
            };
            done();
        });
    });
});

describe("Deleting not existing to-do item", () => {
    const url = "/api/todolist/";
    test("It should response with message 'There is no such to-do item in list ;('", done => {
        request(app)
        .delete(url)
        .send({
            "id": notExistingId
        })
        .then(response => {
            expect(response.statusCode).toBe(500);
            expect(response.type).toBe("application/json");
            expect(response.serverError).toBe(true);
            expect(response.body).toBeInstanceOf(Object);
            expect(response.body).toHaveProperty("message");
            expect(response.body.message).toBe("There is no such to-do item in list ;(");
            done();
        });
    });
});

describe("Updating to-do item with 'done' field", () => {
    const url = "/api/todolist/";
    test("It should response with updated do-to item", async (done) => {
        const lastTodoItem = await lastItemOfTodoList();
        request(app)
        .put(url)
        .send({
            "id": lastTodoItem._id,
            "done": true
        })
        .then(response => {
            expect(response.statusCode).toBe(200);
            expect(response.type).toBe("application/json");
            expect(response.body).toBeInstanceOf(Object);
            expect(response.body).toHaveProperty("_id");
            expect(response.body).toHaveProperty("name");
            expect(response.body).toHaveProperty("done");
            expect(response.body.done).toBe(true);
            done();
        });
    });
});

describe("Updating to-do item without 'done' field", () => {
    const url = "/api/todolist/";
    test("It should response with updated do-to item", async (done) => {
        const lastTodoItem = await lastItemOfTodoList();
        request(app)
        .put(url)
        .send({
            "id": lastTodoItem._id,
        })
        .then(response => {
            expect(response.statusCode).toBe(200);
            expect(response.type).toBe("application/json");
            expect(response.body).toBeInstanceOf(Object);
            expect(response.body).toHaveProperty("_id");
            expect(response.body).toHaveProperty("name");
            expect(response.body).toHaveProperty("done");
            done();
        });
    });
});

describe("Updating to-do item that not exist", async () => {
    const url = "/api/todolist/";
    test("It should response with message 'There is no such to-do item in list ;('", done => {
        request(app)
        .delete(url)
        .send({
            "id": notExistingId,
            "done": false
        })
        .then(response => {
            expect(response.statusCode).toBe(500);
            expect(response.type).toBe("application/json");
            expect(response.serverError).toBe(true);
            expect(response.body).toBeInstanceOf(Object);
            expect(response.body).toHaveProperty("message");
            expect(response.body.message).toBe("There is no such to-do item in list ;(");
            done();
        });
    });
});