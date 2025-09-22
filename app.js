const express = require("express");
const app = express();
const explorerRouter = require("./routers/explorer/index.js");
const todosRouter = require("./routers/todos/index.js");
const cors = require("cors");
const config = require("./config.json");

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());
app.use("/api/explorer", explorerRouter);
app.use("/api/todos", todosRouter);

module.exports = app;
