const config = require("../../config.json");
const fabricModel = require("../../models/fabricModel");
const Task = fabricModel(config.databaseEngine);
const fabricRepository = require("../../repository/fabricRepository");
const repository = fabricRepository.giveRepository(config.databaseEngine, Task);

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
