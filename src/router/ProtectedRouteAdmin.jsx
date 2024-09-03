import { useEffect } from "react";
import { Navigate, useNavigate, Outlet } from "react-router-dom";
import NotFoundPage from "../pages/NotFoundPage";
import { useAuthContext } from "../context/AuthContext";
import { useAuth } from "../hooks/useAuth";

/**
 * @Author : Jobserd Julián Ocampo, @date 2024-08-13 10:10:00
 * @description : Este componente `ProtectedRouteAdmin` es una ruta protegida para usuarios con rol de administrador. Utiliza el hook `useAuth` para verificar el token de autenticación y determinar si el usuario está autenticado y tiene el rol de "ADMIN". Si el usuario está autenticado y es un administrador, renderiza el componente `Outlet` para mostrar el contenido protegido. Si el usuario no tiene el rol adecuado, muestra una página de "No Encontrado" (`NotFoundPage`). Si el usuario no está autenticado, no renderiza ningún contenido.
 * @return : Renderiza `Outlet` si el usuario está autenticado y es un administrador; de lo contrario, muestra `NotFoundPage` o nada si no está autenticado.
**/

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