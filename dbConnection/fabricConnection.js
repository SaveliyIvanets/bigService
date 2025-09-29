const sequelize = require("./postgresDb");
const mongoose = require("mongoose");
const dbConnections = {
  mongo: () => mongoose.connect(config.mongodb.uri),
  postgres: () => require("./postgresDb").authenticate(),
  lite: () => require("./liteDb").authenticate(),
};
async function fabricConnection(databaseEngine) {
  const connect = dbConnections[databaseEngine];
  if (databaseEngine !== "mongo") {
    // костыль
    await sequelize.sync({ alter: true });
  }
  if (!connect) {
    throw new Error(`Unsupported DB: ${databaseEngine}`);
  }
  await connect;
  console.log(`DB ${databaseEngine} is running`);
}
module.exports = fabricConnection;
