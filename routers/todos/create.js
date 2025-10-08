const config = require('../../config')
const Task = require('../../database').models.Task
const repositoryClass = require('../../database').repository
const repository = new repositoryClass(Task)
async function createTask(req, res, next) {
  const error = new Error()
  if (!req.body || !req.body.title) {
    error.name = 'UpdateError'
    error.message = 'the data is incorrect'
    error.status = 400
    return next(error)
  }
  const task = {
    _id: config.tests ? req.body._id : undefined,
    title: req.body.title,
    description: req.body.description,
    completed: req.body.completed || false,
    createdAt: Date.now(),
  }
  await repository.create(task)
  res.send('Save complete!')
}

module.exports = createTask
