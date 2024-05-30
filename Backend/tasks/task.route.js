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

// Route for getting all tasks
TaskRouter.get(
  "/getAllTasks",
  authMiddleware.authorize(),
  taskController.GetAllTasks
);

// Route for getting a task by ID
TaskRouter.get(
  "/getTask/:id",
  authMiddleware.authorize(),
  taskController.GetTaskById
);

module.exports = TaskRouter;
