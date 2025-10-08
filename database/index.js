const sequelize = require('./sequelize')

const models = {
  Task: require('./models/task'),
}
const repository = require('./repository/sequelizeRepository')
const initDb = async () => {
  try {
    await sequelize.authenticate()

    // Для примера, применяем тут ранее описанные в моделях связи
    // for (const title of Object.keys(sequelize.models)) {
    //   const model = sequelize.models(title)
    //   if (model.associate) model.associate()
    // }

    // Можно допустим запустить воркер, который сделает миграцию БД и так далее

    await sequelize.sync()
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
