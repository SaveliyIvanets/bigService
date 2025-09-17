const mongoose = require("mongoose");
function updateTask(Task) {
  return async function (req, res, next) {
    try {
      const error = new Error();
      if ((!req.body || !req.body.title) && req.method === "PUT") {
        error.name = "UpdateError";
        error.message = "the data is incorrect";
        error.status = 400;
        return next(error);
      }
      const id = req.params.id;
      if (!mongoose.Types.ObjectId.isValid(id)) {
        error.name = "UpdateError";
        error.message = "Invalid task ID";
        error.status = 400;
        return next(error);
      }
      console.log(req.body.completed);
      const updateData = {
        title: req.body.title,
        description: req.body.description,
        completed: req.body.completed,
        createdAt: req.body.createdAt,
      };

      const task = await Task.findByIdAndUpdate(id, updateData, {
        new: true,
        runValidators: true,
      });
      if (!task) {
        error.name = "NotFoundError";
        error.message = "Task not found";
        error.status = 404;
        return next(error);
      }
      res.send("Update complete");
    } catch (error) {
      next(error);
    }
  };
}
module.exports = { updateTask };
