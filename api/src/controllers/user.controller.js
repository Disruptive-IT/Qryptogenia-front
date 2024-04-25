import prisma from "../lib/prisma.js";
import { useSend } from "../utils/useSend.js";
import cloudinary from 'cloudinary';
const bcrypt = import('bcryptjs');

const checkPassword = async (user, password) => {
  try {
    // Comparar la contraseña proporcionada con la contraseña almacenada en la base de datos usando bcrypt
    const match = await bcrypt.compare(password, user.password);

    // Si las contraseñas coinciden, devolver true; de lo contrario, devolver false
    return match;
  } catch (error) {
    console.error('Error checking password:', error);
    throw new Error('Failed to check password');
  }
};


cloudinary.config({
  cloud_name: 'db4rqcf3o',
  api_key: '668756849283491',
  api_secret: 'Mb2UbGHFALvahWlVuud0tBKmDYQ'
});



export const getUsers = async (req, res) => {
  try {
    const users = await prisma.user.findMany();
    res.status(200).json(users);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Failed to get users!" });
  }
};

//* getUser se ejecuta entre las renderizaciones del sitio, asegurando que se acceda a los datos del usuario después de una verificación exitosa del token por parte del middleware. Esto es para la persistencia del estado autenticado del usuario, tambien hace mas facil el acceso a los datos del usuario en diferentes partes de la aplicación sin necesidad de realizar verificaciones adicionales
export const getUser = async (req, res) => {
  try {
    const _user = await prisma.user.findUnique({
      where: { id: req.userId, state: true },
      select: {
        profile_picture: true,
        username: true,
        email: true,
        rol: true,
      },
    });

    const user = {
      ..._user,
      rol: _user.rol.name,
    };

    res.status(200).json(useSend("", user));
  } catch (err) {
    res.status(500).json(useSend("Failed to get user!"));
  }
};

export const getImage = async (req, res) => {
  try {
    const user = await prisma.user.findUnique({
      where: { id: req.userId, state: true },
      select: {
        profile_picture: true,
      },
    });

    // Si el usuario existe y tiene una imagen de perfil, devolvemos la URL de la imagen
    if (user && user.profile_picture) {
      res.status(200).json({ image_url: user.profile_picture });
    } else {
      res.status(404).json({ error: "User or profile picture not found" });
    }
  } catch (err) {
    res.status(500).json({ error: "Failed to get user!" });
  }
};


export const changeProfilePicture = async (req, res) => {
  try {
    const userId = req.userId;
    const user = await prisma.user.findUnique({
      where: { id: userId },
    });

    const file = req.file;
    if (!file) {
      return res.status(400).json({ error: 'No file provided' });
    }

    // Subir el archivo a Cloudinary
    const cloudinaryResponse = await cloudinary.uploader.upload(file.path);

    // Obtener la URL de la imagen subida desde Cloudinary
    const imageUrl = cloudinaryResponse.secure_url;

    // Actualizar la URL de la imagen de perfil en la base de datos
    await prisma.user.update({
      where: { id: userId },
      data: { profile_picture: imageUrl },
    });

    // Devolver la URL de la imagen actualizada como respuesta
    return res.status(200).json({ image_url: imageUrl });
  } catch (error) {
    console.error('Error changing profile picture:', error);
    return res.status(500).json({ error: 'Failed to change profile picture' });
  }
};

export const changeUsername = async (req, res) => {
  try {
    // Extract user ID from request (assuming it's available)
    const userId = req.userId;

    // Fetch the user from the database
    const user = await prisma.user.findUnique({
      where: { id: userId },
    });

    // Check if user exists
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Get the new username and password from the request body
    const { new_username, password } = req.body;

    // Validate the new username (optional, add validation logic here)
    if (!new_username || new_username.trim() === '') {
      return res.status(400).json({ error: 'Invalid username' });
    }

    // Verify the password
    if (!password || !checkPassword(user, password)) {
      return res.status(400).json({ error: 'Incorrect password' });
    }

    // Update the username in the database
    await prisma.user.update({
      where: { id: userId },
      data: { username: new_username },
    });

    // Return success message
    return res.status(200).json({ success: 'Username changed successfully' });
  } catch (error) {
    console.error('Error changing username:', error);
    return res.status(500).json({ error: 'Failed to change username' });
  }
};


export const updateUser = async (req, res) => {
  // Recibir req
  // Vlidaciones?
  try {
    // Realizar consulta update
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Failed to update user!" });
  }
};

export const deleteUser = async (req, res) => {
  const id = req.params.id;
  try {
    await prisma.user.delete({
      where: { id },
    });
    res.status(200).json({ message: "User deleted" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Failed to delete users!" });
  }
};

export const createUser = async (req, res) => {
  let { email, password, rolId } = req.body;
  try {
    await prisma.user.create({
      data: {
        email,
        password,
        rolId,
      },
    });
    res.status(200).json({ message: "User Create" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Failed to create users!" });
  }
};
