const Task = require('../../database').models.Task
const repositoryClass = require('../../database').repository
const repository = new repositoryClass(Task)
async function findTaskById(req, res, next) {
  const id = req.params.id
  const task = await repository.findById(id)
  res.json(task)
}
module.exports = findTaskById
