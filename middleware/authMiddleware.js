const jwt = require('jsonwebtoken')
const SECRET = require('../config').JWT_SECRET
const Role = require('../database').models.Role
const User = require('../database').models.User
const repositoryClass = require('../database').repository
const roleRepository = new repositoryClass(Role)
const userRepository = new repositoryClass(User)

module.exports = (req, res, next) => {
  const authHeader = req.headers.authorization
  const error = new Error()
  error.name = 'Unauthorized'
  error.message = 'the token is missing'
  error.status = 401
  if (!authHeader) {
    return next(error)
  }
  const token = authHeader.split(' ')[1]
  jwt.verify(token, SECRET, async (err, payload) => {
    if (err) {
      error.message = 'the token is invalid'
      return next(error)
    }
    const user = await userRepository.findById(payload.id)
    try {
      const role = await roleRepository.findById(user.roleId)
      user.role = role.role
    } catch (e) {}

    req.user = user
    next()
  })
}
