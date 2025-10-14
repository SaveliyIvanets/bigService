const User = require('../../../database').models.User
const repositoryClass = require('../../../database').repository
const userRepository = new repositoryClass(User)
async function deleteUser(req, res, next) {
  const error = new Error()
  error.name = 'Forbidden'
  error.message = 'Access denied, no required permissions'
  error.code = 403
  if (req.user.role !== 'admin') {
    return next(error)
  }
  const id = req.params.id
  await userRepository.delete(id)
  res.send('Delete complete')
}
module.exports = deleteUser
