import prisma from "../lib/prisma.js";
import { useSend } from "../utils/useSend.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

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

    //! Ya encriptada
    // const isMatch = await bcrypt.compare(password, user.password);
    // if (!isMatch) {
    //   return res.status(400).json(useSend("Invalid credentials."));
    // }
    // Suponiendo que 'password' es la contraseña ingresada por el usuario y 'user.password' es la contraseña almacenada en la base de datos.
    if (password !== user.password) {
      return res.status(400).json(useSend("Invalid credentials."));
    }

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
