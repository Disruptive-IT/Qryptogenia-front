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
  googlecall,
} from "../controllers/auth.controller.js";
import { verifyAccount } from "../services/auth.service.js";
const plaintextPassword = "dav39484"; // Tu contraseña en texto plano
import jwt from "jsonwebtoken";
import { verifyRecaptcha } from "../services/verifyRecaptcha.service.js";
import prisma from "../lib/prisma.js";

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

router.post("/verifyRecaptcha", verifyRecaptcha);

router.get("/google", googleauth);
router.get("/google/callback", googlecall);

router.get("/check-token", async (req, res) => {
  const token = req.cookies.token;
  if (!token) {
    return res.status(401).json({ message: "No token provided" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const user = await prisma.user.findUnique({
      where: { id: decoded.id },
      include: {
        rol: true,
      },
    });
    const userResponse = {
      id: user.id,
      username: user.username,
      email: user.email,
      rol: user.rol.name,
    };
    
    return res.status(200).json({ user: userResponse });
  } catch (error) {
    res.status(401).json({ message: "Invalid token" });
  }
});

router.get('/qrcodes', async (req, res) => {
  const { userId } = req.query;

    console.log('userId:', userId); // Agrega este log para verificar el userId

    try {
        const qrCodes = await prisma.qr.findMany({
            where: {
                userId: userId, // Asegúrate de que userId es un número
            },
            select: {
                id: true,
                name_qr: true,
                qrTypeId: true,
                state: true,
                createdAt: true,
                // Solo selecciona los campos que existen
                // Si "scans" no existe en tu modelo, quítalo de aquí
            },
        });

        console.log('qrCodes:', qrCodes); // Agrega este log para verificar los resultados

        res.json(qrCodes);
    } catch (error) {
        console.error('Error fetching QR codes:', error);
        res.status(500).json({ error: 'Error fetching QR codes' });
    }
});

export default router;
