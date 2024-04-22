import prisma from "../lib/prisma.js";
import { useSend } from "../utils/useSend.js";
import bcrypt from 'bcrypt';
import nodemailer from 'nodemailer'
import jwt from 'jsonwebtoken'

const JWT_SECRET = "47a8ec4d8752b9be493521b340f0aa2b847b8bd51d0a051c925ff1fe768dfc79";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { sendVerificationEmail } from "../services/mail.service.js";

export const register = async (req, res) => {
  // const { names, last_names, email, password } = req.body;
  // Hashear la contraseña y crear el usuario
  try {
    res.status(201).json(useSend("Todo bien"));
  } catch (error) {
    console.log(error);
    res.status(500).json(useSend("Error in server", error));
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
  //   const { email, password } = req.body;
  console.log("HOLA");
  try {
    console.log("LLEGA AL BACK");
    res.status(201).json(useSend("Todo bien"));
  } catch (error) {
    console.log(error);
    res.status(500).json(useSend("Error in server", error));
  }
  // Validar si el ususario existe
  // Validar si la contraseña es correcta
  // Generar token y dar acceso
};
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
  // Limpiar el token y chao
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
    const oldUser = await prisma.user.findUnique({ where: { email } });
    if (!oldUser) {
      return res.json({ status: "User not exists!" });
    }

    const secret = JWT_SECRET + oldUser.password;
    const token = jwt.sign({ email: oldUser.email, id: oldUser.id }, secret, {
      expiresIn: "10m",
    });
    const link = `http://localhost:5173/password_reset/${oldUser.id}/${token}`;
    console.log("Link de restablecimiento de contraseña:", link); // Agrega este console log para verificar el link

    // Configuración del transporte de correo
    var transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: 'jaidercgz02@gmail.com', // Reemplaza con tu correo electrónico
        pass: 'wjskeqagfpwjhheb', // Reemplaza con tu contraseña
      }
    });
    
    // Opciones del correo
    var mailOptions = {
      from: 'jaidercgz02@gmail.com', // Reemplaza con tu correo electrónico
      to: email, // Utilizar el correo electrónico proporcionado en la solicitud
      subject: 'password reset',
      text: link
    };

    // Intentar enviar el correo
    transporter.sendMail(mailOptions, function(error, info){
      if (error) {
        console.log("Error sending email:", error); // Agrega un console log para verificar errores
        return res.json({ status: "Error sending email" });
      } else {
        console.log('Email sent: ' + info.response); // Agrega un console log para verificar si el correo se envió correctamente
        return res.json({ status: "Email sent successfully" });
      }
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ status: "Internal server error" });
  }
};

export const reset_password = async (req, res) => {
  const { id, token } = req.params;
  const oldUser = await prisma.user.findOne({ where: { id } });
  if (!oldUser){
    return res.json({ status: "User not exist" });
  }
  const secret = JWT_SECRET + oldUser.password;
  try {
    const verify = jwt.verify(token, secret);
    return res.json({ email: verify.email, status: "not verify" });
  } catch (error) {
    console.error(error);
    return res.json({ status: "Invalid or expired token" });
  }
};


export const reset_password2 = async (req, res) => {
  const { id, token } = req.params;
  const { password } = req.body;

  const oldUser = await prisma.user.findOne({ where: { id } });
  if (!oldUser) {
    return res.json({ status: "User not found" });
  }
  const secret = JWT_SECRET + oldUser.password;
  try {
    const verify = jwt.verify(token, secret);
    const encryptedPass = await bcrypt.hash(password, 10);
    await prisma.user.update({
      where: { id },
      data: { password: encryptedPass }
    });
    return res.json({ status: "Password updated" });
  } catch (error) {
    console.error(error);
    return res.json({ status: "Something went wrong" });
  }
};
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

