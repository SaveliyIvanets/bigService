const mongoRepository = require("./mongoRepository");
const sequelizeRepository = require("./sequelizeRepository");

class fabricRepository {
  static giveRepository(databaseEngine, model) {
    const repositories = {
      mongo: new mongoRepository(model),
      postgres: new sequelizeRepository(model),
      lite: new sequelizeRepository(model),
    };
    return repositories[databaseEngine] || null;
  }
}
module.exports = fabricRepository;
