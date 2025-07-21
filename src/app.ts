import express from "express";
import cors, { CorsOptions } from "cors";
import dotenv from "dotenv";
import tasksRouter from "./routes/tasks.routes";

dotenv.config();

const corsOptions: CorsOptions = {
  origin: "http://127.0.0.1:5500",
  optionsSuccessStatus: 200,
  methods: ["GET", "POST", "DELETE", "PUT", "PATCH"],
};

const app = express();

// Middlewares
app.use(cors(corsOptions));
app.use(express.json());
app.use("/static", express.static("./static/"));

// Routes
app.use("/api", tasksRouter);

export default app;