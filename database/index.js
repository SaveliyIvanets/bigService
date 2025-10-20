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

    let adminRole = null
    let userRole = null
    let admin = null
    try {
      adminRole = await roleRepository.findOne({ role: 'admin' })
      userRole = await roleRepository.findOne({ role: 'user' })
      admin = await userRepository.findOne({ username: 'admin' })
    } catch (e) {
      console.error(e)
    }

    if (!adminRole) {
      adminRole = await roleRepository.create({ role: 'admin' })
    }

    if (!userRole) {
      userRole = await roleRepository.create({ role: 'user' })
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
