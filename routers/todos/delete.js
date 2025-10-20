const { Task } = require('../../database').models
const { repository: repositoryClass } = require('../../database')
const repository = new repositoryClass(Task)

async function deleteTask(req, res, next) {
  await repository.delete(req.params.id)
  res.send('Delete complete')
}

module.exports = deleteTask
