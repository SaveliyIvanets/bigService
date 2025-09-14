const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const tasksSchema = new Schema({
  title: { type: String, required: true },
  description: { type: String, required: false }, // понимаю, что оно по умолчанию false, но мне кажется,что явно указать это не будет лишним
  completed: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now }, // fix Date.now
});
const Task = mongoose.model("Task", tasksSchema);
module.exports = Task;
