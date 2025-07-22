import { Router } from "express";
import { authMiddleware } from "../middlewares/auth.middleware";
import jwt from "jsonwebtoken";
import { JWT_SECRET } from "../config";
import User from "../models/User";

const router = Router();

// Interface para los datos de respuesta
interface AuthResponse {
  token: string;
  user: {
    id: string;
    name: string;
    email: string;
  };
}

// Ruta de registro
router.post("/register", async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Verificar si el usuario ya existe
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "Email ya está en uso" });
    }

    // Crear nuevo usuario
    const user = new User({ name, email, password });
    await user.save();

    // Generar token JWT
    const token = jwt.sign(
      { id: user._id.toString(), email: user.email },
      JWT_SECRET,
      { expiresIn: "24h" }
    );

    const responseData: AuthResponse = {
      token,
      user: {
        id: user._id.toString(),
        name: user.name,
        email: user.email,
      },
    };

    res.status(201).json(responseData);
  } catch (error) {
    console.error("Error en registro:", error);
    res.status(500).json({ message: "Error al registrar usuario" });
  }
});

// Ruta de login
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    // Buscar usuario por email
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: "Credenciales inválidas" });
    }

    // Verificar contraseña
    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(401).json({ message: "Credenciales inválidas" });
    }

    // Generar token JWT
    const token = jwt.sign(
      { id: user._id.toString(), email: user.email },
      JWT_SECRET,
      { expiresIn: "24h" }
    );

    const responseData: AuthResponse = {
      token,
      user: {
        id: user._id.toString(),
        name: user.name,
        email: user.email,
      },
    };

    res.json(responseData);
  } catch (error) {
    console.error("Error en login:", error);
    res.status(500).json({ message: "Error al iniciar sesión" });
  }
});

// Ruta para verificar token
router.get("/verify", authMiddleware, async (req, res) => {
  try {
    // Verificación de tipo seguro para req.user
    if (!req.user || typeof req.user !== "object" || !("id" in req.user)) {
      return res.status(401).json({ message: "No autorizado" });
    }

    const userId = req.user.id;
    const user = await User.findById(userId).select("-password");

    if (!user) {
      return res.status(404).json({ message: "Usuario no encontrado" });
    }

    res.json({
      user: {
        id: user._id.toString(),
        name: user.name,
        email: user.email,
      },
    });
  } catch (error) {
    console.error("Error al verificar token:", error);
    res.status(500).json({ message: "Error al verificar token" });
  }
});

export default router;
