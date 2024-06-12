import React, { useState } from 'react';
import { useQr } from '../../../../../context/QrContext';
import { Checkbox, FormControlLabel, Button, TextField, FormGroup, FormControl, FormLabel } from '@mui/material';
import { ColorPicker } from '../frame/colorPicker';
import Slider from '@mui/material/Slider';

const Logo = () => {
    const { setQrImage, setQrBgColor, setQrImageSize } = useQr();
    const [includeImage, setIncludeImage] = useState(false);

    const handleImageChange = (event) => {
        if (event.target.files.length > 0) {
            const imageUrl = URL.createObjectURL(event.target.files[0]);
            setQrImage(imageUrl);
        }
    };

    const handleColorBgQr = (color) => {
        setQrBgColor(color);
    };

    const handleQrImageSize = (size) => {
        setQrImageSize(size);
    };
    
    const handleIncludeImageChange = (event) => {
        const isChecked = event.target.checked;
        setIncludeImage(isChecked);
        setIsCenteredImage(isChecked);
        if (!isChecked) {
            setQrImage(null);
        }
    };


    return (
        <div className='w-screen lg:w-90 p-2'>
            <div className='flex gap-5'>
                <div className='flex gap-3 items-center'>
                    <span>Color fondo:</span>
                    <ColorPicker setColor={handleColorBgQr} />
                </div>
            </div>

            <input
                accept="image/*"
                style={{ display: 'none' }}
                id="raised-button-file"
                type="file"
                onChange={handleImageChange}
                disabled={!includeImage}
            />

            <div className='my-5 space-x-2 w-[40vw] lg:w-[28vw]'>
                <FormControlLabel
                    control={
                        <Checkbox
                            checked={includeImage}
                            onChange={handleIncludeImageChange}
                            color="primary"
                        />
                    }
                    label="Incluir Imagen:"
                />
                <label htmlFor="raised-button-file">
                    <Button variant="contained" component="span" className='mt-2' fullWidth disabled={!includeImage}>
                        Subir imagen
                    </Button>
                </label>
                <FormGroup className={`my-5 ${includeImage ? 'h-[200px]' : ''}`}>
                    {includeImage && (
                        <div>
                            <FormLabel component="legend">Configuración</FormLabel>
                            <div className='flex justify-between items-center my-4 gap-5'>
                                <TextField
                                    id="outlined-number"
                                    label="Tamaño de la imagen"
                                    type="number"
                                    InputProps={{
                                        inputProps: {
                                            min: 1,
                                            max: 100,
                                            step: 1,
                                        },
                                    }}
                                    className='mr-4 w-full'
                                    disabled={!includeImage}
                                    onChange={handleQrImageSize}
                                />
                            </div>
                        </div>
                    )}
                </FormGroup>
            </div>
        </div>
    );
};

export default Logo;
