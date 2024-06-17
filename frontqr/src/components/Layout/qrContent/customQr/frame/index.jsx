import React from 'react';
import InputText from '../StyleInput';
import { useQr } from '../../../../../context/QrContext';
import ScrollableChipText from './scrollableChipText';
import Input from '@mui/material/Input';
import ScrollableMain from './scrollableMain';
import Slider from '@mui/material/Slider';

const Frame = () => {
    const { setQrText, setQrTextPositionY, setQrTextPositionX } = useQr();

    const handleInputChange = (e) => {
        setQrText(e.target.value);
    };
    const handlePositionYChange = (e) => {
        setQrTextPositionY(e.target.value);
    };
    const handlePositionXChange = (e) => {
        setQrTextPositionX(e.target.value);
    };

    return (
        <>
            <div className="flex space-x-4 items-center">
                <InputText label="Escribir el texto" variant="filled" fullWidth onChange={handleInputChange} />
            </div>
            <span className='text-xs text-gray-500'>*El texto tiene un limite de 20 caracteres</span>

            <div className='w-ful flex gap-3 items-center justify-around'>
                <div>
                    <label htmlFor="posicionamientoX" className="pr-2">Posicionamiento X:</label>
                    <Slider
                        aria-label="PosicionamientoX"
                        defaultValue={0}
                        color="secondary"
                        min={10}
                        max={400}
                        step={1}
                        onChange={(event, newValue) => handlePositionXChange(event, Math.round(newValue))}
                    />
                </div>
                <div>
                    <label htmlFor="posicionamientoY" className="pl-2">Posicionamiento Y:</label>
                    <Slider
                        aria-label="PosicionamientoY"
                        defaultValue={0}
                        color="secondary"
                        min={-30}
                        max={250}
                        step={1}
                        onChange={(event, newValue) => handlePositionYChange(event, Math.round(newValue))}
                    />
                </div>
            </div>

            <ScrollableMain />
        </>
    );
};

export default Frame;
