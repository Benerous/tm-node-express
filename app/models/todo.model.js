const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const todoItemSchema = new Schema(
    {
      name: { type: String, required: true, unique: true },
      description: { type: String },
      done: { type: Boolean, default: false, required: true },
    },
    {
      timestamps: true,
    }
);

module.exports = mongoose.model('TodoItem', todoItemSchema);
