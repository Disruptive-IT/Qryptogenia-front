import { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import '../components/auth/auth.css';

const HomePage = () => {
    return (
        <div className='flex items-center justify-center h-screen'>
            <div>
                <h1 className='text-4xl font-bold'>¡Bienvenido!</h1>
            </div>
        </div>
    );
};

export default HomePage;
