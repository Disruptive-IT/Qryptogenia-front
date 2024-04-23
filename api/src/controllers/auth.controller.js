import prisma from "../lib/prisma.js";
import { useSend } from "../utils/useSend.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { sendVerificationEmail } from "../services/mail.service.js";

export const register = async (req, res) => {
  const { email } = req.body;

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
      new Date() - existingPreRegister.last_token_generated_at;
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

  const pin = Math.floor(1000 + Math.random() * 9000);

  try {
    await sendVerificationEmail(email, pin);

    //* Si el usuario ya tiene un pre-registro, actualizarlo
    if (existingPreRegister) {
      await prisma.preRegister.update({
        where: { email: email },
        data: {
          pin: pin,
          last_token_generated_at: new Date(),
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
        last_token_generated_at: new Date(),
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

    const user = await prisma.user.findUnique({
      where: { email: email, state: true },
      include: { rol: true },
    });

    if (!user) {
      return res
        .status(400)
        .json(useSend("No account with this email has been registered."));
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json(useSend("Invalid credentials."));
    }
    // Suponiendo que 'password' es la contraseña ingresada por el usuario y 'user.password' es la contraseña almacenada en la base de datos.
    // if (password !== user.password) {
    //   return res.status(400).json(useSend("Invalid credentials."));
    // }

    //? aca implementar la logica de para accesos errones .> login log

    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
      expiresIn: req.body.remember ? "365d" : "24h",
    });

    if (req.body.terms) {
      await prisma.loginLogs.update({
        where: { userId: user.id },
        data: {
          update_ip: req.ip,
          login_date: new Date(),
        },
      });
    }

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
          //? Puede ser una opcion obtener la info por el middleware
          user: {
            rol: user.rol.name,
            // isLoggedIn: user.isLoggedIn,
          },
        })
      );
  } catch (err) {
    console.log("ERROR ", err.response);
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
