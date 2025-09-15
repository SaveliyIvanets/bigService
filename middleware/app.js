const express = require("express");
const mongoose = require("mongoose");
const app = express();
const explorerRouter = require("../routers/explorer/index.js");
const todosRouter = require("../routers/todos/index.js");
const cors = require("cors");
const config = require("../config.json");

async function startServer() {
  // это должно быть здесь? или вынесено в отдельный файл?
  try {
    await mongoose.connect(config.mongodb.uri);
    app.listen(config.port);
    console.log("Сервер ожидает подключения...");
  } catch (err) {
    return console.log(err);
  }
}

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());
app.use("/api/explorer", explorerRouter);
app.use("/api/todos", todosRouter);

startServer();
