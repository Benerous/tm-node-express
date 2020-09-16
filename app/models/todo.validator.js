const Joi = require('joi');
const TodoItem = require('../models/todo.model');

const schema = Joi.object({
    name: Joi.string()
        .min(3)
        .max(40)
        .required(),

    description: Joi.string()
        .min(3)
        .max(100),

    done: Joi.boolean()
        .required(),
})
    .with('name', 'done');

const validationHandler = async (schemaObject) => {
    const todoItem = await TodoItem.findOne({ name: schemaObject.name });
    if (!todoItem) {
        const validated = await schema.validateAsync(schemaObject);
    return validated;
    } else {
        throw new Error("Task with such name is already in list! ;(");
    }
};

module.exports = validationHandler;