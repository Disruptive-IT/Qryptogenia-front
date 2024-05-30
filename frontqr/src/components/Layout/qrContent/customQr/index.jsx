import { useState } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import imgQr from '../../../../assets/imgs/qr.png';
import ScrollableDesingQrs from './design/scrollableDesingQrs';
import Frame from './frame';
import Logo from './logo';
import QR from '../qrCode';
import Design from './design';
import { useQr } from '../../../../context/QrContext';

const options = [
    { name: 'Text', component: Frame },
    { name: 'Pattern', component: Design },
    { name: 'Background', component: Logo },
];

const CustomQr = () => {
    const { qrBgColor} = useQr();
    const [selectedOptionIndex, setSelectedOptionIndex] = useState(0);

    const handleOptionSelect = (index) => {
        setSelectedOptionIndex(index);
    };

    const OptionComponent = options[selectedOptionIndex].component;

    return (
        <div className='w-full h-[680px] rounded-md flex flex-col justify-between pb-4'>
            <div className='h-[250px] flex relative' style={{ backgroundColor: qrBgColor }}>
                <QR />
            </div>
            <div className='flex flex-col pt-5 min-h-[350px] '>
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

                <div className='p-4 space-y-4 rounded-md   '>
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