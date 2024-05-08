import React, { createContext, useContext, useState } from 'react';

const StepperContext = createContext();

export const StepperProvider = ({ children }) => {
    const [activeStep, setActiveStep] = useState(null);

    const value = {
        activeStep,
        setActiveStep,
    };

    return <StepperContext.Provider value={value}>{children}</StepperContext.Provider>;
};

export const useStepper = () => useContext(StepperContext);
