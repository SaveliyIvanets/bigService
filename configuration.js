const fs = require("fs");
const mongoose = require("mongoose");
const Sequelize = require("sequelize");
const config = require("./config.json");

function configuration() {
  try {
    const config = require("./config.json");
    if (
      config.port !== undefined &&
      config.tests !== undefined &&
      config.databaseEngine !== undefined &&
      config.mongodb !== undefined
    ) {
      console.debug("config проверен!");
      return config;
    }
    const fullConfig = {
      port: config.port ?? 3333,
      tests: config.tests ?? true,
      databaseEngine: config.databaseEngine ?? "mongodb",
      mongodb: config.mongodb ?? {
        uri: "mongodb://127.0.0.1:27017/tasks",
        test_uri: "mongodb://127.0.0.1:27017/tests",
      },
    };
    fs.writeFileSync("./config.json", JSON.stringify(fullConfig, null, 2));
    console.debug("config готов к работе");
    return fullConfig;
  } catch (err) {
    console.debug("config отсутствует!");
    const dataConfig = {
      port: 3002,
      tests: true,
      databaseEngine: "mongodb",
      mongodb: {
        uri: "mongodb://127.0.0.1:27017/tasks",
        test_uri: "mongodb://127.0.0.1:27017/tests",
      },
    };
    fs.writeFileSync("./config.json", JSON.stringify(dataConfig, null, 2)); // я использую синхронный вариант, потому что мне кажется, что создание конфига при инициализации это первостепенная задача
    console.debug("config создан!");
    return dataConfig;
  }
}
async function dbConnection(databaseEngine) {
  switch (databaseEngine) {
    case "mongo":
      await mongoose.connect(config.mongodb.uri);
      break;
    case "postgres":
      const Sequelize = require("sequelize");
      const sequelize = new Sequelize(
        config.postgresql.dbname,
        config.postgresql.username,
        config.postgresql.password,
        {
          dialect: config.postgresql.dialect,
        }
      );
      await sequelize.authenticate();
      break;
  }
}
module.exports = configuration;
