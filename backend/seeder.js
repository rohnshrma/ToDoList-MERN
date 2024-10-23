import mongoose from "mongoose";
import connecDB from "./config/db.js";
import tasks from "./data/tasks.js";
import Task from "./models/taskModel.js";
import User from "./models/userModel.js";
import users from "./data/users.js";

connecDB();

const createData = async () => {
  try {
    await Task.deleteMany();
    await User.deleteMany();

    const createdUsers = await User.insertMany(users);

    // Check if the number of users and tasks are the same
    if (tasks.length !== createdUsers.length) {
      console.log("The number of tasks and users does not match.");
      process.exit(1);
    }

    const updated_tasks = tasks.map((task, index) => {
      return { ...task, user: createdUsers[index]._id };
    });

    await Task.insertMany(updated_tasks);
    console.log("Data Created");
    process.exit();
  } catch (err) {
    console.log("Error :", err);
    process.exit(1);
  }
};
const deleteData = async () => {
  try {
    await Task.deleteMany();
    console.log("Tasks Deleted");
    process.exit();
  } catch (err) {
    console.log("Error :", err);
    process.exit(1);
  }
};

if (process.argv[2] == "-d") {
  deleteData();
} else {
  createData();
}
