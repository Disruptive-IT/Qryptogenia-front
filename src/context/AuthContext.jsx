import { createContext, useContext, useState, useEffect } from "react";
import { useAuth } from '../hooks/useAuth';
import { useNavigate } from 'react-router-dom';

export const AuthContext = createContext();

export const useAuthContext = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuthContext must be used within an AuthProvider');
    }
    return context;
};

export const AuthProvider = ({ children }) => {
    const navigate = useNavigate();
    const auth = useAuth(navigate);  // Contiene funciones como checkToken y getProfileImageUrl
    const [profileImage, setProfileImage] = useState('');

    const loadProfileImage = async () => {
        try {
            const imageUrl = await auth.getProfileImageUrl();
            setProfileImage(imageUrl);
        } catch (error) {
            console.error('Error loading profile image:', error);
        }
    };

    useEffect(() => {
        loadProfileImage();
    }, []);

    useEffect(() => {
        auth.checkToken();  // Supone que checkToken está memorizado usando useCallback en useAuth
    }, [auth.checkToken]);

    return (
        <AuthContext.Provider value={{ ...auth, profileImage, updateProfileImage: loadProfileImage }}>
            {children}
        </AuthContext.Provider>
    );
};
