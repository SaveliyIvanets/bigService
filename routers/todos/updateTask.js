const mongoose = require("mongoose");
const config = require("../../config.json");
const fabricModel = require("../../models/fabricModel");
const Task = fabricModel(config.databaseEngine);
const fabricRepository = require("../../repository/fabricRepository");
const repository = fabricRepository.giveRepository(config.databaseEngine, Task);
async function updateTask(req, res, next) {
  try {
    const error = new Error();
    if ((!req.body || !req.body.title) && req.method === "PUT") {
      error.name = "UpdateError";
      error.message = "the data is incorrect";
      error.status = 400;
      return next(error);
    }
    const id = req.params.id;
    const updateData = {
      title: req.body.title,
      description: req.body.description,
      completed: req.body.completed,
      createdAt: req.body.createdAt,
    };

    await repository.update(id, updateData);

    res.send("Update complete");
  } catch (error) {
    next(error);
  }
}

module.exports = { updateTask };
