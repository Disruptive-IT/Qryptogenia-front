import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import CustomLink from '../../../components/Layout/CustomLink';

function Navbar() {
    const [isOpen, setIsOpen] = useState(false);
    const location = useLocation(); // Obtiene la ruta actual

    //? Para manejar click en el botón del menú cuando es mobile
    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    // Determina si un enlace está activo
    const isActive = (path) => {
        return location.pathname === path;
    };

    return (
        <div className="fixed top-4 inset-x-0 z-50">
            <div className="max-w-11/12 mx-auto px-8">
                <div className="w-full mx-auto">
                    <div className="relative h-20 flex flex-col w-full p-3 mx-auto bg-white backdrop-blur-xl backdrop-filter rounded-xl md:rounded-full md:items-center md:justify-between md:flex-row">
                        <div className="flex flex-row items-center justify-between md:justify-start">
                            <Link to="/" className="text-black hover:text-black/50 items-center inline-flex font-bold ml-2 text-2xl" title="link to main page">
                                <span className='text-dark-blue'>Qry</span>ptogenia
                            </Link>
                            <button onClick={toggleMenu} className="inline-flex items-center justify-center p-2 text-zinc-400 focus:outline-none focus:text-black md:hidden">
                                Menu
                            </button>
                        </div>
                        <nav className={`flex-col flex-grow hidden py-12 md:py-0 md:flex md:items-end justify-center md:flex-row ${isOpen ? 'flex' : 'hidden'}`}>
                            <ul className="space-y-4 space-x-4 list-none text-sm text-zinc-500 md:space-y-0 md:ml-auto items-center md:inline-flex justify-center text-center md:text-left gap-3">
                                <CustomLink to="/" isActive={isActive('/home')}>Home</CustomLink>
                                <CustomLink to="#" isActive={isActive('/about')}>About us</CustomLink>
                                <CustomLink to="#" isActive={isActive('/plans')}>Plans</CustomLink>
                                <CustomLink to="#" isActive={isActive('/faq')}>FAQ</CustomLink>
                                <li className="shrink-0">
                                    <Link to="/login" className="py-2 w-auto px-4 border-2 border-dark-blue h-8 rounded-full bg-black/5 hover:bg-transparent text-dark-blue duration-200">CUENTA</Link>
                                </li>
                            </ul>
                        </nav>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Navbar;
