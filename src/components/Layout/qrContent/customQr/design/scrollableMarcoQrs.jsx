/*
 * @Author : Jaider cuartas,   @date 2024-07-15 20:13:14
 * @description : Componente para mostrar una lista scrollable de marcos y estilos de diseño para códigos QR. Cada pestaña representa un estilo de marco con su respectiva vista previa.
 * @Props :
 *   - onStyleClick: Función callback que se llama al hacer clic en un estilo de marco. Recibe el objeto de estilo como parámetro.
 *   - value: Valor seleccionado de la pestaña actual.
 *   - onChange: Función callback que se llama cuando cambia la pestaña seleccionada.
 * @return : Retorna un componente que muestra pestañas scrollable con diferentes marcos y estilos de diseño para códigos QR.
 */


import * as React from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import imgQr from '../../../../../assets/imgs/qr.png';
import frame1 from '../../../../../assets/imgs/frame1.png';
import qrframe from '../../../../../assets/imgs/qrframe.png';
import pattern1 from '../../../../../assets/imgs/patter1.avif';
import pattern2 from '../../../../../assets/imgs/patter1.avif';
import { ColorPicker } from '../colorPicker';
import { useQr } from '../../../../../context/QrContext';
import { MdOutlineQrCode, MdOutlineQrCode2 } from "react-icons/md";
import { TbLetterX } from "react-icons/tb";
import { MdOutlineCancel } from "react-icons/md";

const qrStyles = [
    { id: 1, type: 'default', icon: TbLetterX, style: { borderColor: 'transparent', border: 0 }, shape: 'none', backgroundType: 'pattern' },
    { id: 2, type: 'circle', icon: MdOutlineQrCode2, style: { borderRadius: '50%', borderColor: '#000000', padding: '50px' }, shape: 'circle', backgroundType: 'pattern' },
    { id: 3, type: 'square', icon: MdOutlineQrCode2, style: { borderRadius: '0', borderColor: '#000000' }, shape: 'square', backgroundType: 'pattern' },
    { id: 4, type: 'rounded', icon: MdOutlineQrCode2, style: { borderRadius: '15px', borderColor: '#000000' }, shape: 'rounded', backgroundType: 'pattern' },
    { id: 5, type: 'hexagon', icon: MdOutlineQrCode2, style: { clipPath: 'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 24%)', borderColor: '#000000 ', padding: '50px' }, shape: 'hexagon', backgroundType: 'pattern', },
    { id: 6, type: 'octagon', icon: MdOutlineQrCode2, style: { clipPath: 'polygon(30% 0%, 70% 0%, 100% 30%, 100% 70%, 70% 100%, 30% 100%, 0% 70%, 0% 30%)', borderColor: '#000000', padding: '40px' }, shape: 'octagon', backgroundType: 'pattern', },
];

const getShapeStyle = (shape) => {
    switch (shape) {
        case 'circle':
            return { borderRadius: '50%' };
        case 'rounded':
            return { borderRadius: '15px' };
        case 'square':
            return { borderRadius: '0' };
        case 'hexagon':
            return { clipPath: 'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 24%)' };
        case 'octagon':
            return { clipPath: 'polygon(30% 0%, 70% 0%, 100% 30%, 100% 70%, 70% 100%, 30% 100%, 0% 70%, 0% 30%)' };
        default:
            return {};
    }
};

const getBackgroundStyle = (backgroundType, color, patternImage) => {
    switch (backgroundType) {
        case 'solid':
            return { backgroundColor: color };
        case 'pattern':
            return { backgroundImage: `url(${patternImage})`, backgroundSize: 'cover' };
        default:
            return { backgroundColor: '#000000' };
    }
};



export default function ScrollableMarcoQrs({ onStyleClick, value, onChange }) {
    const { setQrBgColor, qrBgColor } = useQr()

    const handleColorBgQr = (color) => {
        setQrBgColor(color);
    };

    return (
        <Box sx={{ width: 'auto', bgcolor: 'background.paper' }}>
            <Tabs
                value={value}
                onChange={onChange}
                variant="scrollable"
                scrollButtons="auto"
                TabIndicatorProps={{
                    style: {
                        backgroundColor: "",
                        height: '4px'
                    }
                }}
                aria-label="scrollable auto tabs example"
                sx={{
                    '& .MuiTabs-scrollButtons': {
                        width: '20px',
                        color: '#284B63',
                    },
                }}
            >
                {qrStyles.map((style) => (
                    <Tab
                        key={style.id}
                        label={
                            <div
                                className='tab'
                                style={{
                                    ...getShapeStyle(style.shape),
                                    ...getBackgroundStyle(style.backgroundType, style.style.backgroundColor, style.patternImage,),
                                    borderColor: style.style.borderColor,
                                    borderWidth: style.shape !== 'none' ? '2px' : '0px',
                                    borderStyle: 'solid',
                                    padding: '20px'
                                }}
                                onClick={() => onStyleClick(style)}
                            >
                                <style.icon size={35} />
                            </div>
                        }
                    />
                ))}
            </Tabs>
            <div className='flex items-center mt-4 gap-4'>
                <span>Background color:</span>
                <div className="flex items-center p-3 gap-2 w-auto bg-white border border-gray-300 rounded shadow-md" >
                    <ColorPicker setColor={handleColorBgQr} initialColor={qrBgColor} />
                    <span>{qrBgColor}</span>
                </div>
            </div>
        </Box>
    );
}