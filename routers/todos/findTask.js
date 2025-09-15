function findAllTasks(Task) {
  return async function (req, res, next) {
    try {
      const tasks = await Task.find({});
      res.json(tasks);
    } catch (err) {
      next(err);
    }
  };
}
function findTaskById(Task) {
  return async function (req, res, next) {
    try {
      const id = req.params.id;
      const task = await Task.findById(id);
      res.json(task);
    } catch (err) {
      next(err);
    }
  };
}
module.exports = { findAllTasks, findTaskById };
