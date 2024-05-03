import prisma from "../lib/prisma.js";
import { useSend } from "../utils/useSend.js";
import bcrypt from "bcryptjs";
import jwt from 'jsonwebtoken';
import { sendRecoverEmail } from "../services/mail.service.js";
import {
  handleFailedLoginAttempts,
  generateToken,
  sendVerifyEmail,
} from "../services/auth.service.js";
import { getDate } from "../utils/dateUtils.js";
import { OAuth2Client } from "google-auth-library";

export const register = async (req, res) => {
  const { email } = req.body;
  let dateCurrent = getDate();

  //* Si el usuario ya existe
  const existingUser = await prisma.user.findUnique({
    where: { email: email },
  });
  if (existingUser) {
    return res.status(400).json(useSend("Este registro ya existe"));
  }

  //* Si el usuario ya tiene un pre-registro
  const existingPreRegister = await prisma.preRegister.findUnique({
    where: { email: email },
  });

  if (existingPreRegister) {
    // Verificar si ha pasado el tiempo mínimo para enviar otro correo
    const timeSinceLastEmail =
      dateCurrent - existingPreRegister.last_pin_generated_at;
    const minTimeBetweenEmails = 10 * 60 * 1000; // 10 minutos en milisegundos
    // const minTimeBetweenEmails = 1;

    if (timeSinceLastEmail < minTimeBetweenEmails) {
      //* Calcular el tiempo restante en minutos
      const remainingTime = Math.ceil(
        (minTimeBetweenEmails - timeSinceLastEmail) / (60 * 1000)
      );

      const message = `Ya se ha enviado un correo de verificación recientemente. Por favor, espera ${remainingTime} minuto(s) antes de solicitar otro.`;

      return res.status(400).json(useSend(message));
    }
  }

  return sendVerifyEmail(req, res, existingPreRegister);
};

export const completeRegister = async (req, res) => {
  const { username, password, email } = req.body;
  let dateCurrent = getDate();

  try {
    // Buscar el registro de pre-registro
    const preRegister = await prisma.preRegister.findUnique({
      where: { email: email },
    });

    if (!preRegister) {
      return res.status(404).json({ message: "Pre-registro no encontrado" });
    }

    // Eliminar el registro de pre-registro
    await prisma.preRegister.delete({
      where: { id: preRegister.id },
    });

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await prisma.user.create({
      data: {
        username: username,
        email: email,
        password: hashedPassword,
        createdAt: dateCurrent,
        rol: { connect: { id: 2 } },
      },
    });

    // Crear el registro de LoginLogs
    await prisma.loginLogs.create({
      data: {
        user: { connect: { id: newUser.id } },
        created_ip: req.ip,
      },
    });

    return res.status(200).json(useSend("Registro completado con éxito"));
  } catch (error) {
    return res.status(500).json(useSend("Error completing registration"));
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    let dateCurrent = getDate();

    // Buscar al usuario por correo electrónico y estado activo
    const user = await prisma.user.findUnique({
      where: { email: email, state: true },
      include: { rol: true },
    });

    if (!user) {
      return res
        .status(400)
        .json(useSend("No account with this email has been registered."));
    }

    try {
      await handleFailedLoginAttempts(user.id, dateCurrent);
    } catch (error) {
      return res.status(400).json(useSend(error.message, true));
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      // Si las credenciales son incorrectas, incrementar el contador de intentos fallidos
      await prisma.loginLogs.update({
        where: { userId: user.id },
        data: {
          failed_login: {
            increment: 1,
          },
          failed_login_time: dateCurrent,
        },
      });
      return res.status(400).json(useSend("Invalid credentials."));
    }
    // Si las credenciales son correctas, resetear el contador de intentos fallidos
    await prisma.loginLogs.update({
      where: { userId: user.id },
      data: {
        failed_login: 0,
        failed_login_time: null,
      },
    });

    // Generar y enviar el token JWT
    const token = generateToken(user, req.body.remember, res);

    await prisma.loginLogs.update({
      where: { userId: user.id },
      data: {
        update_ip: req.ip,
        login_date: dateCurrent,
      },
    });

    res.status(200).json(
      useSend("Successfully login", {
        user: {
          rol: user.rol.name,
          token: token,
        },
      })
    );
  } catch (err) {
    res.status(500).json(useSend("Error in server", err));
  }
};

export const logout = (req, res) => {
  try {
    res.cookie("token", "", {
      maxAge: -1,
      sameSite: "Lax",
      httpOnly: true,
      secure: process.env.NODE_ENV === "production" ? true : false,
      domain: req.hostname,
      path: "/",
    });
    res.status(200).json(useSend("Successfully logged out"));
  } catch (err) {
    res.status(500).json(useSend("Error in server", err));
  }
};

export const forgot_password = async (req, res) => {
  const { email } = req.body;
  
  try {
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) {
      return res.status(404).send({ error: "User not existed" });
    }

    // Generar el token JWT con el ID del usuario
    const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, { expiresIn: "1d" });

    await prisma.resetToken.create({
      data: {
        token: token,
        userId: user.id, 
        createdAt: new Date(),
        used: false, // Establecer como no utilizado al crear el token
      },
    });
    
    // Llamada a la función sendRecoverEmail con el ID del usuario
    const mail = await sendRecoverEmail(email, token, user.id);

    // Manejo de la respuesta del envío del correo
    if (!mail.accepted || mail.accepted.length === 0) {
      return res.status(500).send({
        status: "error",
        message: "Error sending recovery email",
      });
    }
    
    
    return res.status(200).json({ success: true, message: "Recovery email sent successfully" });
  } catch (error) {
    console.error("Error:", error);
    return res.status(500).send({ error: "Internal server error" });
  }
};


export const recoverPassword = async (req, res) => {
  const { confirmPassword, token } = req.body;

  try {
    // Verificar el token JWT
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    if (!decoded || !decoded.userId) {
      return res.json({ Status: "error with token" });
    }

    const resetToken = await prisma.resetToken.findFirst({
      where: {
        userId: decoded.userId,
        token: token,
        used: false
      }
    });

    if (!resetToken) {
      return res.status(400).json({ status: "error", message: "Invalid or expired token" });
    }

    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(confirmPassword, saltRounds);

    // Actualizar la contraseña en la base de datos
    await prisma.user.update({
      where: { id: decoded.userId },
      data: { password: hashedPassword }
    });

    // Marcar el token como utilizado
    await prisma.resetToken.update({
      where: { id: resetToken.id },
      data: { used: true }
    });

    res.send({ Status: "Success" });
  } catch (error) {
    res.send({ Status: "Error", message: error.message });
  }
};

//endpoint google
export const googleauth = async (req, res) => {
  res.header('Access-Control-Allow-Origin', 'http://localhost:5173');
  res.header('Referrer-Policy', 'no-referrer-when-downgrade');
  
  const redirectUrl = 'http://localhost:5173/user/home';

  const oAuth2Client = new OAuth2Client(
    process.env.CLIENT_ID,
    process.env.CLIENT_SECRET,
    redirectUrl
  );

  const authorizeUrl = oAuth2Client.generateAuthUrl({
    access_type: 'offline',
    scope:'https://www.googleapis.com/auth/userinfo.profile openid',
    prompt: 'consent'
  });
  res.json({url:authorizeUrl})
};
