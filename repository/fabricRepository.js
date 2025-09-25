const mongoRepository = require("./mongoRepository");
const postgresRepository = require("./postgresRepository");
const liteRepository = require("./liteRepository");

class fabricRepository {
  static giveRepository(databaseEngine, model) {
    const repositories = {
      mongo: new mongoRepository(model),
      postgres: new postgresRepository(model),
      lite: new liteRepository(model),
    };
    const repository = repositories[databaseEngine];
    if (!repository) {
      throw new Error(`Unsupported database type: ${databaseEngine}`);
    }
    return repository;
  }
}
module.exports = fabricRepository;
