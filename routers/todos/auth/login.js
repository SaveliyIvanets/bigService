const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const User = require('../../../database').models.User
const repositoryClass = require('../../../database').repository
const repository = new repositoryClass(User)
const SECRET = require('../../../config').JWT_SECRET

async function login(req, res, next) {
  const username = req.body.username
  const password = req.body.password
  const error = new Error()
  error.name = 'authError'
  error.message = 'Not authorized'
  error.status = 401
  if (!username || !password) {
    error.message = 'the data is incorrect'
    error.status = 400
    return next(error)
  }
  const users = await repository.findAll()
  for (const user of users) {
    if (
      user.username === username &&
      (await bcrypt.compare(password, user.passwordHash))
    ) {
      return res.status(200).json({
        id: user.id,
        username: user.username,
        token: jwt.sign({ id: user.id, username: user.username }, SECRET, {
          expiresIn: '1h',
        }),
      })
    } else if (user.username === username) {
      error.message = 'Invalid username or password'
      break
    }
  }
  return next(error)
}
module.exports = login
