
import { Button } from '@mui/material';
import React from 'react';
import { useQr } from '../../../../../context/QrContext';
import ScrollableLogoQrs from './scrollableLogoQrs';

const Logo = () => {
    const { setLogoImage, setLogoPosition } = useQr();

    const handleImageChange = (event) => {
        setLogoImage(URL.createObjectURL(event.target.files[0]));
    };

    const handleTabSelect = (tabIndex) => {
        setLogoPosition(tabIndex);
    };

    return (
        <>
            <ScrollableLogoQrs onTabSelect={handleTabSelect} />
            <input
                accept="image/*"
                style={{ display: 'none' }}
                id="raised-button-file"
                type="file"
                onChange={handleImageChange}
            />
            <label htmlFor="raised-button-file">
                <Button variant="contained" component="span" className='mt-2' fullWidth>
                    Subir imagen
                </Button>
            </label>
        </>
    );
};

export default Logo;