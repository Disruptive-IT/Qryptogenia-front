import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import PropTypes from 'prop-types';
import './MenuDrawer.css'; // Asegúrate de crear este archivo CSS
import { List, ListItem, Avatar, Typography, Tooltip, IconButton } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import HomeIcon from '@mui/icons-material/Home';
import InfoIcon from '@mui/icons-material/Info';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import HelpIcon from '@mui/icons-material/Help';
import UserProfileMenu from '../../Admin/Profile';
import PersonIcon from '@mui/icons-material/Person';
import QrCodeIcon from '@mui/icons-material/QrCode';
import LogoutIcon from '@mui/icons-material/Logout';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import { motion } from 'framer-motion'
import { useTranslation } from 'react-i18next';
import { useAuthContext } from '../../../context/AuthContext';

function MenuDrawer(props) {
    const [open, setOpen] = useState(false);
    const [windowWidth, setWindowWidth] = useState(window.innerWidth);
    const location = useLocation();
    const { user, logoutUser, profileImage } = useAuthContext();
    const { t } = useTranslation();
    const isActive = (path) => location.pathname === path;

    const toggleDrawer = (newOpen) => () => {
        setOpen(newOpen);
    };

    const handleResize = () => {
        setWindowWidth(window.innerWidth);
    };

    useEffect(() => {
        window.addEventListener('resize', handleResize);
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    useEffect(() => {
        if (windowWidth >= 768) {
            setOpen(false);
        }
    }, [windowWidth]);

    useEffect(() => {
        setOpen(false);
    }, [location]);

    return (
        <div className="root">
            <div className={`drawer ${open ? 'open' : ''}`}>
                <div className="drawer-header">
                    <div className="puller"></div>
                    <h2 className='text-xl'><span className='text-dark-blue ml-2 font-bold'>Qry</span>ptogenia</h2>
                </div>
                <nav>
                    <List>
                        <ListItem button component={Link} to="/" className={isActive('/') ? 'active' : ''}>
                            <HomeIcon sx={{ mr: 1 }} />
                            {t("Home")}
                        </ListItem>
                        <ListItem button component={Link} to="/about" className={isActive('/about') ? 'active' : ''}>
                            <InfoIcon sx={{ mr: 1 }} />
                            {t("About us")}
                        </ListItem>
                        <ListItem button component={Link} to="/pricings" className={isActive('/pricings') ? 'active' : ''}>
                            <AttachMoneyIcon sx={{ mr: 1 }} />
                            {t("Plans")}
                        </ListItem>
                        <ListItem button component={Link} to="/faq" className={isActive('/faq') ? 'active' : ''}>
                            <HelpIcon sx={{ mr: 1 }} />
                            {t("FAQ")}
                        </ListItem>
                        {!user || (user && user.rol != "CLIENT") ? (
                            <ListItem>
                                <Link to="/login" className="auth-link border-2 border-dark-blue h-8 rounded-md bg-black/5 hover:bg-transparent text-dark-blue duration-200">Sign In</Link>
                                <Link to="/register" className="auth-link border-2 border-dark-blue h-8 rounded-md bg-black/5 hover:bg-transparent text-dark-blue duration-200">Sign Up</Link>
                            </ListItem>
                        ) : null}
                        {user && user.rol === "CLIENT" ? (
                            <div className='pt-4'>
                                <hr className='mb-4' />
                                <p className='mb-4'>Acciones de Cuenta</p>
                                <ListItem button component={Link} to="/user/profile">
                                    <PersonIcon sx={{ mr: 1 }} />
                                    {t("Profile")}
                                </ListItem>
                                <ListItem button component={Link} to="/user/qr">
                                    <QrCodeIcon sx={{ mr: 1 }} />
                                    Qr's
                                </ListItem>
                                <ListItem button onClick={logoutUser}>
                                    <LogoutIcon sx={{ mr: 1 }} />
                                    {t("Logout")}
                                </ListItem>
                            </div>
                        ) : null}
                    </List>
                </nav>
            </div>
            {user && user.rol === "CLIENT" ? (
                <>
                    <Tooltip title="Menu contents">
                        <div
                            className={`drawer-toggle ${windowWidth < 768 ? '' : 'hide'}`}
                            onClick={toggleDrawer(!open)}
                        >
                            {open ? <CloseIcon /> : <Avatar alt={user.username} src={profileImage} sx={{ width: '30px', height: '30px' }}></Avatar>}
                        </div>
                    </Tooltip>
                    <IconButton
                        onClick={toggleDrawer(!open)}
                        sx={{ position: 'absolute', right: '30px', top: '2px' }}
                    >
                        <ArrowBackIosIcon sx={{ width: '20px' }} />
                    </IconButton>
                </>
            ) : (
                <div
                    className={`drawer-toggle ${windowWidth < 768 ? '' : 'hide'}`}
                    onClick={toggleDrawer(!open)}
                >
                    {open ? <CloseIcon /> : <MenuIcon />}
                </div>
            )}
        </div>
    );
}

MenuDrawer.propTypes = {
    window: PropTypes.func,
};

export default MenuDrawer;
