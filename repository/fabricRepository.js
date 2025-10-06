const sequelizeRepository = require("./sequelizeRepository");

class fabricRepository {
  static giveRepository(databaseEngine, model) {
    const repositories = {
      postgres: new sequelizeRepository(model),
      lite: new sequelizeRepository(model),
    };
    return repositories[databaseEngine] || null;
  }
}
module.exports = fabricRepository;
