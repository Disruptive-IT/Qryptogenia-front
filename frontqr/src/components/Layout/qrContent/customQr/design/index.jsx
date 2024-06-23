import React from 'react';
import ScrollableDesingQrs from './scrollableDesingQrs';
import { ColorPicker } from '../frame/colorPicker';
import { useQr } from '../../../../../context/QrContext';

const Design = ({ onTabSelect }) => {

    return (
        <>
            <ScrollableDesingQrs onTabSelect={onTabSelect} />
            <div className='flex items-center gap-4'>
                <span>Color qr:</span>
                <ColorPicker setColor={handleColorQr} />
            </div>

        </>
    );
};

export default Design;