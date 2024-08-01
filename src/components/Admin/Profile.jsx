/**
 * @Author : Cristian Escobar,   @date 2024-07-24 08:53:25
 * @description : Este componente UserProfileMenu proporciona un menú desplegable accesible a través de un avatar de usuario. El menú incluye opciones para navegar al perfil del usuario, ver los QR codes y cerrar sesión.
 * @Props : No recibe props directamente, pero utiliza el contexto de autenticación para obtener la información del usuario, la imagen de perfil y la función de cierre de sesión.
 * @return : Un componente que muestra un avatar de usuario, al hacer clic se despliega un menú con opciones para navegar al perfil, ver los QR codes y cerrar sesión.
 */

import React, { useState, useContext, useEffect } from 'react';
import { Divider, Tooltip, IconButton, Avatar, ListItemIcon, Menu, MenuItem, Typography } from '@mui/material';
import { AuthContext } from "../../context/AuthContext";
import { Link as RouterLink } from 'react-router-dom';
import QrCode from '@mui/icons-material/QrCode';
import Logout from '@mui/icons-material/Logout';

export default function UserProfileMenu() {
    let { user, logoutUser, profileImage } = useContext(AuthContext)
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);

    const handleOpen = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
        <>
            <Tooltip title="Account settings">
                <IconButton
                    onClick={handleOpen}
                    size="small"
                    sx={{ ml: 2 }}
                    aria-controls={open ? 'account-menu' : undefined}
                    aria-haspopup="true"
                    aria-expanded={open ? 'true' : undefined}
                >
                    <Avatar alt={profileImage} src={profileImage} sx={{ width: '30px', height: '30px' }}>M</Avatar>
                </IconButton>
            </Tooltip>
            <Menu
                anchorEl={anchorEl}
                id="account-menu"
                open={open}
                onClose={handleClose}
                onClick={handleClose}
                PaperProps={{
                    elevation: 0,
                    sx: {
                        overflow: 'visible',
                        filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                        mt: 1.5,
                        '& .MuiAvatar-root': {
                            width: 32,
                            height: 32,
                            ml: -0.5,
                            mr: 1,
                        },
                        '&::before': {
                            content: '""',
                            display: 'block',
                            position: 'absolute',
                            top: 0,
                            right: 14,
                            width: 10,
                            height: 10,
                            bgcolor: 'background.paper',
                            transform: 'translateY(-50%) rotate(45deg)',
                            zIndex: 0,
                        },
                    },
                }}
                transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
            >
                <MenuItem onClick={handleClose}>
                    <Avatar />
                    <RouterLink to="/user/profile" style={{ textDecoration: 'none', color: 'inherit', margin: '0 10px' }}>
                        <Typography textAlign="center">Profile</Typography>
                    </RouterLink>
                </MenuItem>
                <Divider />
                {user && user.rol !== 'ADMIN' && (
                    <MenuItem onClick={handleClose}>
                        <ListItemIcon>
                            <QrCode fontSize="small" />
                        </ListItemIcon>
                        <RouterLink to="/user/qr" style={{ textDecoration: 'none', color: 'inherit', margin: '0 10px' }}>
                            <Typography textAlign="center">Qr's</Typography>
                        </RouterLink>
                    </MenuItem>
                )}
                <MenuItem onClick={handleClose}>
                    <ListItemIcon>
                        <Logout fontSize="small" />
                    </ListItemIcon>
                    <Typography textAlign="center" onClick={logoutUser} style={{ margin: '0 10px' }}>Logout</Typography>
                </MenuItem>
            </Menu>
        </>
    );
}
