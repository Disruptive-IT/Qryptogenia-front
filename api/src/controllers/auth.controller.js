import prisma from "../lib/prisma.js";
import { useSend } from "../utils/useSend.js";
import bcrypt from "bcryptjs";
import nodemailer from "nodemailer"
import jwt from 'jsonwebtoken';
import { sendVerificationEmail } from "../services/mail.service.js";
import { sendRecoverEmail } from "../services/mail.recover.js";

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


export const forgot_password = async (req, res) => {
  const { email } = req.body;
  try {
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) {
      return res.status(404).send({ error: "User not existed" });
    }
    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: "1d" });
    
    // Llamada a la función sendRecoverEmail en lugar de configurar el transporte y enviar el correo directamente
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



export const recoverPassword = async (req, res) => {
  const { id, token } = req.params;
  const { confirmPassword } = req.body;

  try {
    console.log('Password:', confirmPassword); // Verifica el valor de la contraseña
  
    // Verificar el token
    jwt.verify(token, process.env.JWT_SECRET, async (err, decoded) => {
      if (err) {
        return res.json({ Status: "error with token" });
      } else {
        // Generar hash de la nueva contraseña
        const saltRounds = 10; // Número de rondas de hashing
        const hashedPassword = await bcrypt.hash(confirmPassword, saltRounds); // Usar confirmPassword en lugar de password

        // Actualizar la contraseña en la base de datos
        await prisma.user.update({
          where: { id: id },
          data: { password: hashedPassword }
        });

        res.send({ Status: "Success" });
      }
    });
  } catch (error) {
    res.send({ Status: "Error", message: error.message });
  }
};
















// export const forgot_password = async (req, res) => {
//   const { email } = req.body;
//   try {
//     const oldUser = await prisma.user.findUnique({ where: { email } });
//     if (!oldUser) {
//       return res.json({ status: "User not exists!" });
//     }
//     const secret = process.env.JWT_SECRET + oldUser.password;
//     console.log("Valor de JWT_SECRET en forgot_password:", process.env.JWT_SECRET);

//     const token = jwt.sign({ email: oldUser.email, id: oldUser.id }, secret, {
//       expiresIn: "1h", // Cambiar a una hora de expiración
//     });
//     const resetLink = `http://localhost:5173/recoverPassword/${token}`;

//     // Configurar el transporte de correo
//     const transporter = nodemailer.createTransport({
//       service: 'gmail',
//       auth: {
//         user: process.env.EMAIL_HOST_USER,
//         pass: process.env.EMAIL_HOST_PASSWORD,
//       }
//     });
    
//     // Configurar el contenido del correo electrónico
//     const mailOptions = {
//       from: process.env.EMAIL_HOST_USER,
//       to: email,
//       subject: 'Recuperación de contraseña',
//       html: `<p>Hola ${oldUser.username},</p>
//              <p>Has solicitado restablecer tu contraseña. Haz clic en el siguiente enlace para continuar:</p>
//              <a href="${resetLink}">${resetLink}</a>
//              <p>Si no solicitaste este cambio, puedes ignorar este correo electrónico.</p>`
//     };

//     // Intentar enviar el correo electrónico
//     transporter.sendMail(mailOptions, function(error, info){
//       if (error) {
//         console.error("Error sending email:", error);
//         return res.json({ status: "Error sending email" });
//       } else {
//         console.log('Email sent: ' + info.response);
//         return res.json({ status: "Email sent successfully" });
//       }
//     });
//   } catch (error) {
//     console.error(error);
//     return res.status(500).json({ status: "Internal server error" });
//   }
// };



// export const reset_password2 = async (req, res) => {
//   const { token } = req.params;
//   const { password } = req.body;

//   try {
//     const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
//     const userId = decodedToken.id;

//     const oldUser = await prisma.user.findUnique({ where: { id: userId } });
//     if (!oldUser) {
//       return res.status(404).json({ status: "User not found" });
//     }

//     const encryptedPassword = await bcrypt.hash(password, 10);

//     // Actualizar la contraseña del usuario en la base de datos
//     await prisma.user.update({
//       where: { id: userId },
//       data: { password: encryptedPassword },
//     });

//     res.json({ status: "Password updated" });
//   } catch (error) {
//     console.error("Error verifying token:", error);
//     res.status(500).json({ status: "Internal server error" });
//   }
// };



