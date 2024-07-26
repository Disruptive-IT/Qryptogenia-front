import React from 'react';
import { Link } from 'react-router-dom'; 
import { FaArrowRight, FaArrowLeftLong  } from "react-icons/fa6"; //? row left and right icons


const AuthSwitcher = ({ text, to }) => {
    if (to === "/register") {
        return (
            <div className='flex flex-col gap-2 mt-3 '>
                <div className='border-t-2 border-gray-300'></div>
                <Link to={to} className="flex items-center justify-center gap-2 hover:scale-110 transition-all duration-300">
                    {text} 
                    <FaArrowRight />
                </Link>
            </div>
        );
    }else{
        return (
            <div className='flex flex-col gap-2 mt-3 '>
                <div className='border-t-2 border-gray-300'></div>
                <Link to={to} className="flex items-center justify-center gap-2 hover:scale-110 transition-all duration-300">
                    {text} 
                    <FaArrowLeftLong />
                </Link>
            </div>
        );
    }
};

export default AuthSwitcher;
