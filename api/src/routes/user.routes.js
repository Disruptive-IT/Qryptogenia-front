import express from "express";
import {
  getUsers,
  getUser,
  updateUser,
  deleteUser,
  createUser,
} from "../controllers/user.controller.js";

const router = express.Router();
//! Especificar la ruta para obtener todos los usuarios, no puede ser "/"
// router.get("/", getUsers);
router.get("/", getUser);
router.post("/", createUser);
router.put("/:id", updateUser);
router.delete("/:id", deleteUser);


export default router;
