import Task from "../models/taskModel.js"; // Import your Task model
import User from "../models/userModel.js"; // Import your User model

// Get all tasks
export const getAllTasks = async (req, res) => {
  try {
    const tasks = await Task.find().populate("user"); // Fetch all tasks and populate user info
    res.status(200).json(tasks); // Send the tasks back as a JSON response
  } catch (error) {
    res.status(500).json({ message: "Server error: Unable to fetch tasks" });
  }
};

// Create a new task
export const createTask = async (req, res) => {
  try {
    const { name, user } = req.body; // Get name and user from the request body
    const newTask = new Task({ name, user }); // Create a new task with user and name
    const savedTask = await newTask.save(); // Save the task to the database
    res.status(201).json(savedTask); // Send back the created task
  } catch (error) {
    res.status(400).json({ message: "Error creating task", error });
  }
};

// Delete a task by ID
export const deleteTask = async (req, res) => {
  try {
    const task = await Task.findByIdAndDelete(req.params.id); // Find and delete task by ID
    if (!task) return res.status(404).json({ message: "Task not found" });
    res.status(200).json({ message: "Task deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error: Unable to delete task" });
  }
};

// Update a task by ID
export const updateTask = async (req, res) => {
  try {
    const { name, user } = req.body; // Get updated data from the request body
    const updatedTask = await Task.findByIdAndUpdate(
      req.params.id,
      { name, user },
      { new: true } // Return the updated document
    );
    if (!updatedTask)
      return res.status(404).json({ message: "Task not found" });
    res.status(200).json(updatedTask); // Send back the updated task
  } catch (error) {
    res.status(500).json({ message: "Server error: Unable to update task" });
  }
};
