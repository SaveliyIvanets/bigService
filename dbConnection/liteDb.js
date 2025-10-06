const Sequelize = require("sequelize");
const config = require("../config/configuration");

module.exports = new Sequelize({
  dialect: config.db.sqlite.dialect,
  storage: config.db.sqlite.storage,
});
