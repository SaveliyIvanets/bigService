const mongoose = require("mongoose");
function deleteTask(Task) {
  return async function (req, res, next) {
    try {
      const error = new Error();
      const id = req.params.id;
      if (!mongoose.Types.ObjectId.isValid(id)) {
        error.name = "DeleteError";
        error.message = "Invalid task ID";
        error.status = 400;
        return next(error);
      }
      const deletedTask = await Task.findByIdAndDelete(id);
      if (!deletedTask) {
        error.name = "NotFoundError";
        error.message = "Task not found";
        error.status = 404;
        return next(error);
      }
      res.send("Delete complete");
    } catch (err) {
      next(err);
    }
  };
}
module.exports = deleteTask;
