const express = require("express");
const router = express.Router();
const createTask = require("./createTask");
const Task = require("../../models/tasksSchema");
router.post("/", createTask(Task));
module.exports = router;
