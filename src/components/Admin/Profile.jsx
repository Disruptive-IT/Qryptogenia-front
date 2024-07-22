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
                    <RouterLink to="/admin/profile" style={{ textDecoration: 'none', color: 'inherit' }}>
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
