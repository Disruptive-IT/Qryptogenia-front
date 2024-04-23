import axios from "../libs/axios";
import { useEffect, useState } from "react";
import { toast } from 'sonner';
import { useLoader } from '../context/LoaderContext';

export const useAuth = (navigate) => {
    const [user, setUser] = useState(null);
    const { startLoading, stopLoading } = useLoader();

    useEffect(() => {
        startLoading();
        if (user) {
            if (user.rol === "ADMIN") {
                navigate("/admin/");
            } else {
                navigate("/user/");
            }
        }
        stopLoading();
    }, [user]);

    useEffect(() => {
        async function verifyAuth() {
            try {
                startLoading();
                const res = await axios.get('user/');
                if (res.data.info) {
                    setUser(res.data.info);
                } else {
                    setUser(null);
                    logoutUser()
                }
            } catch (error) {
                console.error('Error verifying token:', error);
                logoutUser()
            } finally {
                stopLoading();
            }
        };
    }, [user]);

    async function logoutUser() {
        try {
            const res = await axios.get('/auth/logout/');
            toast.success(res.data.msg)
            setUser(null)
            navigate("/login")
        } catch (err) {
            toast.error(err.response.data.msg)
        }
    }

    async function loginUser(values) {
        try {
            const res = await axios.post('/auth/login', values);
            toast.success(res.data.msg)
            setUser(res.data.info.user);
            return { success: true };
        } catch (err) {
            toast.error(err.response.data.msg)
        }
    }

    const registerUser = async (email) => {
        try {
            const res = await axios.post('/auth/register', { email: email });
            toast.info(res.data.msg);
            return { success: true };
        } catch (err) {
            toast.error(err.response.data.msg);
        }
    };

    const verifyPin = async ({ pin, email }) => {
        try {
            const res = await axios.post('/auth/confirm', { pin, email });
            toast.success(res.data.msg);
            return { success: true };
        } catch (err) {
            toast.error(err.response.data.msg);
            return { success: false };
        }
    };

    const completeRegister = async (values) => {
        try {
            const res = await axios.post('/auth/complete-register', values);
            toast.success(res.data.msg);
            return { success: true };
        } catch (err) {
            toast.error(err.response.data.msg);
            return { success: false };
        }
    };

    const recoverPassword = async (password, token) => {
        try {
            const response = await axios.post('/password_reset/confirm/', {
                password,
                token,
            });
            if (response.status === 200) {
                return { success: true };
            }
        } catch (error) {
            console.error('Error changing password:', error);
            return { success: false };
        }
    };

    const forgotPassword = async (email) => {
        try {
            const response = await axios.post('/password_reset/', { email });
            if (response.status === 200) {
                return { success: true };
            }
        } catch (error) {
            console.error('Error sending recovery mail:', error);
            return { success: false, error };
        }
    };

    const getUsersData = async () => {
        try {
            const response = await axios.get('/users/');
            const data = response.data.users;
            return { success: true, data: data };
        } catch (error) {
            console.error('Error fetching data:', error);
            return { success: false, error: error };
        }
    };

    const changePassword = async (newPassword, oldPassword) => {
        try {
            const response = await axios.post('change_password/', {
                old_password: oldPassword,
                new_password: newPassword,
            });

            if (response.status === 200) {
                // Contraseña cambiada correctamente
                console.log('Contraseña cambiada correctamente');
                return { success: true };
            } else {
                // Manejar errores
                console.error('Error al cambiar la contraseña:', response.data);
                return { success: false, error: response.data };
            }
        } catch (error) {
            console.error('Error al cambiar la contraseña:', error);
            return { success: false, error: error.message };
        }
    }

    const changeUsername = async (new_username, password) => {
        if (!new_username) {
            // Manejar el caso cuando `newUsername` está vacío
            console.error('El nuevo nombre de usuario no puede estar vacío.');
            return { success: false, message: 'El nuevo nombre de usuario no puede estar vacío.' };
        }
        try {
            // Realizar la solicitud POST a la vista `change_username`
            const response = await axios.post('change_username/', {
                new_username,
                password,
            });

            // Comprobar si la respuesta indica éxito
            if (response.data.success) {
                // Realizar cualquier acción necesaria en caso de éxito
                console.log('Nombre de usuario cambiado correctamente');
                return { success: true, message: response.data.message, new_username };
            } else {
                // Manejar el error de cambio de nombre de usuario
                console.log('Error:', response.data.message);
                return { success: false, message: response.data.message };
            }
        } catch (error) {
            // Manejar errores inesperados en la solicitud
            console.error('Error inesperado:', error);
            return { success: false, message: 'Hubo un problema al cambiar el nombre de usuario.' };
        }
    }

    const changeProfilePicture = async (file) => {
        // Crea un objeto FormData para enviar el archivo
        const formData = new FormData();
        formData.append('profile_picture', file);

        try {
            // Realiza la solicitud POST al endpoint de Django
            const response = await axios.post('change_picture/', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                },
            });

            // Devuelve la respuesta si la solicitud es exitosa
            return {
                success: true,
                data: response.data,
            };
        } catch (error) {
            console.error('Error al cargar la imagen de perfil:', error);
            // Devuelve un error si algo falla
            return {
                success: false,
                error: error,
            };
        }
    };

    const getProfileImageUrl = async () => {
        try {
            // Realiza una solicitud GET al endpoint de backend que devuelve la URL de la imagen de perfil
            const response = await axios.get('get_profile_image/');
            // Retorna la URL de la imagen de perfil del usuario
            return response.data.image_url;
        } catch (error) {
            // Maneja errores y retorna null en caso de error
            console.error('Error obteniendo la URL de la imagen de perfil:', error);
            return null;
        }
    };

    return {
        user,
        loginUser,
        registerUser,
        completeRegister,
        verifyPin,
        logoutUser,
        recoverPassword,
        forgotPassword,
        getUsersData,
        changePassword,
        changeUsername,
        changeProfilePicture,
        getProfileImageUrl
    };
}