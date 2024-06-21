import { Router } from "express";
import authRoutes from "./auth.routes.js";
import userRoutes from "./user.routes.js";
import userQrRoutes from "./userQr.routes.js";
import adminRoutes from "./admin.routes.js";
import musicRoutes from "./music.routes.js"
import storeRoutes from "./store.routes.js"

import VerifyTokenJWT from "../middleware//VerifyTokenJWT.js";
import Authorization from "../middleware/Authorization.js";

const routes = Router();

routes.use("/auth", authRoutes);
routes.use("/user", VerifyTokenJWT, userRoutes);
routes.use("/qr/user", userQrRoutes);
routes.use("/admin", VerifyTokenJWT, adminRoutes); 

//* RUTAS PARA CLIENTES
routes.use(musicRoutes);  // Usa las rutas de música
routes.use(storeRoutes)
//* RUTAS PARA NO AUTENTICADOS

export default routes;
