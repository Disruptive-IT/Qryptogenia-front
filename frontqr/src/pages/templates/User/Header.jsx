import React, { useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from "../../../context/AuthContext";
import UserProfileMenu from '../../../components/Admin/Profile';
import { useAuthContext } from '../../../context/AuthContext';

function Navbar() {
    let {logoutUser } = useContext(AuthContext)
    const { user } = useAuthContext();

    return (
        <nav className="bg-white p-4">
            <div className="container mx-auto flex items-center justify-between">
                <div className="font-bold text-xl">
                    QRyptogenia
                </div>
                <div className="hidden md:flex space-x-4">
                    {user ? (
                <Link to="/user/home" className="font-bold">Home</Link>
            ) : (
                <Link to="/" className="font-bold">Home</Link>
            )}
                </div>
                <div className="hidden md:flex items-center space-x-4">
                    <UserProfileMenu/>
                    <p onClick={logoutUser} className='text-blue-500 px-4 py-2 rounded-md' role='button'>Logout</p>
                </div>
            </div>
        </nav>
    );
}

export default Navbar;
