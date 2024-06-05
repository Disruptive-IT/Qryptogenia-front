import React from 'react';
import InputText from '../StyleInput';
import { useQr } from '../../../../../context/QrContext';
import ScrollableChipText from './scrollableChipText';
import Input from '@mui/material/Input';
import ScrollableMain from './scrollableMain';

const Frame = () => {
    const { setQrText } = useQr();

    const handleInputChange = (event) => {
        setQrText(event.target.value);
    };

    return (
        <>
            <div className="flex space-x-4 items-center">
                <InputText label="Escribir el texto" variant="filled" fullWidth onChange={handleInputChange} />
            </div>
            <span className='text-xs text-gray-500'>*El texto tiene un limite de 20 caracteres</span>
            <ScrollableMain />
        </>
    );
};

export default Frame;