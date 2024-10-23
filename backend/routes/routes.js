import express from "express";
const router = express.Router();
import {
  getAllTasks,
  deleteTask,
  updateTask,
  createTask,
} from "../controllers/controller.js";

router.route("/").get(getAllTasks).post(createTask);
router.route("/:id").delete(deleteTask).put(updateTask);

export default router;
