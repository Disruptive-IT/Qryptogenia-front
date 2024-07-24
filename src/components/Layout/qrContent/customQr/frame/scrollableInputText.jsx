import React, { useState, useEffect } from 'react';
import { useQr } from '../../../../../context/QrContext';
import Slider from '@mui/material/Slider';
import Switch from '@mui/material/Switch';
import InputText from './StyleInput';
import { FaQuestionCircle } from 'react-icons/fa';
import Tooltip from '@mui/material/Tooltip';
import Box from '@mui/material/Box';

export default function ScrollableInputText() {
    const { setQrText, qrTextProps, setQrTextPositionY, setQrTextPositionX } = useQr();
    const [isFullRangeEnabled, setIsFullRangeEnabled] = useState(true);

    const handleInputChange = (e) => {
        setQrText(e.target.value);
    };

    const handlePositionXChange = (e, newValue) => {
        setQrTextPositionX(Math.min(Math.max(newValue, 0), 51));
    };

    const toggleRange = () => {
        setIsFullRangeEnabled(!isFullRangeEnabled);
    };

    useEffect(() => {
        setQrTextPositionY(isFullRangeEnabled ? 86.5 : 0);
    }, [isFullRangeEnabled]);

    return (
        <>
            <div className="flex space-x-4 items-center mt-6">
                <InputText label="Write the text" variant="filled" inputProps={{ maxLength: 20 }} fullWidth onChange={handleInputChange} />
            </div>
            <div className='flex flex-col gap-4'>
                <span className='text-xs text-gray-500'>*The text has a limit of 10 characters</span>
                <hr />
                <Tooltip title={<Box component="div" sx={{ whiteSpace: 'pre-wrap' }}>
                    X: Moves the text horizontally, right or left.<br />
                    Y: Moves the text vertically, up or down.
                </Box>}>
                    <span className='flex justify-center items-center gap-2 font-semibold cursor-pointer'>
                        Position Text <FaQuestionCircle />
                    </span>
                </Tooltip>
            </div>
            <div className='flex justify-between gap-4 pt-4'>
                <div className='flex gap-4 items-center'>
                    <span>X:</span>
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
                <div className='flex gap-4 items-center'>
                    <span>Y:</span>
                    <Switch id="fullRangeToggle" onChange={toggleRange} color="secondary" />
                    <label htmlFor="fullRangeToggle" className="ml-2">{isFullRangeEnabled ? 'Bottom' : 'Top'}</label>
                </div>
            </div>
        </>
    );
}
