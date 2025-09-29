const mongoose = require("mongoose");
const config = require("../config.json");
const dbs = {
  postgres: require("./postgresDb"),
  lite: require("./liteDb"),
};
const dbConnections = {
  mongo: () => mongoose.connect(config.mongodb.uri),
  postgres: () => dbs.postgres.authenticate(),
  lite: () => dbs.lite.authenticate(),
};

async function fabricConnection(databaseEngine) {
  const sequelize = dbs[databaseEngine];
  const connect = dbConnections[databaseEngine];
  if (!connect) {
    throw new Error(`Unsupported DB: ${databaseEngine}`);
  }
  await connect();
  if (databaseEngine !== "mongo") {
    await sequelize.sync({ alter: true });
  }
  console.log(`DB ${databaseEngine} is running`);
}
module.exports = fabricConnection;
