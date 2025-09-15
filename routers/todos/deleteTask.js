function deleteTask(Task) {
  return async function (req, res, next) {
    try {
      const id = req.params.id;
      await Task.findByIdAndDelete(id);
      res.send("Delete complete");
    } catch (err) {
      next(err);
    }
  };
}
module.exports = deleteTask;
