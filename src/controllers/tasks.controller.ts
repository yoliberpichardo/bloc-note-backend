import { Request, Response } from "express";
import { Task, TaskStore } from "../interfaces/task.interface";

const taskStore: TaskStore = {};

export const getWelcomeMessage = (req: Request, res: Response) => {
  res.json({ message: "Bienvenido a Bloc Note" });
};

export const getAllTasks = (req: Request, res: Response) => {
  res.json(taskStore);
};

export const addTask = (req: Request, res: Response) => {
  const { description, id, title } = req.body as Task;

  if (!title || !description) {
    return res.status(400).json({ message: "Empty value, re-enter values!" });
  }

  taskStore[id] = { id, title, description };
  res.status(200).json({ message: "Added successfully!", data: taskStore });
};

export const deleteTask = (req: Request, res: Response) => {
  const { id } = req.params;

  if (!taskStore[id]) {
    return res.status(400).json({ message: "ID not found" });
  }

  delete taskStore[id];
  res.status(200).json({ message: "Task deleted successfully!" });
};

export const editTask = (req: Request, res: Response) => {
  const { id } = req.params;
  const { description, title } = req.body as Partial<Task>;

  if (!title || !description) {
    return res
      .status(400)
      .json({ message: "title and description cannot be empty" });
  }

  if (!taskStore[id]) {
    return res.status(400).json({ message: "ID not found" });
  }

  taskStore[id] = { ...taskStore[id], title, description };
  res.status(200).json(taskStore[id]);
};