import { useEffect } from "react";
import { Navigate, useNavigate, Outlet } from "react-router-dom";
import { useAuthContext } from "../context/AuthContext";
import { useAuth } from "../hooks/useAuth";
import NotFoundPage from "../pages/NotFoundPage";

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