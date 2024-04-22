import express from "express";
import { login, logout, register, forgot_password, reset_password, reset_password2} from "../controllers/auth.controller.js";

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.post("/logout", logout);
router.post("/password_reset", forgot_password);
router.get("/password_reset/:id/:token", reset_password);
router.post("/password_reset/:id/:token", reset_password2);
export default router;