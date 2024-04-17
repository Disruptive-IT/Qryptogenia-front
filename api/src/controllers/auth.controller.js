import prisma from "../lib/prisma.js";
import { useSend } from "../utils/useSend.js";

export const register = async (req, res) => {
    // const { names, last_names, email, password } = req.body;
    // Hashear la contraseña y crear el usuario
    try {
        res.status(201).json(useSend('Todo bien'))
    } catch (error) {
        console.log(error)
        res.status(500).json(useSend('Error in server', error))
    }
    
};

export const login = async (req, res) => {
  const { email, password } = req.body;

    // Validar si el ususario existe
    // Validar si la contraseña es correcta
    // Generar token y dar acceso
};

export const logout = (req, res) => {
    // Limpiar el token y chao
};

