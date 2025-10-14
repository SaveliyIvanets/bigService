const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const User = require('../../../database').models.User
const repositoryClass = require('../../../database').repository
const repository = new repositoryClass(User)
const SECRET = require('../../../config').JWT_SECRET

async function login(req, res, next) {
  const users = await repository.findAll()
  const error = new Error()
  for (const user of users) {
    if (
      user.username === req.body.username &&
      bcrypt.compare(user.passwordHash, req.body.password)
    ) {
      return res.status(200).json({
        id: user.id,
        username: user.username,
        token: jwt.sign({ id: user.id, username: user.username }, SECRET, {
          expiresIn: '1h',
        }),
      })
    }
  }
  error.name = 'authError'
  error.message = 'Not authorized'
  error.code = 404
  return next(error)
}
module.exports = login
