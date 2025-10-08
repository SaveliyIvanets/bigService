const Task = require('../../database').models.Task
const repositoryClass = require('../../database').repository
const repository = new repositoryClass(Task)

async function updateTask(req, res, next) {
  const error = new Error()
  if ((!req.body || !req.body.title) && req.method === 'PUT') {
    error.name = 'UpdateError'
    error.message = 'the data is incorrect'
    error.status = 400
    return next(error)
  }
  const id = req.params.id
  const updateData = {
    title: req.body.title,
    description: req.body.description,
    completed: req.body.completed,
    createdAt: req.body.createdAt,
  }

  await repository.update(id, updateData)

  res.send('Update complete')
}

module.exports = updateTask
