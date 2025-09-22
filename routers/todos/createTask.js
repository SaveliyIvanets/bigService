const Task = require("../../models/tasksSchema");
const config = require("../../config.json");
async function createTask(req, res, next) {
  try {
    const error = new Error();
    if (!req.body || !req.body.title) {
      error.name = "UpdateError";
      error.message = "the data is incorrect";
      error.status = 400;
      return next(error);
    }
    const task = new Task({
      _id: config.tests ? req.body._id : undefined,
      title: req.body.title,
      description: req.body.description,
      completed: req.body.completed || false,
      createdAt: Date.now(),
    });
    await task.save();
    res.send("Save complete!");
  } catch (error) {
    next(error);
  }
}

module.exports = createTask;
