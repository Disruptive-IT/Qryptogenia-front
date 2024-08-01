import React, { useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from "../../../context/AuthContext";
import UserProfileMenu from '../../../components/Admin/Profile';
import { useAuthContext } from '../../../context/AuthContext';
import CustomLink from '../../../components/Layout/CustomLink';

function Navbar() {
    let { logoutUser } = useContext(AuthContext)
    const { user } = useAuthContext();

    const isActive = (path) => {
        return location.pathname === path;
    };
    return (
        <nav className="bg-white p-4">
            <div className="container mx-auto flex items-center justify-between">
                <div className="font-bold text-xl">
                    QRyptogenia
                </div>
                <ul className="md:flex space-x-4 list-none text-sm text-black items-center inline-flex justify-center text-left gap-3">
                    <CustomLink to="/user/home" isActive={isActive('/user/home')}>Home</CustomLink>
                    <CustomLink to="#" isActive={isActive('/about')}>About us</CustomLink>
                    <CustomLink to="/pricings" isActive={isActive('/pricings')}>My Plans</CustomLink>
                </ul>
                <div className="hidden md:flex items-center space-x-4">
                    <UserProfileMenu />
                </div>
            </div>
        </nav>
    );
}

export default Navbar;
