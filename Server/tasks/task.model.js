const mongoose = require("mongoose");

const TaskSchema = mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Title is required"],
      maxlength: 100,
    },
    description: {
      type: String,
      required: [true, "Description is required"],
    },
    status: {
      type: String,
      enum: ["pending", "inprogress", "completed"],
      default: "pending",
    },
    dueDate: {
      type: Date,
      required: [true, "Due date is required"],
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User", // Reference to User model
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Task", TaskSchema);
