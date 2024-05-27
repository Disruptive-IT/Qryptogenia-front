import axios from "../libs/axios";
import { useEffect, useState } from "react";
import { toast } from 'sonner';
import { useLoader } from '../context/LoaderContext';

export const useAuth = (navigate) => {
    const [user, setUser] = useState(null);
    const { startLoading, stopLoading } = useLoader();

    // useEffect(() => {
    //     redirectUser(user);
    // }, [user]);

    // async function redirectUser(user) {
    //     if (user) {
    //         if (user.rol === "ADMIN") {
    //             navigate("/admin/dashboard");
    //         } else {
    //             navigate("/user/home");
    //         }
    //     }
    // }

    async function checkToken() {
        try {
            const res = await axios.get('/auth/check-token');
            if (res.data.user) {
                setUser(res.data.user);
            }
        } catch (error) {
            console.log('Check token MAL', error);
        }
    }

    const fetchUserData = async () => {
        try {
            const response = await axios.get('/user'); // Reemplaza '/api/user' con la ruta correcta en tu backend
            return response.data; // Suponiendo que el backend devuelve los datos del usuario en la propiedad 'data'
        } catch (error) {
            console.error('Error fetching user data:', error);
            throw error; // Maneja el error según sea necesario en tu aplicación
        }
    }



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
            const user = res.data.info.user
            setUser(user);
            if (user.rol === "ADMIN") {
                navigate("/admin/dashboard");
            } else {
                navigate("/user/home");
            }
            return { success: true };
        } catch (err) {
            toast.error(err.response.data.msg)
            return { success: false, showCaptcha: err.response.data.info };
        }
    }

    const registerUser = async (email) => {
        try {
            console.log("ANTES REGISTER")
            const res = await axios.post('/auth/register', { email: email });
            console.log("DESPUES REGISTER")
            toast.info(res.data.msg);
            return { success: true };
        } catch (err) {
            console.log("ERROR REGISTER ", err)
            toast.error(err.response.data.msg);
        }
    };

    const verifyPin = async ({ pin, email }) => {
        try {
            const res = await axios.post('/auth/confirm', { pin, email });
            console.log("llefa")
            toast.success(res.data.msg);
            return { success: true };
        } catch (err) {
            toast.error(err.response.data.msg);
        }
    };

    const completeRegister = async (values) => {
        try {
            const res = await axios.post('/auth/complete-register', values);
            return { success: true };
        } catch (err) {
            toast.error(err.response.data.msg);
        }
    };

    const recoverPassword = async (confirmPassword, token) => {
        try {
            console.log('Token enviado en la solicitud:', token);

            // Realizar la solicitud POST con el token como parte del cuerpo de la solicitud
            const response = await axios.post(`/auth/password_reset/confirm`, { token, confirmPassword });

            switch (response.status) {
                case 200:
                    return { success: true };
                // Manejo de otros códigos de estado aquí
                default:
                    return { success: false, message: 'Unknown error' };
            }
        } catch (error) {
            if (error.response) {
                // Error de respuesta HTTP
                console.error('Error response:', error.response.data);
                return { success: false, message: error.response.data };
            } else if (error.request) {
                // Error de solicitud HTTP
                console.error('Error request:', error.request);
                return { success: false, message: 'Network error' };
            } else {
                // Otro tipo de error
                console.error('Error:', error.message);
                return { success: false, message: 'Unknown error' };
            }
        }
    };



    const forgotPassword = async (email) => {
        try {
            const response = await axios.post('/auth/password_reset', { email });
            if (response.data.status === 'User not exists!') {
                // Si el usuario no existe en el servidor, mostrar un error
                return { success: false, error: 'E-mail not registered in our system' };
            } else {
                // Si el correo se envía correctamente, devolver éxito
                return { success: true };
            }
        } catch (error) {
            console.error('Error sending recovery email:', error);
            return { success: false, error: 'Error sending recovery email' }; // Manejar errores de red u otros errores
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
            const response = await axios.post('/user/change_password', {
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

    const changeUsername = async (newUsername, password) => {
        try {
            const response = await axios.post('/user/change_username', {
                new_username: newUsername,
                password: password
            });
            return response.data;
        } catch (error) {
            throw error.response.data;
        }
    };
    const changeProfilePicture = async (file) => {
        // Crea un objeto FormData para enviar el archivo
        const formData = new FormData();
        formData.append('profile_picture', file);

        try {
            // Realiza la solicitud POST al endpoint correcto en tu backend
            const response = await axios.post('/user/change_picture', formData, {
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
            const response = await axios.get('/user/get_image');
            // Retorna la URL de la imagen de perfil del usuario
            return response.data.image_url;
        } catch (error) {
            // Maneja errores y retorna null en caso de error
            console.error('Error obteniendo la URL de la imagen de perfil:', error);
            return null;
        }
    };

    const handleChangeEmail = async (values) => {
        try {
            const response = await axios.post('/user/change-email', { email: values.email });
            return response.data

        } catch (error) {
            console.error('Error changing email:', error);
        }
    };

    const handleVerifyCode = async (verificationCode) => {
        try {
            const response = await axios.post('/user/verify-account', { pin: verificationCode });
            return response.data

        } catch (error) {
            console.error('Error verifying code:', error);
        }
    };

    const handleChangeNewEmail = async (values) => {
        try {
            const response = await axios.post('/user/send-verify-new-email', { newEmail: values.newEmail });
            return response.data
        } catch (error) {
            console.error('Error changing email:', error);
        }
    };

    const handleVerifyNewCode = async (newVerificationCode) => {
        try {
            const response = await axios.post('/user/verify-new-email', { newPin: newVerificationCode });
            return response.data
        } catch (error) {
            console.error('Error verifying new code:', error);
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
        getProfileImageUrl,
        fetchUserData,
        handleChangeEmail,
        handleVerifyCode,
        handleChangeNewEmail,
        handleVerifyNewCode,
        checkToken
    };
}