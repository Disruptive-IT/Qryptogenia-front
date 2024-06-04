import { useState } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import ScrollableDesingQrs from './scrollableDesingQrs';
import Frame from './frame';
import Logo from './logo';
import QR from '../qrCode';
import { useQr } from '../../../../context/QrContext';

const Design = ({ onTabSelect }) => {
    const { setQrColor, setDotsType, setCornersSquareType, setCornersDotType } = useQr();

    const handleColorChange = (event) => {
        setQrColor(event.target.value);
    };

    const handleDotsTypeChange = (event) => {
        setDotsType(event.target.value);
    };

    const handleCornersSquareTypeChange = (event) => {
        setCornersSquareType(event.target.value);
    };

    const handleCornersDotTypeChange = (event) => {
        setCornersDotType(event.target.value);
    };

    return (
        <>
            <ScrollableDesingQrs onTabSelect={onTabSelect} />
            <TextField
                id="filled-secondary"
                label="Color"
                variant="filled"
                color="secondary"
                fullWidth
                onChange={handleColorChange}
            />
            <div>
                <label>Dots Type:</label>
                <select onChange={handleDotsTypeChange}>
                    <option value="rounded">Rounded</option>
                    <option value="dots">Dots</option>
                    <option value="classy">Classy</option>
                    <option value="classy-rounded">Classy Rounded</option>
                    <option value="square">Square</option>
                    <option value="extra-rounded">Extra Rounded</option>
                </select>
            </div>
            <div>
                <label>Corners Square Type:</label>
                <select onChange={handleCornersSquareTypeChange}>
                    <option value="dot">Dot</option>
                    <option value="square">Square</option>
                    <option value="extra-rounded">Extra Rounded</option>
                </select>
            </div>
            <div>
                <label>Corners Dot Type:</label>
                <select onChange={handleCornersDotTypeChange}>
                    <option value="dot">Dot</option>
                    <option value="square">Square</option>
                </select>
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
            <div className='h-[250px] flex relative'>
                <QR />
            </div>
            <div className='flex flex-col pt-5 '>
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

                <div className='p-4 space-y-4 rounded-md  '>
                    <OptionComponent onTabSelect={handleOptionSelect} />
                </div>
            </div>
            <div className='flex justify-around mt-4'>
                <Button variant="contained">Descargar PNG</Button>
                <Button variant="contained">Descargar SVG</Button>
            </div>
        </div>
    );
}

export default CustomQr;