const mongoose = require("mongoose");
function findAllTasks(Task) {
  return async function (req, res, next) {
    try {
      const complete = req.query.complete;
      const sorted = req.query.sort;
      const filtr = complete === undefined ? {} : { completed: complete };
      let tasks = await Task.find(filtr); // пагинацию сделать
      tasks = sorted
        ? tasks.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)) // сделать сортировку на стороне бд
        : tasks;
      res.json(tasks);
    } catch (err) {
      next(err);
    }
  };
}
function findTaskById(Task) {
  return async function (req, res, next) {
    try {
      const error = new Error();
      const id = req.params.id;
      if (!mongoose.Types.ObjectId.isValid(id)) {
        error.name = "FindError";
        error.message = "Invalid task ID";
        error.status = 400;
        return next(error);
      }
      const task = await Task.findById(id);
      if (!task) {
        error.name = "NotFoundError";
        error.message = "Task not found";
        error.status = 404;
        return next(error);
      }
      res.json(task);
    } catch (err) {
      next(err);
    }
  };
}
module.exports = { findAllTasks, findTaskById };
