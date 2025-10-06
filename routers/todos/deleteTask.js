const config = require("../../config/configuration");
const fabricModel = require("../../models/fabricModel");
const Task = fabricModel(config.db.databaseEngine);
const fabricRepository = require("../../repository/fabricRepository");
const repository = fabricRepository.giveRepository(
  config.db.databaseEngine,
  Task
);

async function deleteTask(req, res, next) {
  try {
    const id = req.params.id;
    await repository.delete(id);
    res.send("Delete complete");
  } catch (err) {
    next(err);
  }
}

module.exports = deleteTask;
