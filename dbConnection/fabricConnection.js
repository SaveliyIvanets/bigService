async function fabricConnection(databaseEngine) {
  let sequelize = null;
  switch (databaseEngine) {
    case "postgres":
      sequelize = require("./postgresDb");
      break;
    case "lite":
      sequelize = require("./liteDb");
      break;
  }
  if (!sequelize) throw new Error(`Unsupported DB: ${databaseEngine}`);
  await sequelize.authenticate();
  await sequelize.sync({ alter: true });

  console.log(`DB ${databaseEngine} is running`);
}
module.exports = fabricConnection;
