import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import Chip from '@mui/material/Chip';
import { useQr } from '../../../../../context/QrContext';
import useQrState from '../../../../../hooks/useQr';
import GradientColorPicker from 'react-gcolor-picker';
import { useEffect, useRef, useState } from 'react';

/**
 * @Author : Jobserd Julián Ocampo,   @date 2024-08-01 14:10:49
 * @description : Componente de la seccion frame o texto. El contenido es dedicado a establecer las burbujas para el texto y su color
 * @return : Retorna los tabs para seleccion de las formas o burbujas y su color picker
**/

const bubbleStyles = [
    { borderRadius: '0', padding: '0', backgroundColor: "transparent" },
    { borderRadius: '10%', padding: '5px 12px' },
    { borderRadius: '25% 75% / 75% 25%', padding: '5px 12px' },
    { borderRadius: '40% 60% / 60% 40%', padding: '2px 15px' },
    { borderRadius: '50% 10% / 10% 50%', padding: '2px 8px' },
    { borderRadius: '50% 50% 0 0 / 50% 50% 0 0', padding: '2px 8px' },
    { borderRadius: '0 0 50% 50% / 0 0 50% 50%', padding: '2px 8px' },
    { borderRadius: '50% 0 0 50% / 50% 0 0 50%', padding: '3px 10px' },
    { borderRadius: '0 50% 50% 0 / 0 50% 50% 0', padding: '3px 10px' },
    { borderRadius: '20% 80% 30% 70% / 60% 40% 60% 40%', padding: '5px 10px' },
];

export default function ScrollableChipText() {
    const [value, setValue] = useState(0);
    const [isBubbleColorPickerOpen, setBubbleColorPickerOpen] = useState(false)
    const { setTextChip } = useQr();
    const { setTextChipColor, qrTextProps } = useQr();
    const pickerRef = useRef(null);

    const handleChange = (event, newValue) => {
        setValue(newValue);
        setTextChip(bubbleStyles[newValue])
    };

    const handleColorChange = (color) => {
        setTextChipColor(color);
    };

    const handleClickOutside = (event) => {
        if (pickerRef.current && !pickerRef.current.contains(event.target)) {
            setBubbleColorPickerOpen(false);
        }
    };

    useEffect(() => {
        // Add event listener for clicks outside of the picker
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            // Cleanup the event listener
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    const tabLabels = ['Default', 'Stay positive', 'Work hard', 'Focus on goal', 'Believe in yourself', 'Keep moving', 'Never give up', 'Stay strong', 'Be humble', 'Embrace change'];

    return (
        <Box sx={{ width: 'auto', bgcolor: 'background.paper', marginTop: "10px" }}>
            <Tabs
                value={value}
                onChange={handleChange}
                variant="scrollable"
                scrollButtons="auto"
                aria-label="scrollable auto tabs example"
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
                {Array.from({ length: 10 }).map((_, index) => (
                    <Tab
                        key={index}
                        label={
                            <Chip
                                label={tabLabels[index]}
                                style={{
                                    backgroundColor: 'gray',
                                    color: index === 0 ? 'black' : 'white',
                                    ...bubbleStyles[index % bubbleStyles.length],
                                    margin: "10px"
                                }}
                            />
                        }
                    />
                ))}
            </Tabs>
            <div className='pl-4 flex items-center gap-4'>
                <div className="flex items-center border border-gray-300 rounded p-2 ml-3 mt-5 mb-1">
                    <div
                        className="w-10 h-10 border border-gray-300 rounded cursor-pointer"
                        style={{ background: qrTextProps.qrTextChipColor }}
                        onClick={() => setBubbleColorPickerOpen(!isBubbleColorPickerOpen)}
                    ></div>
                    <span className='mx-4'>{qrTextProps.qrTextChipColor}</span>
                </div>
                {isBubbleColorPickerOpen && (
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