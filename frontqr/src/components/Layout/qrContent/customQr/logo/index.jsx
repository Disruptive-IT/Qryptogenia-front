import React, { useState } from 'react';
import { useQr } from '../../../../../context/QrContext';
import { Checkbox, FormControlLabel, Button, TextField, FormGroup, FormControl, FormLabel } from '@mui/material';
import { ColorPicker } from '../frame/colorPicker';
import Slider from '@mui/material/Slider';

const Logo = () => {
    const { setQrImage, qrBgColor, setQrImageCentered, setQrImagePositionX, setQrImagePositionY, setQrColor, setQrBgColor, setQrIncludeMargin } = useQr();
    const [includeImage, setIncludeImage] = useState(false);
    const [isCenteredImage, setIsCenteredImage] = useState(false);

    const handleImageChange = (event) => {
        if (event.target.files.length > 0) {
            const imageUrl = URL.createObjectURL(event.target.files[0]);
            setQrImage(imageUrl);
        }
    };

    const handleColorQr = (color) => {
        setQrColor(color);
    };

    const handleColorBgQr = (color) => {
        setQrBgColor(color);
    };

    const handleIncludeImageChange = (event) => {
        const isChecked = event.target.checked;
        setIncludeImage(isChecked);
        setIsCenteredImage(isChecked);
        if (!isChecked) {
            setQrImage(null);
        }
    };

    const handleMarginImageChange = (event) => {
        const isChecked = event.target.checked;
        setQrIncludeMargin(isChecked)
    };

    const handlePositionXChange = (event, newValue) => {
        setQrImagePositionX(newValue);
    };

    const handlePositionYChange = (event, newValue) => {
        setQrImagePositionY(newValue);
    };


    const handleCenteredImageChange = (event) => {
        const isChecked = event.target.checked;
        setIsCenteredImage(isChecked);
        setQrImageCentered(isChecked);
        if (!isChecked) {
            document.getElementById('posicionamientoX').disabled = false;
            document.getElementById('posicionamientoY').disabled = false;
        } else {
            document.getElementById('posicionamientoX').disabled = true;
            document.getElementById('posicionamientoY').disabled = true;
        }
    };

    return (
        <div className='w-screen lg:w-90'>
            <div className='flex gap-5'>
                <div className='flex gap-3 items-center'>
                    <span>Color fondo:</span>
                    <ColorPicker setColor={handleColorBgQr} />
                </div>
                <div className='flex items-center gap-4'>
                    <span>Color qr:</span>
                    <ColorPicker setColor={handleColorQr} />
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
                            onChange={handleMarginImageChange}
                            color="primary"
                            disabled={!qrBgColor} 
                        />
                    }
                    label="Incluir Margen"
                />
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
                                />
                                <FormControl component="fieldset" className='w-[200px]'>
                                    <FormControlLabel
                                        control={
                                            <Checkbox
                                                color="primary"
                                                onChange={handleCenteredImageChange}
                                            />
                                        }
                                        label="Centrar"
                                    />
                                </FormControl>
                            </div>
                            <div className='w-ful flex gap-3 items-center justify-between'>
                                <div>
                                    <label htmlFor="posicionamientoX" className="pr-2">Posicionamiento X:</label>
                                    <Slider
                                        aria-label="PosicionamientoX"
                                        defaultValue={0}
                                        color="secondary"
                                        disabled={isCenteredImage}
                                        min={0}
                                        max={150}
                                        step={1}
                                        onChange={(event, newValue) => handlePositionXChange(event, Math.round(newValue))}
                                    />
                                </div>

                                <div>
                                    <label htmlFor="posicionamientoY" className="pl-2">Posicionamiento Y:</label>
                                    <Slider
                                        aria-label="PosicionamientoY"
                                        defaultValue={0}
                                        color="secondary"
                                        disabled={isCenteredImage}
                                        min={0}
                                        max={150}
                                        step={1}
                                        onChange={(event, newValue) => handlePositionYChange(event, Math.round(newValue))}
                                    />
                                </div>
                            </div>
                        </div>
                    )}
                </FormGroup>
            </div>
        </div>
    );
};

export default Logo;
