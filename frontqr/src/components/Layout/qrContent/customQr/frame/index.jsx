import React, { useState } from 'react';
import InputText from '../StyleInput';
import ScrollableFrameQrs from './scrollableFrameQrs';

const Frame = ({ inputValue, onTabSelect }) => {
    const [inputText, setInputText] = useState('');

    const handleInputChange = (event) => {
        setInputText(event.target.value);
    };

    return (
        <>
            <ScrollableFrameQrs inputValue={inputValue} onTabSelect={onTabSelect} />
            <InputText label="Escribir el texto" variant="filled" fullWidth onChange={handleInputChange} />
        </>
    );
};

export default Frame;