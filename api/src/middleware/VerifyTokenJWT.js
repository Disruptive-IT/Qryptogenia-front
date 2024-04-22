import jwt from "jsonwebtoken";
import prisma from "../lib/prisma.js";
import { useSend } from "../utils/useSend.js";

const VerifyTokenJWT = async (req, res, next) => {
  try {
    const token = req.cookies.token;
    // res.status(201).json(useSend("Token ", verified));

    if (!token)
      return res.status(401).json({
        success: false,
        result: null,
        message: "No authentication token, authorization denied.",
        jwtExpired: true,
      });

    const verified = jwt.verify(token, process.env.JWT_SECRET);

    if (!verified)
      return res.status(401).json({
        success: false,
        result: null,
        message: "Token verification failed, authorization denied.",
        jwtExpired: true,
      });

    const user = await prisma.user.findUnique({
      where: { id: verified.id },
    });

    if (!user)
      return res.status(401).json({
        success: false,
        result: null,
        message: "User doesn't exist, authorization denied.",
        jwtExpired: true,
      });
    else {
      req.userId = user.id;
      next();
    }
  } catch (err) {
    res.status(503).json({
      success: false,
      result: null,
      message: err.message,
      error: err,
    });
  }
};
export default VerifyTokenJWT;
