function createTask(Task) {
  return async function (req, res, next) {
    try {
      const error = new Error();
      if (!req.body || !req.body.title) {
        error.name = "UpdateError";
        error.message = "the data is incorrect";
        error.status = 400;
        return next(error);
      }
      const task = new Task({
        title: req.body.title,
        description: req.body.description,
        completed: req.body.completed || false, // обрабатывать null так или выкидывать ошибку ?
        createdAt: req.body.createdAt || Date.now(), // аналогично
      });
      await task.save();
      res.send("Save complete!");
    } catch (error) {
      next(error);
    }
  };
}
module.exports = createTask;
