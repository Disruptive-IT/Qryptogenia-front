import { createContext, useContext} from "react";
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

    return (
        <AuthContext.Provider value={auth}>
            {children}
        </AuthContext.Provider>
    );
};
