import { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import '../components/auth/auth.css';
import { OptionBar } from '../components/Layout/optionBar';

const HomePage = () => {
    return (
        <div className='flex justify-center '>
            <div className='mt-10'>
                <OptionBar/>
            </div>
        </div>
    );
};

export default HomePage;
