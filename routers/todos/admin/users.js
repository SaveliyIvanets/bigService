const User = require('../../../database').models.User
const repositoryClass = require('../../../database').repository
const userRepository = new repositoryClass(User)

async function showUsers(req, res, next) {
  const complete = req.query.complete
  const sorted = req.query.sorted
  const limit = req.query.limit || 20
  const offset = req.query.offset || 0
  const filtr = complete === undefined ? {} : { completed: complete }
  const users = await userRepository.findAll(
    filtr,
    limit,
    offset,
    'createdAt',
    sorted
  )
  res.json(users)
}
module.exports = showUsers
