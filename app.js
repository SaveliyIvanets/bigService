const fs = require("fs");
let config;

try {
  config = require("./config.json");
} catch (err) {
  const dataConfig = {
    port: 3002,
    tests: true,
    databaseEngine: "mongodb",
    mongodb: {
      uri: "mongodb://127.0.0.1:27017/tasks",
      test_uri: "mongodb://127.0.0.1:27017/tests",
    },
  };
  fs.writeFileSync("./config.json", JSON.stringify(dataConfig, null, 2));
  config = dataConfig;
}

const express = require("express");
const app = express();
const explorerRouter = require("./routers/explorer/index.js");
const todosRouter = require("./routers/todos/index.js");
const cors = require("cors");

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());
app.use("/api/explorer", explorerRouter);
app.use("/api/todos", todosRouter);

module.exports = app;
