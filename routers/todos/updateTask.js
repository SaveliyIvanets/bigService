function fullUpdateTask(Task) {
  return async function (req, res, next) {
    try {
      if (!req.body || !req.body.title) {
        throw new Error(); // fix придумать нормальную ошибку
      }
      const id = req.params.id;
      await Task.findByIdAndUpdate(id, {
        title: req.body.title,
        description: req.body.description,
        completed: req.body.completed,
        createdAt: req.body.createdAt,
      });
      res.send("Update complete");
    } catch (err) {
      next(err);
    }
  };
}
function partialUpdateTask(Task) {
  return async function (req, res, next) {
    try {
      const id = req.params.id;
      await Task.findByIdAndUpdate(id, {
        title: req.body.title,
        description: req.body.description,
        completed: req.body.completed,
        createdAt: req.body.createdAt,
      });
      res.send("Update complete");
    } catch (err) {
      next(err);
    }
  };
}
module.exports = { fullUpdateTask, partialUpdateTask };
