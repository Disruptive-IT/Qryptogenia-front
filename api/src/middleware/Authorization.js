import roles from "../helpers/roles.js";
import prisma from "../lib/prisma.js";

const Authorization = (requiredRole) => {
  return async (req, res, next) => {
    try {
      const userId = req.userId;

      const user = await prisma.user.findUnique({
        where: { id: userId, state: true },
      });

      const userRole = user.rol.name;
      if (roles[userRole].includes(requiredRole)) {
        next();
      } else {
        return res.status(403).json({ message: "Unauthorized access" });
      }
    } catch (error) {
      return res.status(500).json({ message: "Internal server error" });
    }
  };
};

export default Authorization;
