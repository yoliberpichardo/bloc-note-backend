import express from "express";
import cors from "cors";
import authRoutes from "./routes/note.routes";
import noteRoutes from "./routes/note.routes";
import { errorHandler } from "./middlewares/error.middleware";
import connectDB from "./database";

// Configuración inicial
const app = express();
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);
app.use(express.json());

// Conectar a MongoDB
connectDB();

// Rutas
app.use("/api/auth", authRoutes);
app.use("/api/notes", noteRoutes);

// Manejo de errores
app.use(errorHandler);

export default app;
