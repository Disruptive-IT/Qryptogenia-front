import * as React from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Chip from '@mui/material/Chip';
import ScrollableChipText from './scrollableChipText';
import { useQr } from '../../../../../context/QrContext';
import ScrollableFrameQrs from './scrollableFrameQrs';
import GradientColorPicker from 'react-gcolor-picker';
import { Button } from '@mui/material';

function Fuentes() {
    const { setQrFontStyle, setTextColor } = useQr();

    const handleTabSelect = (fontStyle) => {
        setQrFontStyle(fontStyle);
    };


    return (
        <div className='w-full'>
            <ScrollableFrameQrs onTabSelect={handleTabSelect} />
        </div >
    )
}
function Estilos() {
    const [selectColor, setSelectColor] = React.useState('#ffffff');
    const [showColorPicker, setShowColorPicker] = React.useState(false);
    const [fontSize, setFontSize] = React.useState(16); // initial font size

    const handleColorChange = (color) => {
        setSelectColor(color.hex);
    };

    const handleFontSizeChange = (event) => {
        setFontSize(event.target.value);
    };

    const ShowColorPicker = () => {
        setShowColorPicker(!showColorPicker);
    };

    return (
        <div className='w-full space-y-8'>
            <div className='flex justify-center gap-4 px-2'>
                <div className='cursor-pointer hover:bg-gray-500 transition-all delay-75 px-2 rounded-md shadow-xl' style={{ fontSize: '30px', fontWeight: 'bold', textTransform: 'uppercase', color: '#fff', textShadow: '-3px 0 black, 0 3px black, 3px 0 black, 0 -3px black', backgroundColor: selectColor }}>A</div>
                <div className='cursor-pointer hover:bg-gray-500 transition-all delay-75 px-2 rounded-md shadow-xl' style={{ fontSize: '30px', fontWeight: 'bold', textTransform: 'uppercase', textShadow: '3px 3px #888888', backgroundColor: selectColor }}>B</div>
                <div className='cursor-pointer hover:bg-gray-500 transition-all delay-75 px-2 rounded-md shadow-xl' style={{ fontSize: '30px', fontWeight: 'bold', textTransform: 'uppercase', textShadow: '-3px 0 white, 0 3px white, 3px 0 white, 0 -3px white', backgroundColor: selectColor }}>C</div>
                <div className='cursor-pointer hover:bg-gray-500 transition-all delay-75 px-2 rounded-md shadow-xl' style={{ fontSize: '30px', fontWeight: 'bold', textTransform: 'uppercase', color: '#fff', textShadow: '-3px 0 black, 0 3px black, 3px 0 black, 0 -3px black', backgroundColor: selectColor }}>D</div>
                <div className='cursor-pointer hover:bg-gray-500 transition-all delay-75 px-2 rounded-md shadow-xl' style={{ fontSize: '30px', fontWeight: 'bold', textTransform: 'uppercase', textShadow: '3px 3px #888888', backgroundColor: selectColor }}>E</div>
                <div className='cursor-pointer hover:bg-gray-500 transition-all delay-75 px-2 rounded-md shadow-xl' style={{ fontSize: '30px', fontWeight: 'bold', textTransform: 'uppercase', textShadow: '-3px 0 white, 0 3px white, 3px 0 white, 0 -3px white', backgroundColor: selectColor }}>F</div>
            </div>
            <div className='relative justify-evenly items-center flex gap-4'>
                <label htmlFor="titleColor" className=" mb-2">Color:</label>
                <div
                    className="w-20 md:w-10 h-10 border border-gray-300 rounded cursor-pointer"
                    style={{ background: selectColor }}
                    onClick={ShowColorPicker}
                ></div>
                <div className='absolute left-[-300px] top-[-300px] w-[30px]'>
                    {showColorPicker && (<GradientColorPicker
                        enableAlpha={true}
                        disableHueSlider={false}
                        disableAlphaSlider={false}
                        disableInput={false}
                        disableHexInput={false}
                        disableRgbInput={false}
                        disableAlphaInput={false}
                        presetColors={[]}
                        gradient={true}
                        color={selectColor}
                        onChangeComplete={handleColorChange}
                    />)}
                </div>
                <label htmlFor="fontSize" className="mb-2">Font Size:</label>
                <input
                    type="range"
                    id="fontSize"
                    name="fontSize"
                    min="10"
                    max="72"
                    value={fontSize}
                    onChange={handleFontSizeChange}
                />
            </div>
        </div>
    )
}
function Burbujas() {

    return (
        <div className='w-full'>
            <ScrollableChipText />
        </div>
    )
}


function ContentPanel({ value }) {
    const contentComponents = [<Fuentes />, <Estilos />, <Burbujas />];

    return (
        <Box display="flex" justifyContent="center" alignItems="center" height="100%">
            {contentComponents[value]}
        </Box>
    );
}

export default function ScrollableMain() {
    const [value, setValue] = React.useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    return (
        <Box sx={{ width: '100%', height: "240px" }}>
            <Tabs
                value={value}
                onChange={handleChange}
                variant="scrollable"
                scrollButtons="auto"
                aria-label="scrollable tabs example"
                sx={{
                    '&.MuiTabs-indicator': {
                        backgroundColor: 'primary.main',
                    },
                }}
            >
                <Tab label="Fuentes" />
                <Tab label="Estilos" />
                <Tab label="Burbujas" />
            </Tabs>
            <Box sx={{ p: 2 }}>
                <ContentPanel value={value} />
            </Box>
        </Box>
    );
}