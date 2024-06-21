import express from "express";
// import {getUsers} from "../controllers/admin.controller.js"
import {getUsers}  from "../controllers/admin/admin.controller.js";

const router = express.Router();

router.get("/users", getUsers);
// router.get("user/change-state", userStateChange);
// router.get("user/:id", getUserInfo);

// router.get("qrs", getQrs);

// router.get("membership-plans", getMemberships);
// router.post("membership-plans", createMembership);
// router.get("membership-plans/:id", getMembership);


export default router;
