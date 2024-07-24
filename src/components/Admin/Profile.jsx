/**
 * @Author : Cristian Escobar,   @date 2024-07-24 08:53:25
 * @description : Este componente UserProfileMenu proporciona un menú desplegable accesible a través de un avatar de usuario. El menú incluye opciones para navegar al perfil del usuario, ver los QR codes y cerrar sesión.
 * @Props : No recibe props directamente, pero utiliza el contexto de autenticación para obtener la información del usuario, la imagen de perfil y la función de cierre de sesión.
 * @return : Un componente que muestra un avatar de usuario, al hacer clic se despliega un menú con opciones para navegar al perfil, ver los QR codes y cerrar sesión.
 */

import React, { useState, useContext, useEffect } from 'react';
import { Tooltip, IconButton, Avatar, Menu, MenuItem, Typography } from '@mui/material';
import { AuthContext } from "../../context/AuthContext";
import { Link as RouterLink } from 'react-router-dom';

export default function UserProfileMenu() {
    let { user, logoutUser, profileImage } = useContext(AuthContext)
    const [anchorElUser, setAnchorElUser] = React.useState(null);

    const handleOpenUserMenu = (event) => {
        setAnchorElUser(event.currentTarget);
    };

    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };

    return (
        <>
            <Tooltip title="Abrir Perfil">
                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                    <Avatar alt={profileImage} src={profileImage} sx={{width: '30px', height: '30px'}} />
                </IconButton>
            </Tooltip>
            <Menu
                id="menu-appbar"
                anchorEl={anchorElUser}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'left',
                }}
                open={Boolean(anchorElUser)}
                onClose={handleCloseUserMenu} 
            >
                <MenuItem onClick={handleCloseUserMenu}>
                    <RouterLink to="/user/profile" style={{ textDecoration: 'none', color: 'inherit' }}>
                        <Typography textAlign="center">Profile</Typography>
                    </RouterLink>
                </MenuItem>
                <MenuItem onClick={handleCloseUserMenu}>
                    <RouterLink to="/user/qr" style={{ textDecoration: 'none', color: 'inherit' }}>
                        <Typography textAlign="center">Qr's</Typography>
                    </RouterLink>
                </MenuItem>
                <MenuItem onClick={handleCloseUserMenu}>
                        <Typography textAlign="center" onClick={logoutUser}>Logout</Typography>
                </MenuItem>
            </Menu>
        </>
    );
}
