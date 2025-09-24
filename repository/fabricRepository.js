const mongoRepository = require("./mongoRepository");
const postgresRepository = require("./postgresRepository");
const liteRepository = require("./liteRepository");

class fabricRepository {
  static giveRepository(databaseEngine) {
    const repositories = {
      mongo: new mongoRepository(),
      postgres: new postgresRepository(),
      lite: new liteRepository(),
    };
    const repository = repositories[databaseEngine];
    if (!repository) {
      throw new Error(`Unsupported database type: ${databaseEngine}`);
    }
    return repository;
  }
}
