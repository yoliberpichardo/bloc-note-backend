import { Router } from "express";
import { authMiddleware } from "../middlewares/auth.middleware";
import { getWelcomeMessage } from "../controllers/notes.controller";
import {
  getAllNotes,
  addNote,
  deleteNote,
  editNote,
} from "../controllers/notes.controller";

const router = Router();

// Rutas públicas
router.get("/", getWelcomeMessage);

// Rutas protegidas
router.get("/get-note-all", authMiddleware, getAllNotes);
router.post("/add-note", authMiddleware, addNote);
router.delete("/deleted-note/:id", authMiddleware, deleteNote);
router.patch("/edit-note/:id", authMiddleware, editNote);

export default router;
