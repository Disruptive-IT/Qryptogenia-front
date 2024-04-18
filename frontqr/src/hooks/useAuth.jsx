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
            if (user.is_staff) {
                navigate("/admin/");
            } else {
                navigate("/user/");
            }
        }
        stopLoading();
    }, [user]);

    async function fetchUserData() {
        try {
            startLoading();
            const response = await axios.get('/verify-auth/');
            if (response.data.IsAuthenticated) {
                setUser(response.data.user);
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

    useEffect(() => {
        fetchUserData();
    }, []);

    async function logoutUser() {
        try {
            const response = await axios.get('/logout/');
            navigate("/login")
        } catch (error) {
            console.error('Error al cerrar sesión:', error);
        }
    }

    async function loginUser(values) {
        try {
            const res = await axios.post('/auth/login/', values);
            toast.success(res.data)
            // * Llamar al fecth para que a demas de verificar el token obtenga la info del usuario
            fetchUserData()
            return { success: true };
        } catch (error) {
            // * Error está en error.response.data.credentials
            if (error.response && error.response.status === 400) {
                let errorData = error.response.data.credentials;
                // * errorData es un array con el mensaje de error
                toast.error(errorData[0]);
                return { success: false };
            } else {
                return { success: false };
            }
        }
    }

    const registerUser = async (values) => {
        try {
            const response = await axios.post('/register/', values);
            toast.success("Verification email successfully sent");
            return { success: true };
        } catch (error) {
            // * Error está en error.response.data.tipoError
            // * El error puede ser de tipo credenciasles o tipo verificacion
            if (error.response && error.response.status === 400) {
                let errorData = error.response.data;
                if (errorData.credentials) {
                    const credentialsErrorMessage = errorData.credentials;
                    toast.error(credentialsErrorMessage);
                    return { success: false, errorType: 'credentials' };
                }
                if (errorData.verif && !errorData.credentials) {
                    const verifErrorMessage = errorData.verif;
                    return { success: false, errorType: 'verif', verifErrorMessage };
                }
            }
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

    const changePassword = async (newPassword, oldPassword, accessToken) => {
        try {
            const response = await axios.post('change_password/', {
                old_password: oldPassword,
                new_password: newPassword,
            }, {
                headers: {
                    Authorization: `Bearer ${accessToken}` // Incluir el token de autenticación en el encabezado Authorization
                }
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

    return {
        user,
        loginUser,
        registerUser,
        logoutUser,
        recoverPassword,
        forgotPassword,
        getUsersData,
        changePassword
    };
};