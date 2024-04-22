import prisma from "../lib/prisma.js";
import { useSend } from "../utils/useSend.js";
import bcrypt from 'bcrypt';
import nodemailer from 'nodemailer'
import jwt from 'jsonwebtoken'

const JWT_SECRET = "47a8ec4d8752b9be493521b340f0aa2b847b8bd51d0a051c925ff1fe768dfc79";

export const register = async (req, res) => {
  // const { names, last_names, email, password } = req.body;
  // Hashear la contraseña y crear el usuario
  try {
    res.status(201).json(useSend("Todo bien"));
  } catch (error) {
    console.log(error);
    res.status(500).json(useSend("Error in server", error));
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

export const logout = (req, res) => {
  // Limpiar el token y chao
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
