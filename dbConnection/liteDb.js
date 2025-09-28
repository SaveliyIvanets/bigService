const Sequelize = require("sequelize");
const config = require("../config.json");

module.exports = new Sequelize({
  dialect: config.sqlite.dialeect,
  storage: config.sqlite.storage,
});
