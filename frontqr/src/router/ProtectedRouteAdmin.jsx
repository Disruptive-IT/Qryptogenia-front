import { useEffect } from "react";
import { Navigate, Outlet, useNavigate } from "react-router-dom";
import {jwtDecode} from "jwt-decode";

const ProtectedRouteAdmin = (props) => {
    //? Se tomó la cookie en el servidor pero al momento de implementar la misma logica da error o no funciona de la misma forma
    const token = localStorage.getItem("token"); 
    const navigate = useNavigate();
    
    function presentPage() {
        navigate(-1);
    }

    if (!token) return <Navigate to="/" />;

    useEffect(() => {
        if (token && jwtDecode(token).rol !== "ADMIN") {
            presentPage()
        }
    }, [token && jwtDecode(token).rol !== "ADMIN"])

    const decodedData = jwtDecode(token);


    if (decodedData.rol === "ADMIN") {
        return <Outlet {...props} />;
    }
    else if (decodedData.rol !== "ADMIN") {
        presentPage()
    }
};

export default ProtectedRouteAdmin;