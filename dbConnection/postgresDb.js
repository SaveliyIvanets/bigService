const Sequelize = require("sequelize");
const config = require("../config.json");

module.exports = new Sequelize(
  config.postgresql.dbname,
  config.postgresql.username,
  config.postgresql.password,
  {
    dialect: config.postgresql.dialect,
  }
);
