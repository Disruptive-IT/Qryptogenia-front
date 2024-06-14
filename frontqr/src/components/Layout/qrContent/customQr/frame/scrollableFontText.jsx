import { useState } from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import { useQr } from '../../../../../context/QrContext';
import { ColorPicker } from '../colorPicker';
import Slider from '@mui/material/Slider';

export default function ScrollableFontText() {
    const { setQrFontStyle, setTextColor, setTextSize, qrTextProps } = useQr();
    const [value, setValue] = useState(0);

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

    const handleFontSizeChange = (e, newValue) => {
        setTextSize(`${newValue}px`); 
    };

    return (
        <Box sx={{ width: 'auto', bgcolor: 'background.paper' }}>
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
            >
                {fontStyles.map((style, index) => {
                    const fontName = style.fontFamily ? style.fontFamily.split(',')[0] : 'x';
                    return <Tab key={index} label={<span style={style}>{fontName}</span>} />;
                })}
            </Tabs>
            <div className='relative justify-between items-center flex gap-4 mt-4'>
                <div className='flex gap-4 items-center'>
                    <span className="mb-2">Text color: </span>
                    <ColorPicker setColor={handleColorChange} position={"top-[-380px] left-[100px]"} />
                </div>
                <div className='flex gap-4 items-center'>
                    <span className="mb-2">Font Size:</span>
                    <Slider
                        size="small"
                        defaultValue={0}
                        aria-label="fontSize"
                        valueLabelDisplay="on"
                        color="secondary"
                        min={16}
                        max={25}
                        step={1}
                        sx={{ width: "120px" }}
                        onChange={(event, newValue) => handleFontSizeChange(event, newValue)}
                    /></div>
            </div>
        </Box>
    );
}