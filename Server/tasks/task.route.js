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
TaskRouter.get("/getAllTasks", taskController.GetAllTasks);

// Route for getting a task by ID
TaskRouter.get(
  "/getTask/:id",
  authMiddleware.authorize(),
  taskController.GetTaskById
);

// Route for updating a task by ID
TaskRouter.put(
  "/updateTask/:id",
  authMiddleware.authorize(),
  taskController.UpdateTask
);

// Route for deleting a task by ID
TaskRouter.delete(
  "/deleteTask/:id",
  authMiddleware.authorize(),
  taskController.DeleteTask
);

module.exports = TaskRouter;
