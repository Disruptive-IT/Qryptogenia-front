import { useEffect, useRef, useState } from 'react';
import GradientColorPicker from 'react-gcolor-picker';

export const ColorPicker = ({ setColor, position }) => {
    const [selectColor, setSelectColor] = useState('#ffffff');
    const [showColorPicker, setShowColorPicker] = useState(false);
    const colorPickerRef = useRef(null);

    const handleColorChange = (color) => {
        setSelectColor(color);
        setColor(color);
    };

    const ShowColorPicker = () => {
        setShowColorPicker(!showColorPicker);
    };

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (colorPickerRef.current && !colorPickerRef.current.contains(event.target)) {
                setShowColorPicker(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    return (
        <div className='relative justify-evenly items-center flex gap-4 z-20'>
            <div
                className="w-20 md:w-10 h-10 border border-gray-300 rounded cursor-pointer"
                style={{ background: selectColor }}
                onClick={ShowColorPicker}
            ></div>
            <div ref={colorPickerRef} className={`absolute ${position} w-[30px]`}>
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
                    onChange={handleColorChange}
                />)}
            </div>
        </div>
    );
};