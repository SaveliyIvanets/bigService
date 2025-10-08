const { Model, DataTypes } = require('sequelize')
const sequelize = require('../sequelize')

class Task extends Model {}

Task.init(
  {
    id: {
      type: DataTypes.UUID, // для id лучше всего использовать UUIDv4, вместо INTEGER + autoIncrement
      primaryKey: true,
      allowNull: false,
      defaultValue: DataTypes.UUIDV4,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.STRING,
    },
    completed: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
  },
  {
    //сюда необходимо передать экземпляр класса, который мы создаём в зависимости от выбранной БД
    sequelize,
    modelName: 'task',
  }
)

// тут же мы можем описывать ассоциации/связи от этой модели к другим
// для примера:

// Task.associate = async function () {
//   const models = this.sequelize.models

//   this.hasOne(models.test, {
//     foreignKey: 'testId',
//     onDelete: 'SET NULL'
//   })
// }

module.exports = Task
