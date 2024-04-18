import React, { useContext } from "react";
import { AuthContext } from "../../../context/AuthContext";

const UserInfo = () => {
    let { user } = useContext(AuthContext);

    // Verificar si el usuario está autenticado
    if (!user) {
        return <div>No hay usuario autenticado</div>;
    }
    console.log("Información del usuario:", user);

    // Renderizar la información del usuario
    return (
        <div>
            <p className="">Nombre de Usuario: {user.username}</p>
            <p className="">Email: {user.email}</p>
            <p className="">
                Rol: {user.is_staff ? <span class="pl-1">Administrador</span> : <span class="pl-1">Usuario</span>}
            </p>
        </div>
    );
};

export default UserInfo;