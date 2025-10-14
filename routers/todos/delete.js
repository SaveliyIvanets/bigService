const Task = require('../../database').models.Task
const repositoryClass = require('../../database').repository
const repository = new repositoryClass(Task)

async function deleteTask(req, res, next) {
  await repository.delete(id)
  res.send('Delete complete')
}

module.exports = deleteTask
