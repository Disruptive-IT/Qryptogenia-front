import { useEffect } from "react";
import { Navigate, useNavigate, Outlet } from "react-router-dom";
import { useAuthContext } from "../context/AuthContext";
import { useAuth } from "../hooks/useAuth";
import NotFoundPage from "../pages/NotFoundPage";
/**
 * @Author : Jobserd Julián Ocampo, @date 2024-08-13 10:20:00
 * @description : Este componente `ProtectedRouteClient` es una ruta protegida para usuarios con rol de "CLIENTE". Utiliza el hook `useAuth` para verificar el token de autenticación y determinar si el usuario está autenticado y tiene el rol de "CLIENT". Si el usuario está autenticado y es un cliente, renderiza el componente `Outlet` para mostrar el contenido protegido. Si el usuario no tiene el rol adecuado, muestra una página de "No Encontrado" (`NotFoundPage`). Si el usuario no está autenticado, no renderiza ningún contenido.
 * @return : Renderiza `Outlet` si el usuario está autenticado y es un cliente; de lo contrario, muestra `NotFoundPage` o nada si no está autenticado.
**/

const ProtectedRouteClient = (props) => {
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
      if (user && user.rol === "CLIENT") {
          return <Outlet {...props} />;
      } else {
          return <NotFoundPage />;
      }
  }

  //* PARA NO ACCEDER SIN AUTH O CON ROLE NO CLIENT
  return null;
};


export default ProtectedRouteClient;