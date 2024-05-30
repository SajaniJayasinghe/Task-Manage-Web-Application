const { StatusCodes } = require("http-status-codes");
const { startSession } = require("mongoose");
const Task = require("./task.model");
const TaskService = require("./task.service");

// Create a new task
const CreateTask = async (req, res) => {
  const session = await startSession();
  try {
    //start transaction
    session.startTransaction();
    // Extract data from the request body
    const { title, description, status, dueDate } = req.body;

    // Get the user ID from the authenticated user
    const userId = req.auth.id;

    // Construct task data object
    const taskData = {
      title: title,
      description: description,
      status: status,
      dueDate: dueDate,
      user: userId,
    };

    // Create a new task instance with the constructed task data
    const task = new Task(taskData);

    // Save the task to the database
    const createdTask = await TaskService.save(task, session); // Add await here

    // Commit the transaction
    await session.commitTransaction();

    // Send response
    res.status(StatusCodes.CREATED).json({
      message: "Task created successfully",
      task: createdTask,
    });
  } catch (error) {
    await session.abortTransaction();
    throw error;
  } finally {
    //end session
    session.endSession();
  }
};

//Get all tasks
const GetAllTasks = async (req, res) => {
  try {
    const tasks = await TaskService.findAll({ user: req.auth.id });
    res.status(StatusCodes.OK).json(tasks);
  } catch (error) {
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ error: error.message });
  }
};

// Get a task by ID
const GetTaskById = async (req, res) => {
  try {
    const taskId = req.params.id;
    const task = await TaskService.findById(taskId);
    if (!task) {
      return res
        .status(StatusCodes.NOT_FOUND)
        .json({ message: "Task not found" });
    }
    res.status(StatusCodes.OK).json(task);
  } catch (error) {
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ error: error.message });
  }
};

module.exports = { CreateTask, GetAllTasks, GetTaskById };
