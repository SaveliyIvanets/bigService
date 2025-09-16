const mongoose = require("mongoose");
function errorUpdate(Task) {
  return async function (req, res, next) {
    const error = new Error();
    const id = req.params.id;
    if ((!req.body || !req.body.title) && req.method === "PUT") {
      error.name = "UpdateError";
      error.message = "the data is incorrect";
      error.status = 400;
      return next(error);
    }
    if (!mongoose.Types.ObjectId.isValid(id)) {
      error.name = "UpdateError";
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
    next();
  };
}

function updateTask(Task) {
  return async function (req, res, next) {
    try {
      const id = req.params.id;
      const updateData = {
        title: req.body.title,
        description: req.body.description,
        completed: req.body.completed,
        createdAt: req.body.createdAt,
      };
      await Task.findByIdAndUpdate(id, updateData, {
        new: true,
        runValidators: true,
      });
      res.send("Update complete");
    } catch (error) {
      console.log(error.name);
      if (error.name === "ValidationError") {
        return next({
          name: "ValidationError",
          status: 400,
          message: "Validation failed",
        });
      }
      if (error.name === "CastError") {
        return next({
          name: "CastError",
          status: 400,
          message: error.message,
        });
      }
      next(error);
    }
  };
}
module.exports = { updateTask, errorUpdate };
