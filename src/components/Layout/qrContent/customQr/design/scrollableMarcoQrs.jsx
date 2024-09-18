/*
 * @Author : Jaider cuartas,   @date 2024-07-15 20:13:14
 * @description : Componente para mostrar una lista scrollable de marcos y estilos de diseño para códigos QR. Cada pestaña representa un estilo de marco con su respectiva vista previa.
 * @Props :
 *   - onStyleClick: Función callback que se llama al hacer clic en un estilo de marco. Recibe el objeto de estilo como parámetro.
 *   - value: Valor seleccionado de la pestaña actual.
 *   - onChange: Función callback que se llama cuando cambia la pestaña seleccionada.
 * @return : Retorna un componente que muestra pestañas scrollable con diferentes marcos y estilos de diseño para códigos QR.
 */

/**
 * @UpdatedBy : Jobserd Julián Ocampo,   @date 2024-08-01 13:36:47
 * @description : Mejor implementacion del color picker, sus estados y responsive
**/

/**
 @UpdatedBy : Cristian Rueda,   @date 2024-09-17 15:44:17
 * @description : Cambio de color de la lina de scroll, borde y QR
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
import { useQr } from '../../../../../context/QrContext';
import { MdOutlineQrCode, MdOutlineQrCode2 } from "react-icons/md";
import { TbLetterX } from "react-icons/tb";
import { MdOutlineCancel } from "react-icons/md";
import GradientColorPicker from 'react-gcolor-picker';

const qrStyles = [
    { id: 1, type: 'default', icon: TbLetterX, style: { borderColor: 'transparent', border: 0, padding: '37px' }, shape: 'none', backgroundType: 'pattern' },
    { id: 2, type: 'circle', icon: MdOutlineQrCode2, style: { borderRadius: '50%', borderColor: '#000000', padding: '35px' }, shape: 'circle', backgroundType: 'pattern' },
    { id: 3, type: 'square', icon: MdOutlineQrCode2, style: { borderRadius: '0', borderColor: '#000000', padding: '25px' }, shape: 'square', backgroundType: 'pattern' },
    { id: 4, type: 'rounded', icon: MdOutlineQrCode2, style: { borderRadius: '15px', borderColor: '#000000', padding: '25px' }, shape: 'rounded', backgroundType: 'pattern' },
    { id: 5, type: 'hexagon', icon: MdOutlineQrCode2, style: { clipPath: 'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 24%)', borderColor: '#000000 ', padding: '35px' }, shape: 'hexagon', backgroundType: 'pattern', },
    { id: 6, type: 'octagon', icon: MdOutlineQrCode2, style: { clipPath: 'polygon(30% 0%, 70% 0%, 100% 30%, 100% 70%, 70% 100%, 30% 100%, 0% 70%, 0% 30%)', borderColor: '#000000', padding: '35px' }, shape: 'octagon', backgroundType: 'pattern', },
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
    const [isBgColorColorPickerOpen, setBgColorColorPickerOpen] = React.useState(false)
    const pickerRef = React.useRef(null);

    const handleColorChange = (color) => {
        setQrBgColor(color);
    };

    const handleClickOutside = (event) => {
        if (pickerRef.current && !pickerRef.current.contains(event.target)) {
            setBgColorColorPickerOpen(false);
        }
    };

    React.useEffect(() => {
        // Add event listener for clicks outside of the picker
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            // Cleanup the event listener
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    return (
        <Box sx={{ width: 'auto', bgcolor: 'background.paper' }}>
            <Tabs
    value={value}
    onChange={onChange}
    variant="scrollable"
    scrollButtons="auto"
    TabIndicatorProps={{
        style: {
            backgroundColor: "#CC2905", // Color barra scroll DESIGN
            height: '4px'
        }
    }}
    aria-label="scrollable auto tabs example"
    sx={{
        '& .MuiTabs-scrollButtons': { //Color flechas scroll
            width: '20px',
            color: '',
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
                        ...getBackgroundStyle(style.backgroundType, style.style.backgroundColor, style.patternImage),
                        borderColor: style.style.borderColor,
                        borderWidth: style.shape !== 'none' ? '2px' : '0px',
                        borderStyle: 'solid',
                        padding: '20px',
                        display: 'flex',       // Ensure the div takes full space 
                        alignItems: 'center',  // Center content vertically
                        justifyContent: 'center', // Center content horizontally
                        color : '#000000', // Color QRs
                        borderColor: '#000000' // Color borde QRs
                    }}
                >
                    <style.icon size={35} />
                </div>
            }
            onClick={() => onStyleClick(style)}  // Move onClick here
        />
    ))}
</Tabs>
            <div className='pl-4 flex items-center gap-4'>
                <div className="flex items-center border border-gray-300 rounded p-2 ml-3 mt-5 mb-1">
                    <div
                        className="w-10 h-10 border border-gray-300 rounded cursor-pointer"
                        style={{ background: qrBgColor }}
                        onClick={() => setBgColorColorPickerOpen(!isBgColorColorPickerOpen)}
                    ></div>
                    <span className='mx-4'>{qrBgColor}</span>
                </div>
                {isBgColorColorPickerOpen && (
                    <div className="absolute z-50 flex flex-col items-center p-3 bg-white border border-gray-300 rounded shadow-md" ref={pickerRef}>
                        <GradientColorPicker
                            enableAlpha={true}
                            disableHueSlider={false}
                            presetColors={[]}
                            onChange={(color) => handleColorChange(color)}
                        />
                    </div>
                )}
            </div>
        </Box>
    );
}