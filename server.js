const configuration = require("./configuration.js");
const config = configuration();
const app = require("./app");
const fabricConnection = require("./dbConnection/fabricConnection.js");
async function startServer() {
  try {
    await fabricConnection(config.databaseEngine);
    app.listen(config.port);
    console.log(`Сервер запущен на ${config.port} порту`);
  } catch (err) {
    console.debug(err);
  }
}
startServer();
