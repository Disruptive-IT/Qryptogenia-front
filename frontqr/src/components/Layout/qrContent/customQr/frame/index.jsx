import React, { useEffect, useState } from 'react';
import InputText from '../StyleInput';
import { useQr } from '../../../../../context/QrContext';
import ScrollableChipText from './scrollableChipText';
import Input from '@mui/material/Input';
import ScrollableMain from './scrollableMain';
import Slider from '@mui/material/Slider';
import Checkbox from '@mui/material/Checkbox';
import Switch from '@mui/material/Switch';

const Frame = () => {
    const { setQrText, setQrTextPositionY, setQrTextPositionX } = useQr();
    const [isFullRangeEnabled, setIsFullRangeEnabled] = useState(true);

    const handleInputChange = (e) => {
        setQrText(e.target.value);
    };

    const handlePositionXChange = (e, newValue) => {
        setQrTextPositionX(Math.min(Math.max(newValue, 0), 78));
    };

    const toggleRange = () => {
        setIsFullRangeEnabled(!isFullRangeEnabled);
    };

    useEffect(() => {
        setQrTextPositionY(isFullRangeEnabled ? 85 : 0);
    }, [isFullRangeEnabled]);

    return (
        <>
            <div className="flex space-x-4 items-center">
                <InputText label="Write the text" variant="filled" inputProps={{ maxLength: 20 }} fullWidth onChange={handleInputChange} />
            </div>
            <span className='text-xs text-gray-500'>*The text has a limit of 10 characters</span>

            <div className='flex justify-between gap-4 items-center'>
                <span>Position </span>
                <div className='flex gap-4 items-center'>
                    <span htmlFor="positioningX" className="pr-2">X:</span>
                    <div className='flex items-center justify-center'>
                        <Slider
                            size="small"
                            defaultValue={0}
                            aria-label="PositioningX"
                            valueLabelDisplay="on"
                            color="secondary"
                            min={0}
                            max={100}
                            step={1}
                            sx={{ width: "120px" }}
                            onChange={(event, newValue) => handlePositionXChange(event, newValue)}
                        />
                    </div>
                </div>
                <div className='flex gap-4 items-center'>
                    <span htmlFor="positioningY" className="pl-2">Y:</span>
                    <div>
                        <Switch id="fullRangeToggle" checked={isFullRangeEnabled} onChange={toggleRange} color="secondary" />
                        <label htmlFor="fullRangeToggle" className="ml-2">{isFullRangeEnabled ? 'Bottom' : 'Top'}</label>
                    </div>
                </div>
            </div>

            <ScrollableMain />
        </>
    );
};

export default Frame;
