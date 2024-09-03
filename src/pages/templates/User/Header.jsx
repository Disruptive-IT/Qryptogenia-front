import React, { useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from "../../../context/AuthContext";
import UserProfileMenu from '../../../components/Admin/Profile';
import { useAuthContext } from '../../../context/AuthContext';
import CustomLink from '../../../components/Layout/CustomLink';
import MenuDrawer from '../../../components/UI/menu/menuDrawer';
import logo from "../../../../public/Logo.png";
import { useTranslation } from 'react-i18next';
import LenguageSelector from './../../../components/UI/lenguage/lenguageSelector'
function Navbar() {
    const { user } = useAuthContext();
    const { t } = useTranslation();
    const isActive = (path) => {
        return location.pathname === path;
    };
    return (
        <nav className="bg-white p-4">
            <div className="flex items-center justify-between">
                <Link to="/" className="text-black hover:text-black/70 items-center inline-flex font-bold text-2xl" title="Inicio">
                    <img className='w-[60px]' src={logo} alt="Qryptogenia" />
                    <span className='text-dark-blue ml-2'>Qry</span>ptogenia
                </Link>
                <ul className="md:flex hidden space-x-6 list-none text-sm text-black items-center justify-center ">
                    <CustomLink to="/user/home" isActive={isActive('/user/home')}>{t("Home")}</CustomLink>
                    <CustomLink to="#" isActive={isActive('/about')}>{t("About us")}</CustomLink>
                    <CustomLink to="/pricings" isActive={isActive('/pricings')}>{t("My Plans")}</CustomLink>
                </ul>
                <div className="block md:hidden">
                    <MenuDrawer />
                </div>
                <div className='hidden md:block'>
                    <LenguageSelector/>
                    <UserProfileMenu />
                    
                </div>
            </div>
        </nav>
    );
}

export default Navbar;
