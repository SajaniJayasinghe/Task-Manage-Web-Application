const Task = require("./task.model");

/**
 * Save a new task
 * @param {Object} task - The task object to save
 * @param {Object} session - The session object for transactions (optional)
 * @returns {Promise<Task>} - The saved task
 */
const save = async (task, session) => {
  return await task.save({ session });
};

/**
 * Find all tasks based on query object
 * @param {Object} queryObj - The query object for filtering tasks (optional)
 * @returns {Promise<Task[]>} - Array of tasks
 */
const findAll = async (queryObj) => {
  return await Task.find(queryObj).sort({ createdAt: -1 });
};

/**
 * Find a task by its id
 * @param {string} id - The id of the task
 * @returns {Promise<Task>} - The task object
 */
const findById = async (id) => {
  return await Task.findById(id);
};

/**
 * Find a task by its ID and delete it
 * @param {string} id - The ID of the task to delete
 * @param {Object} session - The session object for transactions (optional)
 * @returns {Promise<Task>} - The deleted task
 */
const findByIdAndDelete = async (id, session) => {
  if (session) {
    return await Task.findByIdAndDelete(id).session(session);
  } else {
    return await Task.findByIdAndDelete(id);
  }
};

module.exports = {
  save,
  findAll,
  findById,
  findById,
};
