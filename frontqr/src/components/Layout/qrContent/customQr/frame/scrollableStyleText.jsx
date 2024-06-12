import { useState } from 'react';
import { useQr } from '../../../../../context/QrContext';
import { ColorPicker } from './colorPicker';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';

export const ScrollableStyleText = () => {
    const { setTextColor, setTextSize, textSize } = useQr();
    const [value, setValue] = useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    const handleColorChange = (color) => {
        setTextColor(color);
    };

    const handleFontSizeChange = (event) => {
        setTextSize(`${event.target.value}px`);
    };

    return (
        <div className='w-full space-y-8'>
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
                <Tab label="A" style={{ fontSize: '25px', fontWeight: 'bold', textTransform: 'uppercase', color: '#fff', textShadow: '-3px 0 black, 0 3px black, 3px 0 black, 0 -3px black' }} />
                <Tab label="B" style={{ fontSize: '25px', fontWeight: 'bold', textTransform: 'uppercase', textShadow: '3px 3px #888888' }} />
                <Tab label="C" style={{ fontSize: '25px', fontWeight: 'bold', textTransform: 'uppercase', textShadow: '-3px 0 white, 0 3px white, 3px 0 white, 0 -3px white' }} />
                <Tab label="D" style={{ fontSize: '25px', fontWeight: 'bold', textTransform: 'uppercase', color: '#fff', textShadow: '-3px 0 black, 0 3px black, 3px 0 black, 0 -3px black' }} />
                <Tab label="E" style={{ fontSize: '25px', fontWeight: 'bold', textTransform: 'uppercase', textShadow: '3px 3px #888888' }} />
                <Tab label="F" style={{ fontSize: '25px', fontWeight: 'bold', textTransform: 'uppercase', textShadow: '-3px 0 white, 0 3px white, 3px 0 white, 0 -3px white' }} />
            </Tabs>
            <div className='relative justify-evenly items-center flex gap-4'>
                <ColorPicker setColor={handleColorChange} position={"top-[-380px] left-[100px]"} />
                <label htmlFor="fontSize" className="mb-2">Font Size:</label>
                <input
                    type="range"
                    id="fontSize"
                    name="fontSize"
                    min="16"
                    max="30"
                    onChange={handleFontSizeChange}
                />
            </div>
        </div>
    );
};