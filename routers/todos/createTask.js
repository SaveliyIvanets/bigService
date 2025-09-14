function createTask(Task) {
  return async function (req, res, next) {
    try {
      if (!req.body || !req.body.title) {
        throw new Error(); // fix придумать нормальную ошибку
      }

      const task = new Task({
        title: req.body.title,
        description: req.body.description, //fix разобраться с необязательными полями
        completed: req.body.completed,
        createdAt: req.body.createdAt,
      });
      await task.save();
      res.send("Save complete!");
    } catch (err) {
      next(err);
    }
  };
}
module.exports = createTask;
