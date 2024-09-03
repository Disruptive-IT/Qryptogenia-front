import { useState, useEffect, useContext } from 'react';
import { OptionBar } from '../components/Layout/optionBar';
import { useStepper } from '../context/StepperContext';
import { useTranslation } from 'react-i18next';

const HomePage = () => {
    const { setActiveStep } = useStepper();
    const { t } = useTranslation();

    useEffect(() => {
        setActiveStep(0);
    }, []);

    return (
        <>
            <div className='mt-7'>
                <h1 className="text-center font-bold text-2xl text-slate-700">{t('Select your')}<strong className="text-dark-blue">QR</strong>yptogenia</h1>
                <OptionBar />
            </div>
        </>
    );
};

export default HomePage;
