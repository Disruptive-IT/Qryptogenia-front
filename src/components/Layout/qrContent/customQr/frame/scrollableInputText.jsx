import React, { useState, useEffect } from 'react';
import { useQr } from '../../../../../context/QrContext';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import AnimatedInput from './animatedInput';
import { useTranslation } from 'react-i18next';
/**
 * @Author : Jobserd Julián Ocampo,   @date 2024-08-01 14:08:20
 * @description : Componente de la seccion frame o texto. El contenido es dedicado a establecer el texto y su posicion
 * @return : Retorna el input para escritura del usuario y los tabs para seleccion de la posicion del texto
**/
/**
 @UpdatedBy : Cristian Rueda,   @date 2024-09-17 13:13:48
 * @description : Se cambian los colores del color de la letra, linea scroll y cuadro seleccionado acorde al formato manejado
 */


export default function ScrollableInputText() {
    const { setQrText, qrTextProps, setQrTextPosition } = useQr();
    const [value, setValue] = useState(0);
    const { t } = useTranslation();
    const handleInputChange = (e) => {
        setQrText(e.target.value);
    };

    const positionStyles = {
        [t("TOPCENTER")]: { position: 'absolute', top: '2%', left: '50%', transform: 'translate(-50%, 0)' },
        [t("TOPLEFT")]: { position: 'absolute', top: '2%', left: '2%' },
        [t("TOPRIGHT")]: { position: 'absolute', top: '2%', right: '2%' },
        [t("BOTTOMCENTER")]: { position: 'absolute', bottom: '2%', left: '50%', transform: 'translate(-50%, 0)' },
        [t("BOTTOMLEFT")]: { position: 'absolute', bottom: '2%', left: '2%' },
        [t("BOTTOMRIGHT")]: { position: 'absolute', bottom: '2%', right: '2%' },
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
                    label={t("Write the text")}
                    value={qrTextProps.qrText}
                />
            </div>
            <div className='flex flex-col gap-4'>
                <span className='text-xs text-gray-500'>{t("The text has a limit of 10 characters")}</span>
                <hr />
                <span className='flex justify-center items-center gap-2 font-semibold cursor-pointer'>
                    {t("Position text")}
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
                            color: '',
                        },
                    }}
                    TabIndicatorProps={{
                        style: {
                            backgroundColor: "#CC2905", // Color linea scroll de 'Position text'
                            height: '4px',
                        }
                    }}
                    >
                    {Object.keys(positionStyles).map((key, index) => (
                   <Tab
                       key={index}
                       sx={{
                        '&.Mui-selected': {  
                            color: '#CC2905', // Cambia el color del texto del tab seleccionado
                        },
                       }}
                       label={<span>{key}</span>}
                   />
                    ))}
                </Tabs>
            </div>
        </>
    );
}
