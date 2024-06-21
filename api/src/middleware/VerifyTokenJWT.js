import jwt from "jsonwebtoken";
import prisma from "../lib/prisma.js";

const NO_AUTH_TOKEN = "No authentication token, authorization denied.";
const TOKEN_VERIFICATION_FAILED = "Token verification failed, authorization denied.";
const USER_DOESNT_EXIST = "User doesn't exist, authorization denied.";

const sendErrorResponse = (res, message) => {
  return res.status(401).json({
    success: false,
    result: null,
    message: message,
    jwtExpired: true,
  });
};

const VerifyTokenJWT = async (req, res, next) => {
  try {
    const token = req.cookies.token;

    if (!token) return sendErrorResponse(res, NO_AUTH_TOKEN);

    const verified = jwt.verify(token, process.env.JWT_SECRET);

    if (!verified) return sendErrorResponse(res, TOKEN_VERIFICATION_FAILED);

    const user = await prisma.user.findUnique({
      where: { id: verified.id },
    });

    if (!user) return sendErrorResponse(res, USER_DOESNT_EXIST);

    req.userId = user.id;
    next();
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