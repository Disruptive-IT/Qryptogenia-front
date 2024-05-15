import { useState } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import imgQr from '../../../../assets/imgs/qr.png';
import InputText from './StyleInput';
import ScrollableFrameQrs from './scrollableFrameQrs';
import ScrollableDesingQrs from './scrollableDesingQrs';

const Frame = ({ inputValue, onTabSelect }) => {
    const [inputText, setInputText] = useState('');

    const handleInputChange = (event) => {
        setInputText(event.target.value);
    };

    return (
        <>
            <ScrollableFrameQrs inputValue={inputValue} onTabSelect={onTabSelect} />
            <InputText label="Escribir el texto" variant="filled" fullWidth onChange={handleInputChange} />
        </>
    );
};

const Design = ({ onTabSelect }) => (
    <>
        <ScrollableDesingQrs onTabSelect={onTabSelect} />
        <TextField
            id="filled-secondary"
            label="Color"
            variant="filled"
            color="secondary"
            fullWidth
        />
    </>
);

const Logo = () => (
    <>
        <Button variant="contained" fullWidth>Subir imagen</Button>
    </>
);

const options = [
    { name: 'Frame', component: Frame },
    { name: 'Design', component: Design },
    { name: 'Logo', component: Logo },
];

const CustomQr = () => {
    const [selectedOptionIndex, setSelectedOptionIndex] = useState(0);
    const [selectedTabIndex, setSelectedTabIndex] = useState(0);
    const [qrCustomization, setQrCustomization] = useState({});
    // const [inputText, setInputText] = useState('');
    const [textPosition, setTextPosition] = useState('top'); // Estado inicial para la posición del texto

    const handleOptionSelect = (index) => {
        setSelectedOptionIndex(index);
    };

    const handleTabSelect = (index) => {
        setSelectedTabIndex(index);

        switch (index) {
            case 0:
                setTextPosition('top-0 left-1/2 transform -translate-x-1/2');
                break;
            case 1:
                setTextPosition('top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2');
                break;
            case 2:
                setTextPosition('bottom-0 left-1/2 transform -translate-x-1/2');
                break;
            case 3:
                setTextPosition('top-0 left-0 w-auto');
                break;
            case 4:
                setTextPosition('top-0 right-0 ');
                break;
            case 5:
                setTextPosition('bottom-0 left-0');
                break;
            case 6:
                setTextPosition('bottom-0 right-0 ');
                break;
            default:
                setTextPosition('top');
        }
    };

    const OptionComponent = options[selectedOptionIndex].component;

    return (
        <div className='w-full h-[680px] rounded-md flex flex-col justify-between pb-4'>
            <div className='h-[200px] p-6 items-center w-full '>
                <div className='relative w-56 h-56 mx-auto'>
                    <img src={imgQr} alt="" className="w-full m-auto" />
                    <span className={`inline-block bg-gray-900 text-white px-4 rounded-xl absolute text-center ${textPosition}`}>Textooooo</span>
                </div>
            </div>

            <div className='flex flex-col py-2 h-[230px] border-b-8 border-t-4 '>
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

                <div className='p-4 space-y-4 rounded-md '>
                    <OptionComponent onTabSelect={handleTabSelect} onInputChange={(text) => setInputText(text)} /> {/* Asegúrate de pasar setInputText aquí */}
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