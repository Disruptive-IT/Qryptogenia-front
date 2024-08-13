import React, { createContext, useContext, useState } from 'react';

/**
 * @Author : Jobserd Julián Ocampo, @date 2024-08-13 09:58:00
 * @description : Este archivo define el contexto `StepperContext` y el hook `useStepper` para gestionar el estado del paso activo en un proceso de varios pasos. Específicamente, se utiliza para el control de los pasos en el proceso de creación de un QR.
**/

const StepperContext = createContext();

export const StepperProvider = ({ children }) => {
    const [activeStep, setActiveStep] = useState(0);

    const value = {
        activeStep,
        setActiveStep,
    };

    return <StepperContext.Provider value={value}>{children}</StepperContext.Provider>;
};

export const useStepper = () => useContext(StepperContext);
