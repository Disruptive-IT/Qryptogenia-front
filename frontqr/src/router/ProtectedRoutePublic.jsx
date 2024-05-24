import { Navigate, useLocation, Outlet, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useAuth } from "../hooks/useAuth";
import NotFoundPage from "../pages/NotFoundPage";

const ProtectedRoutePublic = (props) => {
    const { user, checkToken } = useAuth();
    const location = useLocation();
    const navigate = useNavigate();

    useEffect(() => {
        const fetchToken = async () => {
            await checkToken();
        };
        fetchToken();
    }, []);

    const isAuthenticated = user && user.rol;

    if (isAuthenticated) {
        if (user.rol === "ADMIN" || user.rol === "CLIENT") {
            return <NotFoundPage />;
        } 
    }
    //* PARA QUE NO SE ACCEDA DESDE LA PARTE ADMIN
    return <Outlet {...props} />;

};

export default ProtectedRoutePublic;
