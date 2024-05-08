import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import CustomLink from '../../../components/Layout/CustomLink';
import logo from "../../../../public/Logo.png"
import UseSwitchesCustom from '../../../components/UI/theme/SwitchesTheme';

function Navbar() {
    const location = useLocation(); // Obtiene la ruta actual

    // Determina si un enlace está activo
    const isActive = (path) => {
        return location.pathname === path;
    };

    return (
        <header className="fixed md:top-4 top-0 inset-x-0 z-50 ">
            <div className="relative h-20 flex w-full p-3 mx-auto bg-white md:rounded-full items-center justify-between md:shadow lg:w-4/5  px-8 dark:text-white dark:bg-slate-600 ">
                <Link to="/" className="text-black  hover:text-black/70 items-center inline-flex font-bold ml-2 text-2xl" title="Inicio ">
                    <img className='w-[60px]' src={logo} alt="Qryptogenia" />
                    <span className='text-dark-blue ml-2 dark:text-white'>Qry</span>ptogenia
                </Link>
                <nav className="md:flex hidden dark:text-white">
                    <ul className="space-x-4 list-none text-sm text-black items-center inline-flex justify-center text-left gap-3 dark:text-white">
                        <CustomLink to="/" isActive={isActive('/home')}>Home</CustomLink>
                        <CustomLink to="#" isActive={isActive('/about')}>About us</CustomLink>
                        <CustomLink to="#" isActive={isActive('/plans')}>Plans</CustomLink>
                        <CustomLink to="#" isActive={isActive('/faq')}>FAQ</CustomLink>
                        <li className="shrink-0 dark:text-white">
                            <Link to="/login" className="py-2 w-auto px-4 border-2 border-dark-blue h-8 rounded-full bg-black/5 hover:bg-transparent dark:text-white dark:border-white text-dark-blue duration-200">CUENTA</Link>
                        </li>
                    </ul>
                </nav>
                <UseSwitchesCustom />
            </div>
        </header>
    );
}

export default Navbar;
