import { createContext, useContext, useState, useEffect} from "react";
import { useAuth } from '../hooks/useAuth';
import { useNavigate } from 'react-router-dom';

export const AuthContext = createContext();

export const useAuthContext = ()=>{
    const context = useContext(AuthContext)
    return context
}

export const AuthProvider = ({ children }) => {
    const navigate = useNavigate();
    const auth = useAuth(navigate);
    const [profileImage, setProfileImage] = useState('');
    const { getProfileImageUrl } = auth;

    // Función para cargar la imagen de perfil
    const loadProfileImage = async () => {
        const imageUrl = await getProfileImageUrl();
        setProfileImage(imageUrl);
    };

    // Cargar la imagen de perfil cuando el componente se monte
    useEffect(() => {
        loadProfileImage();
    }, []);

    // Función para actualizar la imagen de perfil
    const updateProfileImage = async () => {
        await loadProfileImage();
    };

    useEffect(() => {
        auth.checkToken();
    }, []);

    return (
        <AuthContext.Provider value={{...auth, profileImage, updateProfileImage}}>
            {children}
        </AuthContext.Provider>
    );
};
