import prisma from "../lib/prisma.js";


export const getUsers = async (req, res) => {
  try {
    const users = await prisma.user.findMany();
    res.status(200).json(users);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Failed to get users!" });
  }
};

export const getUser = async (req, res) => {
  const id = req.params.id;
  try {
    const user = await prisma.user.findUnique({
      where: { id },
    });
    res.status(200).json(user);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Failed to get user!" });
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
