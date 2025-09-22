const app = require("./app");
const mongoose = require("mongoose");
const config = require("./config.json");
async function startServer() {
  try {
    await mongoose.connect(
      config.mongodb.uri || "mongodb://127.0.0.1:27017/tasks"
    );
    app.listen(config.port || 3333);
    console.log(`Сервер запущен на ${config.port || 3333} порту`);
  } catch (err) {
    console.log(err);
  }
}
startServer();
