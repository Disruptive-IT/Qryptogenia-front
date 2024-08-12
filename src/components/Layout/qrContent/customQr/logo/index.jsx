import React, { useState } from 'react';
import { useQr } from '../../../../../context/QrContext';
import { Checkbox, FormControlLabel, Button, TextField, FormGroup, FormControl, FormLabel } from '@mui/material';
import Slider from '@mui/material/Slider';

/**
 * @Author : Jobserd Julián Ocampo,   @date 2024-08-01 14:15:15
 * @description : Seccion para establecer el logo del qr
 * @return : Contenido: check para incluir el logo o no en el qr, input para subir el logo
**/

const Logo = () => {
    const { setQrImage, setIncludeImage, qrImageInfo } = useQr();

    const handleImageChange = (event) => {
        if (event.target.files.length > 0) {
            const imageUrl = URL.createObjectURL(event.target.files[0]);
            setQrImage(imageUrl);
        }
    };

    const handleIncludeImageChange = (event) => {
        const isChecked = event.target.checked;
        setIncludeImage(isChecked);
    };

    return (
        <div>
            <input
                accept="image/*"
                style={{ display: 'none' }}
                id="raised-button-file"
                type="file"
                onChange={handleImageChange}
                disabled={!qrImageInfo.includeImage}
            />

            <div className=' space-x-2'>
                <FormControlLabel
                    control={
                        <Checkbox
                            checked={qrImageInfo.includeImage}
                            onChange={handleIncludeImageChange}
                            color="primary"
                        />
                    }
                    label="Include Image:"
                />
                <label htmlFor="raised-button-file">
                    <Button variant="contained" component="span" className='mt-2 large fullWidth' disabled={!qrImageInfo.includeImage}>
                        Upload image
                    </Button>
                </label>
            </div>
        </div>
    );
};

export default Logo;