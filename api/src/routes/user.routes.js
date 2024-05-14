import express from "express";
import {
  getUser,
  getImage,
  changeProfilePicture,
  changeUsername,
  changePassword
} from "../controllers/user.controller.js";

const router = express.Router();

router.get("/", getUser);
router.get("/get_image", getImage);
router.post("/change_picture", changeProfilePicture);
router.post("/change_username", changeUsername);
router.post("/change_password", changePassword);


export default router;
