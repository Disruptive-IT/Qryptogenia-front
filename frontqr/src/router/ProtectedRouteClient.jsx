import {useEffect} from "react";
import { Navigate, Outlet, useNavigate } from "react-router-dom";
import {jwtDecode} from "jwt-decode";

const ProtectedRouteUser = (props) => {
  const token = localStorage.getItem("token"); //! Tomar de cookie
  const navigate = useNavigate();
  function presentPage() {
    navigate(-1);
  }

  if (!token) return <Navigate to="/" />;

  useEffect(()=>{
    if(token && jwtDecode(token).rol!== "CLIENT"){ 
      presentPage()
      }
  },[token && jwtDecode(token).rol!== "CLIENT"])

  const decodedData = jwtDecode(token);


  if (decodedData.rol === "CLIENT") {
    return <Outlet {...props} />;
  }
 else if(decodedData.rol!=="ADMIN"){
   presentPage()
  }
};

export default ProtectedRouteUser;