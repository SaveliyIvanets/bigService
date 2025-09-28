const mongoose = require("mongoose");
const config = require("../../config.json");
const fabricModel = require("../../models/fabricModel");
const Task = fabricModel(config.databaseEngine);
const fabricRepository = require("../../repository/fabricRepository");
const repository = fabricRepository.giveRepository(config.databaseEngine, Task);
async function findAllTasks(req, res, next) {
  try {
    const complete = req.query.complete;
    const sorted = req.query.sorted;
    const limit = req.query.limit || 20;
    const offset = req.query.offset || 0;
    const filtr = complete === undefined ? {} : { completed: complete };
    const tasks = await repository.findAll(
      filtr,
      limit,
      offset,
      "createdAt",
      sorted
    );
    res.json(tasks);
  } catch (err) {
    next(err);
  }
}

async function findTaskById(req, res, next) {
  try {
    const error = new Error();
    const id = req.params.id;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      error.name = "FindError";
      error.message = "Invalid task ID";
      error.status = 400;
      return next(error);
    }
    const task = await repository.findById(id);
    res.json(task);
  } catch (err) {
    next(err);
  }
}

module.exports = { findAllTasks, findTaskById };
