import { useState, useRef, useEffect } from 'react';
import Button from '@mui/material/Button';
import ScrollableDesingQrs from './design/scrollableDesingQrs';
import Frame from './frame';
import Logo from './logo';
import QR from '../qrCode';
import { useQr } from '../../../../context/QrContext';
import GradientColorPicker from 'react-gcolor-picker';

const Design = ({ onTabSelect }) => {
    const { setQrColor, setDotsType, setCornersSquareType, setCornersDotType, setDotsColor, setCornersSquareColor, setCornersDotColor } = useQr();
    const [colorPickerStates, setColorPickerStates] = useState({
        isDotsColorPickerOpen: false,
        isCornersSquareColorPickerOpen: false,
        isCornersDotColorPickerOpen: false,
    });
    const [currentColorPicker, setCurrentColorPicker] = useState(null); // Nuevo estado para rastrear qué colorPicker está abierto

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
        setCurrentColorPicker(type); // Establecer el colorPicker actualmente abierto
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
        setQrColor(color);
        if (type === 'dots') {
            setDotsColor(color);
        } else if (type === 'cornersSquare') {
            setCornersSquareColor(color);
        } else if (type === 'cornersDot') {
            setCornersDotColor(color);
        }
    };

    return (
        <>
            <div className="flex items-center mb-4">
                <label>Dots Type:</label>
                <select onChange={(event) => setDotsType(event.target.value)}>
                    <option value="rounded">Rounded</option>
                    <option value="dots">Dots</option>
                    <option value="classy">Classy</option>
                    <option value="classy-rounded">Classy Rounded</option>
                    <option value="square">Square</option>
                    <option value="extra-rounded">Extra Rounded</option>
                </select>
                <div
                    className="w-10 h-10 border border-gray-300 rounded cursor-pointer ml-2"
                    style={{ background: colorPickerStates.isDotsColorPickerOpen && currentColorPicker === 'dots' ? useQr().qrProps.dotsColor : '#fff' }}
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
            <div className="flex items-center mb-4">
                <label>Corners Square Type:</label>
                <select onChange={(event) => setCornersSquareType(event.target.value)}>
                    <option value="dot">Dot</option>
                    <option value="square">Square</option>
                    <option value="extra-rounded">Extra Rounded</option>
                </select>
                <div
                    className="w-10 h-10 border border-gray-300 rounded cursor-pointer ml-2"
                    style={{ background: colorPickerStates.isCornersSquareColorPickerOpen && currentColorPicker === 'cornersSquare' ? useQr().qrProps.cornersSquareColor : '#fff' }}
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
            <div className="flex items-center mb-4">
                <label>Corners Dot Type:</label>
                <select onChange={(event) => setCornersDotType(event.target.value)}>
                    <option value="dot">Dot</option>
                    <option value="square">Square</option>
                </select>
                <div
                    className="w-10 h-10 border border-gray-300 rounded cursor-pointer ml-2"
                    style={{ background: colorPickerStates.isCornersDotColorPickerOpen && currentColorPicker === 'cornersDot' ? useQr().qrProps.cornersDotColor : '#fff' }}
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