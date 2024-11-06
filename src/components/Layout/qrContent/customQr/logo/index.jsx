import React, { useState } from 'react';
import { useQr } from '../../../../../context/QrContext';
import { Checkbox, FormControlLabel, Button } from '@mui/material';
import { useTranslation } from 'react-i18next';

/**
 * @Author : Jobserd Julián Ocampo,   @date 2024-08-01 14:15:15
 * @description : Sección para establecer el logo del QR
 * @return : Contenido: check para incluir el logo o no en el QR, input para subir el logo
**/

const Logo = () => {
  const { setQrImage, setIncludeImage, qrImageInfo } = useQr();
  const { t } = useTranslation(); // Obtén la función de traducción

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

      <div className='space-x-2'>
        <FormControlLabel
          control={
            <Checkbox
              checked={qrImageInfo.includeImage}
              onChange={handleIncludeImageChange}
              color="primary"
            />
          }
          label={t("Include Image:")} 
          />
        <label htmlFor="raised-button-file">
          <Button
            variant="contained"
            component="span"
            className='mt-2 large fullWidth'
            disabled={!qrImageInfo.includeImage}
          >
            {t("Upload image")} {/* También traducimos este texto */}
          </Button>
        </label>
      </div>
    </div>
  );
};

export default Logo;
