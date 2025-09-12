const express = require("express");
const app = express();
const router = require("../routers/explorer/index.js");
const cors = require("cors");

app.use(cors());
app.use("/api", router);
app.listen(3007, () => console.log("Сервер ожидает подключения..."));
