import express from "express";
import { login, logout, register, verifyAccount } from "../controllers/auth.controller.js";

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.get("/logout", logout);
router.get("/verificar/:token", verifyAccount);

router.post("/logout", logout);
router.post("/password_reset", forgot_password);
router.get("/password_reset/:id/:token", reset_password);
router.post("/password_reset/:id/:token", reset_password2);
export default router;