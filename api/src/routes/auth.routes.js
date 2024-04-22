import express from "express";
import { login, logout, register, verifyAccount } from "../controllers/auth.controller.js";

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.get("/logout", logout);
router.get("/verificar/:token", verifyAccount);

export default router;