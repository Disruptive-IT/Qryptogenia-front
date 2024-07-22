import { useEffect } from "react";
import { Navigate, useNavigate, Outlet } from "react-router-dom";
import NotFoundPage from "../pages/NotFoundPage";
import { useAuthContext } from "../context/AuthContext";
import { useAuth } from "../hooks/useAuth";

const ProtectedRouteAdmin = (props) => {
    const { user, checkToken } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        const fetchToken = async () => {
            await checkToken();
        };
        fetchToken();
    }, []);

    const isAuthenticated = user && user.rol;

    if (isAuthenticated) {
        if (user && user.rol === "ADMIN") {
            return <Outlet {...props} />;
        } else {
            return <NotFoundPage />;
        }
    }

    //* PARA NO ACCEDER SIN AUTH O CON ROLE NO ADMIN
    return null;
};

export default ProtectedRouteAdmin; 