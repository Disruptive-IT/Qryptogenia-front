import React, { useState, useEffect } from 'react';
import { useQr } from '../../../../../context/QrContext';
import InputText from './StyleInput';
import Tooltip from '@mui/material/Tooltip';
import Box from '@mui/material/Box';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';

// Define los estilos para las posiciones de texto
const positionStyles = {
    default: {},
    topCenter: { position: 'absolute', top: '0%', left: '50%', transform: 'translate(-50%, 0)' },
    topLeft: { position: 'absolute', top: '0%', left: '0%' },
    topRight: { position: 'absolute', top: '0%', right: '0%' },
    bottomCenter: { position: 'absolute', bottom: '0%', left: '50%', transform: 'translate(-50%, 0)' },
    bottomLeft: { position: 'absolute', bottom: '0%', left: '0%' },
    bottomRight: { position: 'absolute', bottom: '0%', right: '0%' },
};

export default function ScrollableInputText() {
    const { setQrText, qrTextProps, setQrTextPositionY, setQrTextPositionX } = useQr();
    const [value, setValue] = useState(0);

    const handleInputChange = (e, newValue) => {
        setValue(newValue);
        setQrText(e.target.value);
    };

    // Obtiene el estilo de posición basado en qrTextPosition
    const positionStyle = positionStyles[qrTextProps.qrTextPosition] || positionStyles.default;

    return (
        <>
            <div className="flex space-x-4 items-center mt-6">
                <InputText label="Write the text" variant="filled" inputProps={{ maxLength: 20 }} fullWidth onChange={handleInputChange} />
            </div>
            <div className='flex flex-col gap-4'>
                <span className='text-xs text-gray-500'>*The text has a limit of 10 characters</span>
                <hr />
                <span className='flex justify-center items-center gap-2 font-semibold cursor-pointer'>
                    Position Text
                </span>
            </div>
            <div className='flex justify-between gap-4 pt-4'>
                <Tabs
                    value={value}
                    onChange={handleInputChange}
                    variant="scrollable"
                    scrollButtons="auto"
                    aria-label="scrollable font tabs"
                    sx={{
                        '&.MuiTabs-scrollButtons': {
                            width: '20px',
                            color: '#284B63',
                        },
                    }}
                    TabIndicatorProps={{
                        style: {
                            backgroundColor: "",
                            height: '4px'
                        }
                    }}
                >
                    {Object.keys(positionStyles).map((key, index) => (
                        <Tab
                            key={index}
                            sx={{ margin: "5px" }}
                            label={<span>{key}</span>}
                            onClick={() => setQrTextProps({ ...qrTextProps, qrTextPosition: key })}
                        />
                    ))}
                </Tabs>
            </div>
            <div style={{ ...positionStyle, color: qrTextProps.qrTextColor, fontSize: `${qrTextProps.qrTextSize}px`, maxWidth: '200px' }}>
                {qrTextProps.qrText}
            </div>
        </>
    );
}
