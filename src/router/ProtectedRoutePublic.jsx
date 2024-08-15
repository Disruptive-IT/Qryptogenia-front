import { Navigate, useLocation, Outlet, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useAuth } from "../hooks/useAuth";
import NotFoundPage from "../pages/NotFoundPage";

/**
 * @Author : Jobserd Julián Ocampo, @date 2024-08-13 10:30:00
 * @description : Este componente `ProtectedRoutePublic` es una ruta protegida que permite el acceso a usuarios no autenticados o aquellos que no tienen el rol de "ADMIN" o "CLIENT". Utiliza el hook `useAuth` para verificar el token de autenticación del usuario. Si el usuario está autenticado y tiene rol de "ADMIN" o "CLIENT", se redirige a la página `NotFoundPage`. En caso contrario, se renderiza el componente `Outlet` para mostrar el contenido protegido. Esta configuración asegura que las rutas públicas no sean accesibles para usuarios con roles específicos.
 * @return : Renderiza `Outlet` si el usuario no está autenticado o no tiene roles restringidos; de lo contrario, muestra `NotFoundPage`.
**/

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
