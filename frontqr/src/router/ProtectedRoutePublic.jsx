import { Navigate, useLocation, Outlet } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

const ProtectedRoutePublic = (props) => {
    const token = localStorage.getItem("token"); //! Tomar de cookie
    const location = useLocation();

    const isAuthenticated = token && jwtDecode(token).rol;

    if (isAuthenticated) { //? Se produce delay al implementar navigate(-1);
        const userRole = jwtDecode(token).rol;
        if (userRole === "ADMIN") {
            return <Navigate to="/admin/dashboard" state={{ from: location }} replace />;
        } else if (userRole === "CLIENT") {
            return <Navigate to="/user/home" state={{ from: location }} replace />;
        }
    }
    return <Outlet {...props} />;
};

export default ProtectedRoutePublic;
