import React, { useState, useEffect } from 'react';
import { useQr } from '../../../../../context/QrContext';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import AnimatedInput from './animatedInput';

/**
 * @Author : Jobserd Julián Ocampo,   @date 2024-08-01 14:08:20
 * @description : Componente de la seccion frame o texto. El contenido es dedicado a establecer el texto y su posicion
 * @return : Retorna el input para escritura del usuario y los tabs para seleccion de la posicion del texto
**/

const positionStyles = {
    topCenter: { position: 'absolute', top: '2%', left: '50%', transform: 'translate(-50%, 0)' },
    topLeft: { position: 'absolute', top: '2%', left: '2%' },
    topRight: { position: 'absolute', top: '2%', right: '2%' },
    bottomCenter: { position: 'absolute', bottom: '2%', left: '50%', transform: 'translate(-50%, 0)' },
    bottomLeft: { position: 'absolute', bottom: '2%', left: '2%' },
    bottomRight: { position: 'absolute', bottom: '2%', right: '2%' },
};

export default function ScrollableInputText() {
    const { setQrText, qrTextProps, setQrTextPosition } = useQr();
    const [value, setValue] = useState(0);

    const handleInputChange = (e) => {
        setQrText(e.target.value);
    };

    const handleTabChange = (event, newValue) => {
        setValue(newValue);
        const selectedPositionKey = Object.keys(positionStyles)[newValue];
        setQrTextPosition({ key: selectedPositionKey, style: positionStyles[selectedPositionKey] });
    };

    return (
        <>
            <div className="flex space-x-4 items-center mt-6">
                <AnimatedInput
                    id="inputField"
                    maxLength="10"
                    onChange={handleInputChange}
                    label="Write the text"
                    value={qrTextProps.qrText}
                />
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
                    onChange={handleTabChange}
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
                        />
                    ))}
                </Tabs>
            </div>
        </>
    );
}
