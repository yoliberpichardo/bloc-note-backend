import { Request, Response } from "express";
import Note from "../models/Note";

export const getAllNotes = async (req: Request, res: Response) => {
  try {
    // Type assertion para acceder a req.user
    const userId = (req as Request & { user: { id: string } }).user?.id;

    if (!userId) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const notes = await Note.find({ user: userId }).sort({ createdAt: -1 });
    res.json(notes);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

export const getWelcomeMessage = (req: Request, res: Response) => {
  res.json({ message: "Bienvenido a Bloc Note" });
};
export const addNote = async (req: Request, res: Response) => {
  const { title, description } = req.body;

  try {
    if (!req.user?.id) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    if (!title || !description) {
      return res.status(400).json({
        message: "Title and description are required",
      });
    }

    const note = new Note({
      title,
      description,
      user: req.user.id,
    });

    await note.save();
    res.status(201).json(note);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

export const deleteNote = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    if (!req.user?.id) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const note = await Note.findOneAndDelete({
      _id: id,
      user: req.user.id,
    });

    if (!note) {
      return res.status(404).json({ message: "Note not found" });
    }

    res.status(200).json({ message: "Note deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

export const editNote = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { title, description } = req.body;

  try {
    if (!req.user?.id) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const note = await Note.findOneAndUpdate(
      { _id: id, user: req.user.id },
      { title, description },
      { new: true, runValidators: true }
    );

    if (!note) {
      return res.status(404).json({ message: "Note not found" });
    }

    res.status(200).json(note);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};
