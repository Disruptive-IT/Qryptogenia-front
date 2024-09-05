/*
 * @Author : Cristian Escobar, @date 2024-09-03 16:23:07
 * @description: Componentes para renderizar un encabezado en una vista de teléfono móvil, con un logo opcional y estilos personalizados.
 *                El componente `WebLinkPhoneHeader` muestra un logo con una imagen base64 o un logo predeterminado, y aplica estilos según los colores de fondo y borde proporcionados.
 *                El componente `WebLinkPhoneHeaderq` es una variante de `WebLinkPhoneHeader`, con la diferencia de que el logo siempre se muestra con bordes redondeados.
 * @Props:
 *   - image: (opcional) Cadena que representa la imagen en formato base64. Si se proporciona, se muestra en lugar del logo predeterminado.
 *   - logo: Cadena con la URL del logo predeterminado a usar si no se proporciona una imagen base64.
 *   - headerColor: Color de fondo del contenedor del encabezado.
 *   - bordercolor: Color del borde alrededor del logo.
 *   - showImage: (solo en `WebLinkPhoneHeader`) Booleano que determina si la imagen debe ser visible.
 * @return: 
 *   - `WebLinkPhoneHeader`: Retorna un componente con un contenedor de encabezado que incluye el logo, visible solo si `showImage` es verdadero.
 *   - `WebLinkPhoneHeaderq`: Retorna un componente con un contenedor de encabezado que siempre muestra el logo con bordes redondeados.
 */

import React from 'react';
import mesadoko from "../../../../assets/imgs/mesadoko.png";

export const WebLinkPhoneHeader = ({ image, logo, headerColor, bordercolor, showImage }) => (
  <div className="w-full flex flex-col items-center">
    <div style={{ background: headerColor }} className="w-full h-32 flex justify-center items-center">
      {showImage && (
        <div style={{ marginTop: '6rem', background: bordercolor }} className="relative p-1 rounded-full shadow-lg">
          <img className="w-25 h-20" src={image ? `data:image/png;base64,${image}` : logo} alt="logo" />
        </div>
      )}
    </div>
  </div>
);


export const WebLinkPhoneHeaderq = ({ image, logo, headerColor, bordercolor}) => (
  <div className="w-full flex flex-col items-center">
    <div style={{ background: headerColor }} className="w-full h-32 flex justify-center items-center">
        <div style={{ marginTop: '6rem', background: bordercolor }} className="relative p-1 rounded-full shadow-lg">
          <img className="w-25 h-20 rounded-full" src={image ? `data:image/png;base64,${image}` : logo} alt="logo" />
        </div>
    </div>
  </div>
)
