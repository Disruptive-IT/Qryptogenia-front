import React from 'react';
import { Link } from 'react-router-dom';

const CustomLink = ({ to, children, isActive }) => {
    const linkClass = isActive ? 'text-dark-blue active-line' : 'text-black';

    return (
        <li className={`hover-line ${isActive ? 'active-line' : ''}`}>
            <Link to={to} className={linkClass}>
                {children}
            </Link>
        </li>
    );
};



export default CustomLink;
