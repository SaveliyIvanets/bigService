const Sequelize = require("sequelize");
const config = require("../config/configuration");

module.exports = new Sequelize(
  config.db.postgresql.dbname,
  config.db.postgresql.username,
  config.db.postgresql.password,
  {
    dialect: config.db.postgresql.dialect,
  }
);
