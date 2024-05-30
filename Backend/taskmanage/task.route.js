const express = require("express");
const taskController = require("./task.controller");

const TaskRouter = express.Router();

TaskRouter.post("/createTask", taskController.CreateTask);

module.exports = TaskRouter;
