import React, { useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from "../../../context/AuthContext";
import UserProfileMenu from '../../../components/Admin/Profile';
import { useAuthContext } from '../../../context/AuthContext';
import CustomLink from '../../../components/Layout/CustomLink';
import MenuDrawer from '../../../components/UI/menu/menuDrawer';
import { useTranslation } from 'react-i18next';
import LenguageSelector from './../../../components/UI/lenguage/lenguageSelector'
function Navbar() {
    const { user } = useAuthContext();
    const { t } = useTranslation();
    const isActive = (path) => {
        return location.pathname === path;
    };
    return (
        <header className="relative md:top-4 inset-x-0 z-50">
            <div className="relative h-20 flex w-full p-3 mx-auto bg-white md:rounded-lg items-center justify-between shadow-lg lg:w-[94%]">
                {/* Logo y nombre */}
                <Link to="/" className="text-black hover:text-black/70 items-center inline-flex font-bold ml-2 text-2xl w-auto" title="Inicio">
            <img className="w-[60px]" src="/Logo.png" alt="Qryptogenia" />

            {/* Texto visible en pantallas medianas y grandes */}
            <span className="text-dark-blue hidden custom-qr-min:flex ml-2 font-bold">QR</span>
            <span className="hidden custom-qr-min:flex font-bold">yptogenia</span>

            {/* Texto completo visible solo en pantallas pequeñas */}
            <span className="text-dark-blue md:hidden ml-2 font-bold">Qr</span>
            <span className="md:hidden font-bold">yptogenia</span>

        </Link>


        {/* Menú de navegación */}
        <nav className="md:flex hidden justify-center flex-nowrap">
            <ul className="flex gap-5 list-none text-sm text-black items-center justify-center">
                <CustomLink to="/" isActive={isActive('/')}>{t('Home')}</CustomLink>
                <CustomLink to="/aboutUs" isActive={isActive('/aboutUs')}>{t('About us')}</CustomLink>
                <CustomLink to="/pricings" isActive={isActive('/pricings')}>{t('Plans')}</CustomLink>
                <CustomLink to="/faq" isActive={isActive('/faq')}>{t("FAQ")}</CustomLink>
                <CustomLink to="/user/qr" isActive={isActive('/user/qr')}>{t('My QR codes')}</CustomLink>
            </ul>
        </nav>


                
                <div className="block md:hidden">
                    <MenuDrawer />
                </div> 
                                    
                <ul className="md:flex hidden gap-4 items-center justify-end w-auto">
                <li className="transition-all duration-200 hover:scale-105">
                <LenguageSelector />
            </li>
            <UserProfileMenu />
        </ul>
    </div>
</header>
    );
}

export default Navbar;