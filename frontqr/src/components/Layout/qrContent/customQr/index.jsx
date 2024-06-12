import { useState, useRef, useEffect } from 'react';
import Button from '@mui/material/Button';
import ScrollableDesingQrs from './design/scrollableDesingQrs';
import Scrollcornersqueare from './design/scrollcornersquare';
import Scrollcornerdot from './design/scrollcornerdot';
import Frame from './frame';
import Logo from './logo';
import QR from '../qrCode';
import { useQr } from '../../../../context/QrContext';
import { Tabs, Tab } from '@mui/material';
import GradientColorPicker from 'react-gcolor-picker';
import Accordion from './design/accordion';
import { Fa1 } from "react-icons/fa6";
import { MdQrCodeScanner } from "react-icons/md";

const Design = ({ onTabSelect }) => {
    const [tabValue, setTabValue] = useState(0);
    const { qrProps, setQrColor, setDotsType, setCornersSquareType, setCornersDotType, setDotsColor, setCornersSquareColor, setCornersDotColor } = useQr();
    const [colorPickerStates, setColorPickerStates] = useState({
        isDotsColorPickerOpen: false,
        isCornersSquareColorPickerOpen: false,
        isCornersDotColorPickerOpen: false,
    });
    const [currentColorPicker, setCurrentColorPicker] = useState(null);

    const colorPickerRefs = {
        dots: useRef(null),
        cornersSquare: useRef(null),
        cornersDot: useRef(null),
    };

    const handleToggleColorPicker = (type) => {
        setColorPickerStates(prevState => ({
            ...prevState,
            [type]: !prevState[type],
        }));
        setCurrentColorPicker(type);
    };

    const handleTabChange = (event, newValue) => {
        setTabValue(newValue);
    };

    const handleClickOutside = (event) => {
        Object.keys(colorPickerRefs).forEach(type => {
            if (colorPickerRefs[type].current && !colorPickerRefs[type].current.contains(event.target)) {
                setColorPickerStates(prevState => ({
                    ...prevState,
                    [`is${type.charAt(0).toUpperCase() + type.slice(1)}ColorPickerOpen`]: false,
                }));
            }
        });
    };

    useEffect(() => {
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    const handleColorChange = (color, type) => {
        console.log(`Color changed for ${type}:`, color);
        setQrColor(color);
        if (type === 'dots') {
            setDotsColor(color);
        } else if (type === 'cornersSquare') {
            setCornersSquareColor(color);
        } else if (type === 'cornersDot') {
            setCornersDotColor(color);
        }
    };

    const handleStyleChange = (type) => {
        setDotsType(type);
    };

    const handleStyleChangecorner = (type) => {
        setCornersSquareType(type);
    };

    const handleStyleChangecornerdot = (type) => {
        setCornersDotType(type);
    };

    return (
        <>
            <Tabs value={tabValue} onChange={handleTabChange}>
                <Tab icon={<MdQrCodeScanner />} label="Dots" />
                <Tab icon={<MdQrCodeScanner />} label="Corners Square" />
                <Tab icon={<MdQrCodeScanner />} label="Corners Dot" />
            </Tabs>
            {tabValue === 0 && (
                <div>
                    <ScrollableDesingQrs onStyleClick={handleStyleChange} />
                    <div className="flex items-center mb-5 ml-5">
                        <label>Dots Color:</label>
                        <div
                            className="w-10 h-10 border border-gray-300 rounded cursor-pointer ml-3 mt-5 mb-5"
                            style={{ background: colorPickerStates.isDotsColorPickerOpen && currentColorPicker === 'dots' ? qrProps.dotsColor : qrProps.dotsColor || '#D14B08' }}
                            onClick={() => handleToggleColorPicker('isDotsColorPickerOpen')}
                        ></div>
                        {colorPickerStates.isDotsColorPickerOpen && (
                            <div className="absolute z-50" ref={colorPickerRefs.dots}>
                                <GradientColorPicker
                                    enableAlpha={true}
                                    disableHueSlider={false}
                                    disableAlphaSlider={false}
                                    disableInput={false}
                                    disableHexInput={false}
                                    disableRgbInput={false}
                                    disableAlphaInput={false}
                                    presetColors={[]}
                                    onChange={(color) => handleColorChange(color, 'dots')}
                                />
                            </div>
                        )}
                    </div>
                </div>
            )}
            {tabValue === 1 && (
                <div>
                    <Scrollcornersqueare onStyleClick={handleStyleChangecorner} />
                    <div className="flex items-center mb-5">
                        <label>Corners Square Color:</label>
                        <div
                            className="w-10 h-10 border border-gray-300 rounded cursor-pointer ml-3 mt-5 mb-5"
                            style={{ background: colorPickerStates.isCornersSquareColorPickerOpen && currentColorPicker === 'cornersSquare' ? qrProps.cornersSquareColor : qrProps.cornersSquareColor || '#fff' }}
                            onClick={() => handleToggleColorPicker('isCornersSquareColorPickerOpen')}
                        ></div>
                        {colorPickerStates.isCornersSquareColorPickerOpen && (
                            <div className="absolute z-50" ref={colorPickerRefs.cornersSquare}>
                                <GradientColorPicker
                                    enableAlpha={true}
                                    disableHueSlider={false}
                                    disableAlphaSlider={false}
                                    disableInput={false}
                                    disableHexInput={false}
                                    disableRgbInput={false}
                                    disableAlphaInput={false}
                                    presetColors={[]}
                                    onChange={(color) => handleColorChange(color, 'cornersSquare')}
                                />
                            </div>
                        )}
                    </div>
                </div>
            )}
            {tabValue === 2 && (
                <div>
                    <Scrollcornerdot onStyleClick={handleStyleChangecornerdot} />
                    <div className="flex items-center mb-5">
                        <label>Corners Dot Color:</label>
                        <div
                            className="w-10 h-10 border border-gray-300 rounded cursor-pointer ml-3 mt-5 mb-5"
                            style={{ background: colorPickerStates.isCornersDotColorPickerOpen && currentColorPicker === 'cornersDot' ? qrProps.cornersDotColor : qrProps.cornersDotColor || '#fff' }}
                            onClick={() => handleToggleColorPicker('isCornersDotColorPickerOpen')}
                        ></div>
                        {colorPickerStates.isCornersDotColorPickerOpen && (
                            <div className="absolute z-50" ref={colorPickerRefs.cornersDot}>
                                <GradientColorPicker
                                    enableAlpha={true}
                                    disableHueSlider={false}
                                    disableAlphaSlider={false}
                                    disableInput={false}
                                    disableHexInput={false}
                                    disableRgbInput={false}
                                    disableAlphaInput={false}
                                    presetColors={[]}
                                    onChange={(color) => handleColorChange(color, 'cornersDot')}
                                />
                            </div>
                        )}
                    </div>
                </div>
            )}
        </>
    );
};

const options = [
    { name: 'Frame', component: Frame },
    { name: 'Design', component: Design },
    { name: 'Logo', component: Logo },
];

const CustomQr = () => {
    const [selectedOptionIndex, setSelectedOptionIndex] = useState(0);

    const handleOptionSelect = (index) => {
        setSelectedOptionIndex(index);
    };

    const OptionComponent = options[selectedOptionIndex].component;

    return (
        <div className='w-full h-[680px] rounded-md flex flex-col justify-between pb-4'>
            <div className='h-[250px] flex relative '>
                <QR />
            </div>
            <div className='flex flex-col h-[390px] pt-5 '>
                <div className='space-x-3 mx-auto'>
                    {options.map((option, index) => (
                        <Button
                            variant="outlined"
                            onClick={() => handleOptionSelect(index)}
                            key={index}
                        >
                            {option.name}
                        </Button>
                    ))}
                </div>
                <div className='p-4 space-y-4 rounded-md'>
                    <OptionComponent onTabSelect={handleOptionSelect} />
                </div>
            </div>
        </div>
    );
}

export default CustomQr;