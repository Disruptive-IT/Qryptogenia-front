import prisma from "../lib/prisma.js";
import { useSend } from "../utils/useSend.js";
import bcrypt from "bcryptjs";
import nodemailer from "nodemailer"
import jwt from 'jsonwebtoken';
import { sendVerificationEmail } from "../services/mail.service.js";
import { sendRecoverEmail } from "../services/mail.service.js";

function getDate() {
  let dateCurrent = new Date();
  dateCurrent.setHours(dateCurrent.getHours() - 5);
  return dateCurrent;
}

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
    // const minTimeBetweenEmails = 10 * 60 * 1000; // 10 minutos en milisegundos
    const minTimeBetweenEmails = 1;

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

const sendVerifyEmail = async (req, res, existingPreRegister) => {
  const { email } = req.body;
  let dateCurrent = getDate();

  const pin = Math.floor(1000 + Math.random() * 9000);

  try {
    await sendVerificationEmail(email, pin);

    //* Si el usuario ya tiene un pre-registro, actualizarlo
    if (existingPreRegister) {
      await prisma.preRegister.update({
        where: { email: email },
        data: {
          pin: pin,
          last_pin_generated_at: dateCurrent,
        },
      });
      return res
        .status(200)
        .json(useSend("Se ha enviado un nuevo correo de verificación"));
    }

    //* Si el usuario no tiene un pre-registro, crear uno nuevo
    await prisma.preRegister.create({
      data: {
        email: email,
        pin: pin,
        createdAt: dateCurrent,
        last_pin_generated_at: dateCurrent,
      },
    });

    return res
      .status(200)
      .json(useSend("Se ha enviado el correo de verificación"));
  } catch (error) {
    return res
      .status(500)
      .json(useSend("Error enviando correo de verificación"));
  }
};

export const verifyAccount = async (req, res) => {
  try {
    const { email, pin } = req.body;

    // Verificar el pre-registro para saber si el pin coincide con el recibido
    const preRegister = await prisma.preRegister.findUnique({
      where: { email: email },
    });

    if (!preRegister)
      return res.status(400).json(useSend("Intente generar el pin nuevamente"));

    if (preRegister.pin !== parseInt(pin))
      return res.status(400).json(useSend("No es el token mas reciente"));

    return res.status(200).json(useSend("TDO BIEN"));
  } catch (err) {
    return res.status(500).json(useSend("Error in server", err));
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

    // Verificar si el usuario tiene registros de intentos fallidos
    const loginLog = await prisma.loginLogs.findUnique({
      where: { userId: user.id },
    });

    // Si el usuario tiene registros de intentos fallidos, verificar el limite
    if (loginLog && loginLog.failed_login >= 5) {
      const timeDifference = dateCurrent - new Date(loginLog.failed_login_time);
      // Si han pasado menos de 10 minutos desde el último intento fallido, retornar error
      if (timeDifference < 10 * 60 * 1000) {
        return res
          .status(400)
          .json(
            useSend(
              "You have exceeded the maximum number of failed login attempts. Please try again later."
            )
          );
      }
      // Si han pasado más de 10 minutos, resetear el contador de intentos fallidos
      await prisma.loginLogs.update({
        where: { userId: user.id },
        data: {
          failed_login: 0,
          failed_login_time: null,
        },
      });
    }

    // Verificar las credenciales del usuario
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
    const token = jwt.sign({ id: user.id, rol: user.rol.name }, process.env.JWT_SECRET, {
      expiresIn: req.body.remember ? "365d" : "24h",
    });

    // Actualizar el registro de inicio de sesión
    await prisma.loginLogs.update({
      where: { userId: user.id },
      data: {
        update_ip: req.ip,
        login_date: dateCurrent,
      },
    });

    // Enviar la respuesta con el token
    res
      .status(200)
      .cookie("token", token, {
        maxAge: req.body.remember ? 365 * 24 * 60 * 60 * 1000 : null,
        sameSite: "Lax",
        httpOnly: true,
        secure: process.env.NODE_ENV === "production" ? true : false,
        domain: req.hostname,
        path: "/",
      })
      .json(
        useSend("Successfully login", {
          user: {
            rol: user.rol.name,
            token: token
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
    
    // Llamada a la función sendRecoverEmail con el ID del usuario
    const mail = await sendRecoverEmail(email, token, user.id);
    
    // Manejo de la respuesta del envío del correo
    if (!mail.accepted || mail.accepted.length === 0) {
      return res.status(500).send({
        status: "error",
        message: "Error sending recovery email",
      });
    }
    
    // Si el correo se envió correctamente, responder con éxito
    return res.status(200).json({ success: true, message: "Recovery email sent successfully" });
  } catch (error) {
    console.error('Error:', error);
    return res.status(500).send({ error: "Internal server error" });
  }
};



// 



export const recoverPassword = async (req, res) => {
  // const { token } = req.query;
  const { confirmPassword, token } = req.body;

  try {
    // Verificar el token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    if (!decoded || !decoded.userId) {
      return res.json({ Status: "error with token" });
    }

    // Generar hash de la nueva contraseña
    const saltRounds = 10; // Número de rondas de hashing
    const hashedPassword = await bcrypt.hash(confirmPassword, saltRounds);

    // Actualizar la contraseña en la base de datos con el ID del usuario decodificado
    await prisma.user.update({
      where: { id: decoded.userId },
      data: { password: hashedPassword }
    });

    res.send({ Status: "Success" });
  } catch (error) {
    res.send({ Status: "Error", message: error.message });
  }
};