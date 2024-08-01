import { useState, useRef, useEffect } from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import { useQr } from '../../../../../context/QrContext';
import GradientColorPicker from 'react-gcolor-picker';

export default function ScrollableFontText() {
    const { setQrFontStyle, setTextColor, qrTextProps } = useQr();
    const [isTextColorPickerOpen, setTextColorPickerOpen] = useState(false);
    const [value, setValue] = useState(0);
    const pickerRef = useRef(null);

    const fontStyles = [
        { fontFamily: 'Arial, sans-serif', fontWeight: 'bold', textAlign: 'center' },
        { fontFamily: 'Verdana, serif', fontStyle: 'italic', textAlign: 'center' },
        { fontFamily: 'Courier New, monospace', fontWeight: 'normal', textAlign: 'justify' },
        { fontFamily: 'Times New Roman, Times, serif', fontWeight: 'bold', textAlign: 'left' },
        { fontFamily: 'Georgia, serif', fontStyle: 'italic', textAlign: 'right' },
        { fontFamily: 'Lucida Console, Monaco, monospace', fontWeight: 'normal', textAlign: 'left' },
        { fontFamily: 'Tahoma, Geneva, sans-serif', fontStyle: 'normal', textAlign: 'right' },
        { fontFamily: 'Impact, Charcoal, sans-serif', fontWeight: 'bold', textAlign: 'center' },
        { fontFamily: 'Comic Sans MS, Chalkboard SE, sans-serif', fontStyle: 'italic', textAlign: 'left' },
        { fontFamily: 'Brush Script MT, Brush Script, cursive', fontStyle: 'normal', textAlign: 'right' }
    ];

    const handleChange = (event, newValue) => {
        setValue(newValue);
        setQrFontStyle(fontStyles[newValue]);
    };

    const handleColorChange = (color) => {
        setTextColor(color);
    };

    const handleClickOutside = (event) => {
        if (pickerRef.current && !pickerRef.current.contains(event.target)) {
            setTextColorPickerOpen(false);
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

    return (
        <Box sx={{ width: 'auto', bgcolor: 'background.paper', marginTop: "10px" }}>
            <Tabs
                value={value}
                onChange={handleChange}
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
                {fontStyles.map((style, index) => {
                    const fontName = style.fontFamily ? style.fontFamily.split(',')[0] : 'x';
                    return <Tab key={index} sx={{ margin: "5px" }} label={<span style={style}>{fontName}</span>} />;
                })}
            </Tabs>
            <div className='relative space-y-4 p-4'>
                <div className='flex gap-4 items-center'>
                    <div className="flex items-center border border-gray-300 rounded p-2 ml-3 mt-5 mb-1">
                        <div
                            className="w-10 h-10 border border-gray-300 rounded cursor-pointer"
                            style={{ background: qrTextProps.qrTextColor }}
                            onClick={() => setTextColorPickerOpen(!isTextColorPickerOpen)}
                        ></div>
                        <span className='mx-4'>{qrTextProps.qrTextColor}</span>
                    </div>
                    {isTextColorPickerOpen && (
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
            </div>
        </Box>
    );
}
