import { useState } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import imgQr from '../../../../assets/imgs/qr.png';
import InputText from './StyleInput';
import ScrollableFrameQrs from './scrollableFrameQrs';


const Frame = () => (
    <>
        <InputText label="Escribir el texto" variant="filled" fullWidth />
    </>
);

const Design = () => (
    <>
        <p>Acá otra cosa</p>
    </>
);

const Logo = () => (
    <>
        <Button variant="contained" fullWidth>Subir imagen</Button>
    </>
);

const options = [
    { name: 'Frame', component: <Frame /> },
    { name: 'Design', component: <Design /> },
    { name: 'Logo', component: <Logo /> },
];


const CustomQr = () => {
    const [currentContent, setCurrentContent] = useState(options[0].name);

    return (
        <div className='w-full h-[680px] rounded-md flex flex-col justify-between pb-4'>
            <div className='h-[200px] p-6 items-center w-full '>
                <img src={imgQr} alt="" className="w-56 h-56 m-auto" />
            </div>
            <div className='flex flex-col py-2 h-[230px] border-b-8 border-t-4 '>
                <div className='space-x-3 mx-auto'>
                    {options.map(option => (
                        <Button
                            variant="outlined"
                            onClick={() => setCurrentContent(option.name)}
                            key={option.name}
                        >
                            {option.name}
                        </Button>
                    ))}
                </div>
                <div className='p-4 space-y-4 rounded-md '>
                    <ScrollableFrameQrs />
                    {options.map(option => option.name === currentContent && option.component)}
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