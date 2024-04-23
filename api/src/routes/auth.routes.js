import express from "express";
import {
  login,
  logout,
  register,
  completeRegister,
  verifyAccount
} from "../controllers/auth.controller.js";

const router = express.Router();

router.post("/register", register);
router.post("/complete-register", completeRegister);
router.post("/login", login);
router.get("/logout", logout);
router.post("/confirm", verifyAccount);


export default router;
