import React from 'react';
import ScrollableDesingQrs from './scrollableDesingQrs';
import InputText from '../StyleInput';
import { ColorPicker } from '../frame/colorPicker';
import { useQr } from '../../../../../context/QrContext';

const Design = ({ onTabSelect }) => {
    const { setQrColor, setQrBgColor } = useQr();

    const handleColorQr = (color) => {
        setQrColor(color);
    };


    return (
        <>
            {/* <ScrollableDesingQrs onTabSelect={onTabSelect} /> */}
            {/* <div className='flex items-center gap-4'>
                <span>Color qr:</span>
                <ColorPicker setColor={handleColorQr} />
            </div> */}

        </>
    );
};

export default Design;