import React, { useState } from 'react';
import { useQr } from '../../../../../context/QrContext';
import { Checkbox, FormControlLabel, Button, TextField, FormGroup, FormControl, FormLabel } from '@mui/material';
import { ColorPicker } from '../colorPicker';
import Slider from '@mui/material/Slider';

const Logo = () => {
    const { setQrImage, setQrImageSize, qrImageInfo } = useQr();
    const [includeImage, setIncludeImage] = useState(false);

    const handleImageChange = (event) => {
        if (event.target.files.length > 0) {
            const imageUrl = URL.createObjectURL(event.target.files[0]);
            setQrImage(imageUrl);
        }
    };

    const handleQrImageSize = (event) => {
        const size = parseFloat(event.target.value);
        if (!isNaN(size) && size >= 0.1 && size <= 1) {
            const roundedSize = Math.round(size * 10) / 10; 
            setQrImageSize(roundedSize);
        }
    };


    const handleIncludeImageChange = (event) => {
        const isChecked = event.target.checked;
        setIncludeImage(isChecked);
        if (!isChecked) {
            setQrImageSize(0.5)
            setQrImage(null);
        }
    };

    return (
        <div>
            <input
                accept="image/*"
                style={{ display: 'none' }}
                id="raised-button-file"
                type="file"
                onChange={handleImageChange}
                disabled={!includeImage}
            />

            <div className=' space-x-2'>
                <FormControlLabel
                    control={
                        <Checkbox
                            checked={includeImage}
                            onChange={handleIncludeImageChange}
                            color="primary"
                        />
                    }
                    label="Include Image:"
                />
                <label htmlFor="raised-button-file">
                    <Button variant="contained" component="span" className='mt-2 large fullWidth' disabled={!includeImage}>
                        Upload image
                    </Button>
                </label>
                <FormGroup className={`my-5 ${includeImage ? 'h-[200px]' : ''}`}>
                    {includeImage && (
                        <div>
                            <FormLabel component="legend">Settings</FormLabel>
                            <div className='flex justify-between items-center my-4 gap-5'>
                                <TextField
                                    id="outlined-number"
                                    label="Image size"
                                    type="number"
                                    value={qrImageInfo.qrImageSize}
                                    InputProps={{
                                        inputProps: {
                                            min: 0.1,
                                            max: 1,
                                            step: 0.1,
                                        },
                                    }}
                                    className='mr-4 w-1/2'
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
