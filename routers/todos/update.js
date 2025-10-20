const { Task } = require('../../database').models
const { repository: repositoryClass } = require('../../database')
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
  }

  await repository.update(id, updateData)

  res.send('Update complete')
}

module.exports = updateTask
