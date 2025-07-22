import express from "express";
import cors from "cors";
import authRoutes from "./routes/auth.routes";
import notesRoutes from "./routes/notes.routes";
import { errorHandler } from "./middlewares/error.middleware";
import connectDB from "./database";

// Configuración inicial
const app = express();
app.use(cors());
app.use(express.json());

// Conectar a MongoDB
connectDB();

// Rutas
app.use("/api/auth", authRoutes);
app.use("/api/notes", notesRoutes);

// Manejo de errores
app.use(errorHandler);

export default app;
