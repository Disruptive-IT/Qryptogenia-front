import React, { useState, useContext } from 'react';
import { Tooltip, IconButton, Avatar, Menu, MenuItem, Typography } from '@mui/material';
import { AuthContext } from "../../context/AuthContext";
import { Link as RouterLink } from 'react-router-dom';

export default function UserProfileMenu() {
    let { user, logoutUser } = useContext(AuthContext)
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
                    <Avatar alt="Jobserd" src="#" sx={{width: '30px', height: '30px'}} />
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
                <MenuItem onClick={() => { logoutUser(); handleCloseUserMenu(); }}>
                    <Typography textAlign="center">Logout</Typography>
                </MenuItem>
            </Menu>
        </>
    );
}
