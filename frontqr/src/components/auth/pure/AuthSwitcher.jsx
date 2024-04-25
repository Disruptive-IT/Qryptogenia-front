import React from 'react';
import { Link } from 'react-router-dom';

const AuthSwitcher = ({ text, to }) => {
    return (
        <div className='w-1/2 m-auto'>
            <Link to={to} className="py-2 w-auto px-4 border-2 border-dark-blue h-8 rounded-md bg-gray-800 hover:bg-gray-700 text-white duration-200">
                {text}
            </Link>
        </div>
    );
};

export default AuthSwitcher;
