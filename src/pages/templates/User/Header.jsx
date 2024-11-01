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
        <header className="relative md:top-4 inset-x-0 z-50">
            <div className="relative h-20 flex w-full p-3 mx-auto bg-white md:rounded-lg items-center justify-between shadow-lg lg:w-[94%] ">
                <Link to="/" className="text-black hover:text-black/70 items-center inline-flex font-bold ml-2 text-2xl w-2/6" title="Inicio">
                <img className='w-[60px]' src={logo} alt="Qryptogenia" />
                <span className='text-dark-blue ml-2 font-bold'>QR</span>yptogenia
                </Link>

                <nav className="md:flex hidden w-2/6 justify-center">
                    <ul className="space-x-4 list-none text-sm text-black items-center inline-flex justify-center text-left gap-3">
                        <CustomLink to="/" isActive={isActive('/')}>{t('Home')}</CustomLink>
                        <CustomLink to="#" isActive={isActive('/about')}>{t('About us')}</CustomLink>
                        <CustomLink to="/pricings" isActive={isActive('/pricings')}>{t('Plans')}</CustomLink>
                        <CustomLink to="#" isActive={isActive('/faq')}>FAQ</CustomLink>
                        <CustomLink to= '/user/qr' isActive={isActive('/user/qr')}>{t('My QR codes')}</CustomLink>
                    </ul>
                </nav>
                
                <div className="block md:hidden">
                    <MenuDrawer />
                </div> 
                                    
                <ul className='md:flex hidden gap-4 w-2/6 justify-end items-center pr-5'>
                    <li className="transition-all duration-200 hover:scale-105 hover:ease-linear ">
                        <LenguageSelector/>
                    </li>
                    <UserProfileMenu />
                                 
                </ul>


            </div>
            </header>
    );
}

export default Navbar;