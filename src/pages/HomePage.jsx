import { useState, useEffect, useContext } from 'react';
import '../components/auth/auth.css';
import { OptionBar } from '../components/Layout/optionBar';
import { useStepper } from '../context/StepperContext';

const HomePage = () => {
    const { setActiveStep } = useStepper();

    useEffect(() => {
        setActiveStep(0);
    }, []);

    return (
        <>
            <div className='mt-7'>
                <h1 className="text-center font-bold text-2xl text-slate-700">Select your <strong className="text-dark-blue">QR</strong>yptogenia</h1>
                <OptionBar />
            </div>
        </>
    );
};

export default HomePage;
