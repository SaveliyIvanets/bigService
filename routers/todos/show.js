const Task = require('../../database').models.Task
const repositoryClass = require('../../database').repository
const repository = new repositoryClass(Task)
async function findTaskById(req, res, next) {
  const error = new Error()
  error.name = 'Forbidden'
  error.message = 'Access denied, no required permissions'
  error.code = 403
  if (req.user.role !== 'admin') {
    return next(error)
  }
  const id = req.params.id
  const task = await repository.findById(id)
  res.json(task)
}
module.exports = findTaskById
