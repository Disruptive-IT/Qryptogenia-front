import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import PropTypes from 'prop-types';
import './MenuDrawer.css'; // Asegúrate de crear este archivo CSS
import { Drawer, IconButton, List, ListItem, Typography, Divider } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import HomeIcon from '@mui/icons-material/Home';
import InfoIcon from '@mui/icons-material/Info';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import HelpIcon from '@mui/icons-material/Help';

function MenuDrawer(props) {
    const [open, setOpen] = useState(false);
    const [windowWidth, setWindowWidth] = useState(window.innerWidth);
    const location = useLocation();

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
                            Home
                        </ListItem>
                        <ListItem button component={Link} to="/about" className={isActive('/about') ? 'active' : ''}>
                            <InfoIcon sx={{ mr: 1 }} />
                            About us
                        </ListItem>
                        <ListItem button component={Link} to="/pricings" className={isActive('/pricings') ? 'active' : ''}>
                            <AttachMoneyIcon sx={{ mr: 1 }} />
                            Plans
                        </ListItem>
                        <ListItem button component={Link} to="/faq" className={isActive('/faq') ? 'active' : ''}>
                            <HelpIcon sx={{ mr: 1 }} />
                            FAQ
                        </ListItem>
                        <ListItem>
                            <Link to="/login" className="auth-link border-2 border-dark-blue h-8 rounded-md bg-black/5 hover:bg-transparent text-dark-blue duration-200">Sign In</Link>
                            <Link to="/register" className="auth-link border-2 border-dark-blue h-8 rounded-md bg-black/5 hover:bg-transparent text-dark-blue duration-200">Sign Up</Link>
                        </ListItem>
                    </List>
                </nav>
            </div>
            <div
                className={`drawer-toggle ${windowWidth < 768 ? '' : 'hide'}`}
                onClick={toggleDrawer(!open)}
            >
                {open ? <CloseIcon /> : <MenuIcon />}
            </div>
        </div>
    );
}

MenuDrawer.propTypes = {
    window: PropTypes.func,
};

export default MenuDrawer;
