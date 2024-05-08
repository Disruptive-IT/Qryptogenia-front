import { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import '../components/auth/auth.css';
import { OptionBar } from '../components/Layout/optionBar';
import StepperQr from '../components/UI/utils/stepper';
import { useStepper } from '../context/StepperContext';

const HomePage = () => {
    const { setActiveStep } = useStepper();

    useEffect(() => {
        setActiveStep(null);
    }, []); 

    return (
        <div>
            <h1 className="text-center font-bold text-2xl ">Select your <strong className="text-sky-700">QR</strong>yptogenia</h1>
            <OptionBar />
        </div>
    );
};

export default HomePage;
