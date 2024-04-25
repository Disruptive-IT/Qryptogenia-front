import express from "express";
import {
  getUsers,
  getUser,
  updateUser,
  deleteUser,
  createUser,
  getImage,
  changeProfilePicture,
  changeUsername,
  changePassword
} from "../controllers/user.controller.js";

const router = express.Router();
//! Especificar la ruta para obtener todos los usuarios, no puede ser "/"
// router.get("/", getUsers);
router.get("/", getUser);
router.post("/", createUser);
router.put("/:id", updateUser);
router.delete("/:id", deleteUser);
router.get("/get_image", getImage);
router.post("/change_picture", changeProfilePicture);
router.post("/change_username", changeUsername);
router.post("/change_password", changePassword);


export default router;
