import { useContext } from 'react';
import { Link } from 'react-router-dom';

function Navbar() {

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
                    <Link className='text-blue-500 px-4 py-2 rounded-md' to='/login' role='button'>Log In</Link>
                    <Link className='text-blue-500 px-4 py-2 rounded-md' to='/register' role='button'>Register</Link>
                </div>
            </div>
        </nav>
    );
}

export default Navbar;
