import prisma from "../lib/prisma.js";
import { useSend } from "../utils/useSend.js";

export const getUsers = async (req, res) => {
  try {
    const users = await prisma.user.findMany();
    res.status(200).json(users);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Failed to get users!" });
  }
};

//* getUser se ejecuta entre las renderizaciones del sitio, asegurando que se acceda a los datos del usuario después de una verificación exitosa del token por parte del middleware. Esto es para la persistencia del estado autenticado del usuario, tambien hace mas facil el acceso a los datos del usuario en diferentes partes de la aplicación sin necesidad de realizar verificaciones adicionales
export const getUser = async (req, res) => {
  try {
    const _user = await prisma.user.findUnique({
      where: { id: req.userId, state: true },
      select: {
        profile_picture: true,
        username: true,
        email: true,
        rol: true,
      },
    });

    const user = {
      ..._user,
      rol: _user.rol.name,
    };

    res.status(200).json(useSend("", user));
  } catch (err) {
    res.status(500).json(useSend("Failed to get user!"));
  }
};

export const updateUser = async (req, res) => {
  // Recibir req
  // Vlidaciones?
  try {
    // Realizar consulta update
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Failed to update user!" });
  }
};

export const deleteUser = async (req, res) => {
  const id = req.params.id;
  try {
    await prisma.user.delete({
      where: { id },
    });
    res.status(200).json({ message: "User deleted" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Failed to delete users!" });
  }
};

export const createUser = async (req, res) => {
  let { email, password, rolId } = req.body;
  try {
    await prisma.user.create({
      data: {
        email,
        password,
        rolId,
      },
    });
    res.status(200).json({ message: "User Create" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Failed to create users!" });
  }
};
