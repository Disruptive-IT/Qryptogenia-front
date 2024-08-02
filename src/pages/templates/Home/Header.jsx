import React, { useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import CustomLink from '../../../components/Layout/CustomLink';
import logo from "../../../../public/Logo.png";
import MenuDrawer from '../../../components/UI/menu/menuDrawer';
import { useAuth } from '../../../hooks/useAuth';
import UserProfileMenu from '../../../components/Admin/Profile';

function Navbar() {
    const location = useLocation();

    const isActive = (path) => {
        return location.pathname === path;
    };

    return (
        <header className="relative md:top-4 inset-x-0 z-50">
            <div className="relative h-20 flex w-full p-3 mx-auto bg-white md:rounded-full items-center justify-between md:shadow lg:w-4/5 px-8">
                <Link to="/" className="text-black hover:text-black/70 items-center inline-flex font-bold ml-2 text-2xl" title="Inicio">
                    <img className='w-[60px]' src={logo} alt="Qryptogenia" />
                    <span className='text-dark-blue ml-2'>Qry</span>ptogenia
                </Link>
                <nav className="md:flex hidden">
                    <ul className="space-x-4 list-none text-sm text-black items-center inline-flex justify-center text-left gap-3">
                        <CustomLink to="/" isActive={isActive('/home')}>Home</CustomLink>
                        <CustomLink to="#" isActive={isActive('/about')}>About us</CustomLink>
                        <CustomLink to="/pricings" isActive={isActive('/pricings')}>Plans</CustomLink>
                        <CustomLink to="#" isActive={isActive('/faq')}>FAQ</CustomLink>
                    </ul>
                </nav>
                <ul className='md:flex hidden space-x-4'>
                    <li className="shrink-0">
                        <Link to="/login" className="py-2 w-auto px-4 border-2 border-dark-blue h-8 rounded-full bg-black/5 hover:bg-transparent text-dark-blue duration-200">Sign In</Link>
                    </li>
                    <li className="shrink-0">
                        <Link to="/register" className="py-2 w-auto px-4 border-2 border-dark-blue h-8 rounded-full bg-black/5 hover:bg-transparent text-dark-blue duration-200">Sign Up</Link>
                    </li>
                </ul>
                <MenuDrawer />
            </div>
        </header>
    );
}

export default Navbar;
