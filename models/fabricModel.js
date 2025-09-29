const models = {
  mongo: require("./mongoTasksModel"),
  postgres: require("./sequelizeTasksModel"),
  lite: require("./sequelizeTasksModel"),
};
function fabricModel(databaseEngine) {
  return models[databaseEngine] || null;
}
module.exports = fabricModel;
