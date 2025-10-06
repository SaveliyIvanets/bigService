const config = require("../../config/configuration");
const fabricModel = require("../../models/fabricModel");
const Task = fabricModel(config.db.databaseEngine);
const fabricRepository = require("../../repository/fabricRepository");
const repository = fabricRepository.giveRepository(
  config.db.databaseEngine,
  Task
);
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
    const task = await repository.findById(id);
    res.json(task);
  } catch (err) {
    next(err);
  }
}

module.exports = { findAllTasks, findTaskById };
