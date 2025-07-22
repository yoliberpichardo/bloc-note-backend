import { Router } from "express";

import { authMiddleware } from "../middlewares/auth.middleware";
import {
  addNote,
  deleteNote,
  editNote,
  getAllNotes,
} from "../controllers/notes.controller";

const router = Router();

// Asegúrate que estas rutas coincidan con lo que usa el frontend
router.get("/", authMiddleware, getAllNotes);
router.post("/", authMiddleware, addNote);
router.put("/:id", authMiddleware, editNote);
router.delete("/:id", authMiddleware, deleteNote);

export default router;
