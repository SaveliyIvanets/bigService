const configuration = require("./configuration.js");
const config = configuration();
const app = require("./app");
const mongoose = require("mongoose");
async function startServer() {
  try {
    await mongoose.connect(config.mongodb.uri);
    app.listen(config.port);
    console.log(`Сервер запущен на ${config.port} порту`);
  } catch (err) {
    console.log(err);
  }
}
startServer();
