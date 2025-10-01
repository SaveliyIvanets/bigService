const fs = require("fs");

function configuration() {
  try {
    const config = require("./config.json");
    if (
      config.port !== undefined &&
      config.tests !== undefined &&
      config.databaseEngine !== undefined &&
      config.mongodb !== undefined &&
      config.postgresql !== undefined &&
      config.sqlite !== undefined
    ) {
      console.debug("config проверен!");
      return config;
    }
    const fullConfig = {
      port: config.port ?? 3333,
      tests: config.tests ?? true,
      databaseEngine: config.databaseEngine ?? "postgres",
      mongodb: config.mongodb ?? {
        uri: "mongodb://127.0.0.1:27017/tasks",
        test_uri: "mongodb://127.0.0.1:27017/tests",
      },
      postgresql: {
        dbname: "postgres",
        username: "postgres",
        password: "123",
        dialect: "postgres",
      },
      sqlite: {
        dialect: "sqlite",
        storage: "sqlite.db",
      },
    };
    fs.writeFileSync("./config.json", JSON.stringify(fullConfig, null, 2));
    delete require.cache[require.resolve("./config.json")];
    console.debug("config готов к работе");
    return fullConfig;
  } catch (err) {
    console.debug("config отсутствует!");
    const dataConfig = {
      port: 3002,
      tests: true,
      databaseEngine: "postgres",
      mongodb: {
        uri: "mongodb://127.0.0.1:27017/tasks",
        test_uri: "mongodb://127.0.0.1:27017/tests",
      },
      postgresql: {
        dbname: "postgres",
        username: "postgres",
        password: "123",
        dialect: "postgres",
      },
      sqlite: {
        dialect: "sqlite",
        storage: "sqlite.db",
      },
    };
    fs.writeFileSync("./config.json", JSON.stringify(dataConfig, null, 2)); // я использую синхронный вариант, потому что мне кажется, что создание конфига при инициализации это первостепенная задача
    delete require.cache[require.resolve("./config.json")];
    console.debug("config создан!");
    return dataConfig;
  }
}
module.exports = configuration;
