import { Router } from "express";
import authRoutes from './auth.routes.js'
import userRoute from './user.routes.js'

const routes = Router()

// ! Configurar permisos desde las rutas
routes.use('/auth', authRoutes)
routes.use('/user', userRoute )

export default routes

