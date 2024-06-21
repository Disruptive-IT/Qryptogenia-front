import express from "express";
import { getQrs, save } from "../controllers/user/qr.controller.js";

const router = express.Router();

router.post("/save", save);
router.get("/userId", getQrs);

export default router;
