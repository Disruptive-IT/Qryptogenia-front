import { useState, useRef, useEffect } from 'react';
import { useQr } from '../../../../../context/QrContext';
import Scrollcornersqueare from './scrollcornersquare';
import Scrollcornerdot from './scrollcornerdot';
import ScrollableDesingQrs from './scrollableDesingQrs';
import ScrollableMarcoQrs from './scrollableMarcoQrs';
import { Tabs, Tab } from '@mui/material';
import GradientColorPicker from 'react-gcolor-picker';
import { MdQrCodeScanner, MdOutlineQrCode, MdOutlineQrCode2 } from "react-icons/md";
import { IoQrCodeOutline } from "react-icons/io5";
import { SlFrame } from "react-icons/sl";

/**
 * @Author : Jobserd Julián Ocampo,   @date 2024-07-24 15:59:16
 * @description : Código dedicado a toda la seccion del Design del qr, contiene los "marcos" y las posibles formas del data del qr
 * @return : Contenido del design
**/

const Design = () => {
    const [tabValue, setTabValue] = useState(0);
    const [subTabValues, setSubTabValues] = useState({
        0: 0, 1: 0, 2: 0, 3: 0,
    });
    const { qrProps, setQrColor, setMarcoType, setDotsType, setCornersSquareType, setCornersDotType, setDotsColor, setCornersSquareColor, setCornersDotColor } = useQr();
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

    const handleSubTabChange = (tabIndex, subTabIndex) => {
        setSubTabValues(prevState => ({
            ...prevState,
            [tabIndex]: subTabIndex,
        }));
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

    const handleStyleMarco = (type) => {
        console.log(type);
        setMarcoType(type);
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

    const tabTextColor = "#FF001F";

    return (
        <>
            <div className="tabs-container">
                <Tabs
                    value={tabValue}
                    onChange={handleTabChange}
                    variant="scrollable"
                    scrollButtons="auto"
                    aria-label="scrollable auto tabs example"

                    TabIndicatorProps={{
                        style: {
                            backgroundColor: "#FF001F",
                            height: '4px'
                        }
                    }}
                    sx={{
                        '& .MuiTabs-scrollButtons': {
                            width: '20px',
                            color: '#284B63',
                        },
                        '& .Mui-selected': {
                            color: '#FF001F', // cplor del texto seleccionado
                        },
                        '& .MuiTab-root': {
                            color: '#808080', // color text
                            '&.Mui-selected': {
                                color: '#FF001F', ///coolor cuadro
                            }
                        },
                    }}

                >
                    <Tab icon={<SlFrame />} label="Qr frame" sx={{
                        fontSize: '14px', fontWeight: 'bold',
                    }} />
                    <Tab icon={<MdOutlineQrCode2 />} label="Dots" sx={{
                        fontSize: '14px', fontWeight: 'bold',
                    }} />
                    <Tab icon={<MdOutlineQrCode />} label="Corners Square" sx={{
                        fontSize: '14px', fontWeight: 'bold',
                    }} />
                    <Tab icon={<IoQrCodeOutline />} label="Corners Dot" sx={{
                        fontSize: '14px', fontWeight: 'bold',
                    }} />
                </Tabs>
            </div>
            {tabValue === 0 && (
                <div>
                    <ScrollableMarcoQrs
                        onStyleClick={handleStyleMarco}
                        value={subTabValues[0]}
                        onChange={(event, newValue) => handleSubTabChange(0, newValue)}
                    />
                </div>
            )}
            {tabValue === 1 && (
                <div >
                    <ScrollableDesingQrs
                        onStyleClick={handleStyleChange}
                        value={subTabValues[1]}
                        onChange={(event, newValue) => handleSubTabChange(1, newValue)}
                    />
                    <div className="flex items-center mb-5 ml-7">

                        <div className="flex items-center border border-gray-300 rounded p-2 ml-3 mt-5 mb-1">
                            <div
                                className="w-10 h-10 border border-gray-300 rounded cursor-pointer"
                                style={{ background: colorPickerStates.isDotsColorPickerOpen && currentColorPicker === 'dots' ? qrProps.dotsColor : qrProps.dotsColor || '#D14B08' }}
                                onClick={() => handleToggleColorPicker('isDotsColorPickerOpen')}
                            ></div>
                            <input
                                type="text"
                                value={qrProps.dotsColor}
                                readOnly
                                className="ml-4 border-none outline-none"
                            />
                        </div>
                        {colorPickerStates.isDotsColorPickerOpen && (
                            <div className="absolute z-50 flex flex-col items-center p-3 bg-white border border-gray-300 rounded shadow-md" ref={colorPickerRefs.dots}>
                                <GradientColorPicker
                                    enableAlpha={true}
                                    disableHueSlider={false}
                                    presetColors={[]}
                                    onChange={(color) => handleColorChange(color, 'dots')}
                                />
                            </div>
                        )}
                    </div>
                </div>
            )}
            {tabValue === 2 && (
                <div className='ml-4'>
                    <Scrollcornersqueare
                        onStyleClick={handleStyleChangecorner}
                        value={subTabValues[2]}
                        onChange={(event, newValue) => handleSubTabChange(2, newValue)}
                    />
                    <div className="flex items-center mb-5 ml-1">

                        <div className="flex items-center border border-gray-300 rounded p-2 ml-3 mt-5 mb-5">
                            <div
                                className="w-10 h-10 border border-gray-300 rounded cursor-pointer"
                                style={{ background: colorPickerStates.isCornersSquareColorPickerOpen && currentColorPicker === 'cornersSquare' ? qrProps.cornersSquareColor : qrProps.cornersSquareColor || '#fff' }}
                                onClick={() => handleToggleColorPicker('isCornersSquareColorPickerOpen')}
                            ></div>
                            <input
                                type="text"
                                value={qrProps.cornersSquareColor}
                                readOnly
                                className="ml-4 border-none outline-none"
                            />
                        </div>
                        {colorPickerStates.isCornersSquareColorPickerOpen && (
                            <div className="absolute z-50 flex flex-col items-center p-3 bg-white border border-gray-300 rounded shadow-md" ref={colorPickerRefs.cornersSquare}>
                                <GradientColorPicker
                                    enableAlpha={true}
                                    disableHueSlider={false}
                                    presetColors={[]}
                                    onChange={(color) => handleColorChange(color, 'cornersSquare')}
                                />
                            </div>
                        )}
                    </div>
                </div>
            )}
            {tabValue === 3 && (
                <div className='ml-4'>
                    <Scrollcornerdot
                        onStyleClick={handleStyleChangecornerdot}
                        value={subTabValues[3]}
                        onChange={(event, newValue) => handleSubTabChange(3, newValue)}
                    />
                    <div className="flex items-center mb-5 ml-1">

                        <div className="flex items-center border border-gray-300 rounded p-2 ml-3 mt-5 mb-5">
                            <div
                                className="w-10 h-10 border border-gray-300 rounded cursor-pointer"
                                style={{ background: colorPickerStates.isCornersDotColorPickerOpen && currentColorPicker === 'cornersDot' ? qrProps.cornersDotColor : qrProps.cornersDotColor || '#fff' }}
                                onClick={() => handleToggleColorPicker('isCornersDotColorPickerOpen')}
                            ></div>
                            <input
                                type="text"
                                value={qrProps.cornersDotColor}
                                readOnly
                                className="ml-4 border-none outline-none"
                            />
                        </div>
                        {colorPickerStates.isCornersDotColorPickerOpen && (
                            <div className="absolute z-50 flex flex-col items-center p-3 bg-white border border-gray-300 rounded shadow-md" ref={colorPickerRefs.cornersDot}>
                                <GradientColorPicker
                                    enableAlpha={true}
                                    disableHueSlider={false}
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


export default Design;