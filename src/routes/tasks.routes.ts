import { Router } from "express";
import {
  getWelcomeMessage,
  getAllTasks,
  addTask,
  deleteTask,
  editTask,
} from "../controllers/tasks.controller";

const router = Router();

router.get("/", getWelcomeMessage);
router.get("/get-task-all", getAllTasks);
router.post("/add-task", addTask);
router.delete("/deleted-task/:id", deleteTask);
router.patch("/edit-task/:id", editTask);

export default router;