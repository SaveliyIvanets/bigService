const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const tasksSchema = new Schema({
  title: { type: String, required: true },
  description: { type: String },
  completed: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now }, // fix Date.now
});
const Task = mongoose.model("Task", tasksSchema);
module.exports = Task;
