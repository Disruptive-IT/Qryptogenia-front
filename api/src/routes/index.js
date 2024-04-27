import { Router } from "express";
import authRoutes from './auth.routes.js'
import userRoute from './user.routes.js'
import VerifyTokenJWT from "../middleware//VerifyTokenJWT.js";

const routes = Router()

// ! Configurar permisos desde las rutas
routes.use('/auth', authRoutes)
routes.use('/user', VerifyTokenJWT, userRoute) 

export default routes

