const models = {
  mongo: require("./mongoTasksModel"),
  postgres: require("./postgresTasksModel"),
  lite: require("./liteTasksModel"),
};
function fabricModel(databaseEngine) {
  return models[databaseEngine] || null;
}
module.exports = fabricModel;
