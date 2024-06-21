import prisma from "../../lib/prisma.js";
import { useSend } from "../../utils/useSend.js";

export const getUsers = async (req, res) => {
  try {
    const users = await prisma.user.findMany({
      select: {
        id: true,
        username: true,
        email: true,
        state: true,
        rol: {
          select: {
            name: true,
          },
        },
      },
    });
    const usersData = users.map((user) => ({
      id: user.id,
      username: user.username,
      email: user.email,
      state: user.state,
      rol: user.rol.name,
    }));

    res.status(200).json(usersData);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Failed to get users!" });
  }
};
