const config = require("../../config.json");
const fabricModel = require("../../models/fabricModel");
const Task = fabricModel(config.databaseEngine);
const fabricRepository = require("../../repository/fabricRepository");
const repository = fabricRepository.giveRepository(config.databaseEngine, Task);
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
    await repository.create(task);
    res.send("Save complete!");
  } catch (error) {
    next(error);
  }
}

module.exports = createTask;
