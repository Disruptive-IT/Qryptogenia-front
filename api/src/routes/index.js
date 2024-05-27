import { Router } from "express";
import authRoutes from "./auth.routes.js";
import userRoutes from "./user.routes.js";
import adminRoutes from "./admin.routes.js";

import VerifyTokenJWT from "../middleware//VerifyTokenJWT.js";
import Authorization from "../middleware/Authorization.js";

const routes = Router();

routes.use("/auth", authRoutes);
routes.use("/user", VerifyTokenJWT, userRoutes); //? Indica las rutas para los autenticados (ADMIN, CLIENTE)
routes.use("/admin", VerifyTokenJWT, adminRoutes); 

//* RUTAS PARA CLIENTES
//* RUTAS PARA NO AUTENTICADOS

export default routes;
