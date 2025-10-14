const sequelize = require('./sequelize')
const bcrypt = require('bcrypt')

const models = {
  Task: require('./models/task'),
  User: require('./models/user'),
  Role: require('./models/role'),
}
const repository = require('./repository/sequelizeRepository')
const initDb = async () => {
  try {
    await sequelize.authenticate()

    for (const title of Object.keys(models)) {
      console.log(models[title].associate)
      const model = models[title]
      if (model.associate) model.associate(models)
    }
    await sequelize.sync()

    const userRepository = new repository(models.User)
    const roleRepository = new repository(models.Role)

    const users = await userRepository.findAll()
    const roles = await roleRepository.findAll()

    let adminRole = null
    let userRole = null
    let admin = null

    for (const role of roles) {
      if (role.role === 'admin') {
        adminRole = role
      } else if (role.role === 'user') {
        userRole = role
      }
    }

    if (!adminRole) {
      adminRole = await roleRepository.create({ role: 'admin' })
    }

    if (!userRole) {
      userRole = await roleRepository.create({ role: 'user' })
    }
    for (const user of users) {
      if (user.username === 'admin') {
        admin = user
        break
      }
    }
    if (!admin) {
      const adminHashPassword = await bcrypt.hash('admin', 10)
      admin = {
        username: 'admin',
        passwordHash: adminHashPassword,
        roleId: adminRole.id,
      }
      await userRepository.create(admin)
    }
  } catch (err) {
    throw err
  }
}

module.exports = {
  initDb,
  models,
  dbConnection: sequelize,
  repository,
}
