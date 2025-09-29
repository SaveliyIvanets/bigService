const dbs = {
  postgres: require("../dbConnection/postgresDb"),
  lite: require("../dbConnection/liteDb"),
};
const config = require("../config.json");
const sequelize =
  dbs[config.databaseEngine] || require("../dbConnection/postgresDb");
const Sequelize = require("sequelize");
const Task = sequelize.define(
  "tasks",
  {
    id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false,
    },
    title: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    description: {
      type: Sequelize.STRING,
    },
    completed: {
      type: Sequelize.BOOLEAN,
      defaultValue: false,
    },
    createdAt: {
      type: Sequelize.DATE,
      defaultValue: Sequelize.NOW,
    },
  },
  {
    timestamps: false,
  }
);
module.exports = Task;
