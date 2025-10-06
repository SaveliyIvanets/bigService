const config = require("./config/configuration.js");
const app = require("./app");
const fabricConnection = require("./dbConnection/fabricConnection.js");
async function startServer() {
  try {
    await fabricConnection(config.db.databaseEngine);
    app.listen(config.port);
    console.log(`Сервер запущен на ${config.port} порту`);
  } catch (err) {
    console.debug(err);
  }
}
startServer();
