import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from "../../../context/AuthContext";

function Navbar() {
    let { user, logoutUser } = useContext(AuthContext)

    return (
        <nav className="bg-white p-4">
            <div className="container mx-auto flex items-center justify-between">
                <div className="font-bold text-xl">
                    QRyptogenia
                </div>
                <div className="hidden md:flex space-x-4">
                    <Link to="/" className="font-bold">Home</Link>
                </div>
                <div className="hidden md:flex items-center space-x-4">
                    <p onClick={logoutUser} className='text-blue-500 px-4 py-2 rounded-md' role='button'>Logout</p>
                </div>
            </div>
        </nav>
    );
}

export default Navbar;
