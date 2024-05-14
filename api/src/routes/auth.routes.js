import express from "express";
import bcrypt from "bcryptjs";
import {
  login,
  logout,
  register,
  completeRegister,
  forgot_password,
  recoverPassword,
  googleauth,
  googlecall
} from "../controllers/auth.controller.js";
import { verifyAccount } from "../services/auth.service.js";
const plaintextPassword = "dav39484"; // Tu contraseña en texto plano
import jwt from "jsonwebtoken";
import { verifyRecaptcha } from "../services/verifyRecaptcha.service.js";

// Genera el hash de la contraseña
const hashedPassword = bcrypt.hashSync(plaintextPassword, 10);

// Guarda el hash en tu base de datos
// Aquí debes implementar la lógica para guardar el hash en tu base de datos
console.log("Hash de la contraseña:", hashedPassword);

const router = express.Router();

router.post("/register", register);
router.post("/complete-register", completeRegister);
router.post("/login", login);
router.get("/logout", logout);
router.post("/confirm", verifyAccount);

router.post("/password_reset", forgot_password);
router.post("/password_reset/confirm", recoverPassword);
// router.post("/", googleauth);
router.post("/verifyRecaptcha", verifyRecaptcha);

router.get("/google", googleauth)
router.get("/google/callback", googlecall)

//!! Pendiente a pruebas
router.get("/check-token", (req, res) => {
  const token = req.cookies.token;
  if (!token) {
    return res.status(401).json({ message: "No token provided" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const rol = decoded.rol;

    res.json({ rol });
  } catch (error) {
    res.status(401).json({ message: "Invalid token" });
  }
});

export default router;