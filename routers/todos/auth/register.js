const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const User = require('../../../database').models.User
const repositoryClass = require('../../../database').repository
const repository = new repositoryClass(User)
const SECRET = require('../../../config').JWT_SECRET

async function register(req, res, next) {
  const error = new Error()
  if (req.body.username === undefined || req.body.password === undefined) {
    error.name = 'registrationError'
    error.message =
      'the data is incorrect : the password and username must be specified'
    error.status = 400
    return next(error)
  }
  const passwordHash = await bcrypt.hash(req.body.password, 10)
  const user = await repository.create({
    username: req.body.username,
    passwordHash,
  })
  const token = jwt.sign({ id: user.id, username: user.username }, SECRET, {
    expiresIn: '1h',
  })
  res.status(201).json({ token })
}

module.exports = register
