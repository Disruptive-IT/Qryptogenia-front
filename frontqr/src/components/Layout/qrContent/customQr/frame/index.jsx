import React from 'react';
import InputText from '../StyleInput';
import InputColor from 'react-input-color';
import ScrollableFrameQrs from './scrollableFrameQrs';
import { useQr } from '../../../../../context/QrContext';
import ScrollableChipText from './scrollableChipText';
import Input from '@mui/material/Input';
import ScrollableMain from './scrollableMain';

const Frame = () => {
    const { setQrText, setQrFontStyle, setTextColor, setFontSize } = useQr();

    const handleInputChange = (event) => {
        setQrText(event.target.value);
    };

  

    const handleFontSizeChange = (event) => {
        setFontSize(event.target.value);
    };

    return (
        <>
            <div className="flex space-x-4 items-center">
                <InputText label="Escribir el texto" variant="filled" fullWidth onChange={handleInputChange} />
                <div className='flex flex-col gap-2'>
                    <Input
                        type="number"
                        inputProps={{ min: "10", max: "25", step: "1" }}
                        onChange={handleFontSizeChange}
                        style={{ width: '50px' }}
                    />
                </div>
            </div>
            <span className='text-xs text-gray-500'>*El texto tiene un limite de 20 caracteres</span>
            <ScrollableMain />
        </>
    );
};

export default Frame;