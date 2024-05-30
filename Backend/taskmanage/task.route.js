const express = require("express");
const taskController = require("./task.controller");
const authMiddleware = require("../auth/auth.middleware");

const TaskRouter = express.Router();

// Route for creating a task
TaskRouter.post(
  "/createTask",
  authMiddleware.authorize(),
  taskController.CreateTask
);

module.exports = TaskRouter;
