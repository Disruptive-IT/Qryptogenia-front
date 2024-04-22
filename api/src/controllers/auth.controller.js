import prisma from "../lib/prisma.js";
import { useSend } from "../utils/useSend.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { sendVerificationEmail } from "../services/mail.service.js";

export const register = async (req, res) => {
  const { email } = req.body;

  const existingUser = await prisma.user.findUnique({
    where: { email: email },
  });
  //? Verificar tambien el estado del usuario por eliminacion
  if (existingUser) {
    return res.status(400).json(useSend("Ya existe"));
  }

  //! Verficar si el usuario ya tiene un preregistro

  //* Enviar el mail de verificación al cliente
  const tokenVerificacion = jwt.sign({ email: email }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRATION,
  });

  const mail = await sendVerificationEmail(email, tokenVerificacion);
  if (mail.accepted === 0) {
    return res(500).send({
      status: "error",
      message: "Error enviando mail de verificación",
    });
  }

  // ! Crear el registro del usuario en preregistro

  return res.status(200).json(useSend("Se ha enviado el correo electronico"));
};

export const verifyAccount = async (req, res) => {
  try {
    if (!req.params.token) {
      return res.status(500).json(useSend("El token no coincide"));
    }

    //! Decodicicar el token
    //- Verificar expiracion
    //- tomar el correo
    //- verificar el preregistro para saber si el token coincide con el recibido
    //? Dar el acceso
    //! Pasar a establecer el registro en user

    res.status(200).json(useSend("Melo en verifyAccount"));
  } catch (err) {
    res.status(500).json(useSend("Error in server", err));
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

    //! Implemtar la encriptacion para descomentarear
    // const isMatch = await bcrypt.compare(password, user.password);
    // if (!isMatch) {
    //   return res.status(400).json(useSend("Invalid credentials."));
    // }
    // Suponiendo que 'password' es la contraseña ingresada por el usuario y 'user.password' es la contraseña almacenada en la base de datos.
    if (password !== user.password) {
      return res.status(400).json(useSend("Invalid credentials."));
    }

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
        useSend("Successfully login admin", {
          //? Puede ser una opcion obtener la info por el middleware
          user: {
            rol: user.rol.name,
            // isLoggedIn: user.isLoggedIn,
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
