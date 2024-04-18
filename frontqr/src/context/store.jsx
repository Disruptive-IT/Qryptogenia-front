import { AuthProvider } from "./AuthContext";

export const Store = ({ children }) => {
    return (
        <AuthProvider>
            {children}
        </AuthProvider>
    ); 
};