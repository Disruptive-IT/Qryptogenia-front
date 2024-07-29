/*
 * @Author : Jaider cuartas @Fecha 2024-07-15
 * @Descripción : Componente que muestra una vista previa de la página web de una tienda en un diseño de teléfono móvil. Muestra el encabezado con el logo y el título de la store, 
 * junto con opciones para compartir en redes sociales. Controla la visibilidad de la imagen y la descripción dependiendo de los cambios en los valores del formulario de la aplicación.
 * @Props :
 *   - appFormValues (object): Objeto que contiene los valores del formulario de la aplicación, incluyendo colores, texto, imagen y descripción de la tienda.
 * @Retorna : Retorna la vista previa de la página web de la tienda en un diseño de teléfono móvil, mostrando dinámicamente la imagen y la descripción según los datos recibidos.
 */

import React, { useState, useEffect, useRef } from 'react';
import {WebLinkPhoneHeader} from './webLinkPhoneHeader';
import {SocialButton} from '../socialMedia/socialButton'
import { FaApple, FaGooglePlay  } from "react-icons/fa";
import mesadoko from "../../../../assets/imgs/mesadoko.png";

const options = [
    { 
      textTop: "", 
      textBottom: "Galaxy Store",
      value: 'Samsung Galaxy Store',
      icon: 'galaxy',
      iconw: 'galaxy'
    },
    {
      
      value: 'Google Play Store',
      textTop: "GET IT ON",
      textBottom: "Google Play",

      icon: 'play',
      iconw: 'play'
    },
    {
      textTop: "Download on the", 
      textBottom: "App Store",
      value: 'Apple',
      icon: 'apple',
      iconw: 'applew'
      
    },
    {
      textTop: "Download on the", 
      textBottom: "App Store",
      value: 'huawei',
      icon: 'huawei',
      iconw: 'huawei'
      
    },
    {
      textTop: "Download on the", 
      textBottom: "Microsoft Store",
      value: 'microsoft',
      icon: 'microsoft',
      iconw: 'microsoftw'
      
    }
  ];
  const WebLinkPhonePreview = ({ appFormValues }) => {
    console.log(appFormValues)
    const headerColor = appFormValues.boxColor;
  const title = appFormValues.title;
  const textColor = appFormValues.titleColor;
  const descriptionColor = appFormValues.descriptionColor;
  const backgroundcolor = appFormValues.backgroundColor;
  const description = appFormValues.description;
  const bordercolor = appFormValues.borderColor;

  const [showImage, setShowImage] = useState(true);
  const [showDescription, setShowDescription] = useState(true);
  const [firstChange, setFirstChange] = useState(true); // Nuevo estado para controlar el primer cambio
  const [isDark, setIsDark] = useState('#000000');

  const initialValues = useRef(appFormValues);

  const isDarkColor = (color) => {
    // El color puede ser un valor hexadecimal (#rrggbb) o rgb(r, g, b)
    const rgb = color.match(/\d+/g);
    const [r, g, b] = rgb ? rgb.map(Number) : [0, 0, 0];

    // Calcular la luminancia relativa usando la fórmula de luminancia
    const luminance = 0.2126 * (r / 255) + 0.7152 * (g / 255) + 0.0722 * (b / 255);

    // Considera el color oscuro si la luminancia es menor a 0.5
    return luminance < 0.5;
};

const extractColorFromGradient = (gradient, percentageFromBottom) => {
  const colors = gradient.match(/rgb\(\d+, \d+, \d+\)/g);
  const stops = gradient.match(/(\d+(\.\d+)?)%/g);

  const percentage = 100 - percentageFromBottom;

  let color1 = colors[0];
  let color2 = colors[1];
  let stop1 = parseFloat(stops[0]);
  let stop2 = parseFloat(stops[1]);

  if (percentage <= stop1) return color1;
  if (percentage >= stop2) return color2;

  const ratio = (percentage - stop1) / (stop2 - stop1);
  const [r1, g1, b1] = color1.match(/\d+/g).map(Number);
  const [r2, g2, b2] = color2.match(/\d+/g).map(Number);

  const r = Math.round(r1 + (r2 - r1) * ratio);
  const g = Math.round(g1 + (g2 - g1) * ratio);
  const b = Math.round(b1 + (b2 - b1) * ratio);

  return `rgb(${r}, ${g}, ${b})`;
};

useEffect(() => {
  const gradient = appFormValues?.backgroundColor;
  if (gradient && gradient.startsWith('linear-gradient')) {
      // Extrae el color en el 30% desde abajo hacia arriba
      const colorAt30FromBottom = extractColorFromGradient(gradient, 30);
      // Actualiza el estado basado en si el color es oscuro
      setIsDark(isDarkColor(colorAt30FromBottom) ? '#ffffff' : '#000000');
      
  }
  
}, [appFormValues.backgroundColor]);

console.log(isDark);

  useEffect(() => {
    const hasChanged = (current, initial) => {
      return Object.keys(current).some(key => {
        if (Array.isArray(current[key])) {
          return current[key].some((opt, index) => opt.value !== initial[key][index].value);
        }
        return current[key] !== initial[key];
      });
    };

    const titleHasChanged = appFormValues.title !== initialValues.current.title;

    if (firstChange && (hasChanged(appFormValues, initialValues.current) || titleHasChanged)) {
      setShowImage(false);
      setShowDescription(false);
      setFirstChange(false); // Marcar que ya se realizó el primer cambio
    }

    if (appFormValues.image && appFormValues.image !== mesadoko) {
      setShowImage(true);
    }
  }, [appFormValues, firstChange]);

  useEffect(() => {
    if (appFormValues.description) {
      setShowDescription(true);
    }
  }, [appFormValues.description]);

  const data = Array.isArray(appFormValues.selectedOptions)
    ? appFormValues.selectedOptions.map(option => {
        const originalOption = options.find(opt => opt.value === option.value);
        return {
          name: option.value,
          icon: originalOption ? originalOption.icon : null,
          iconw: originalOption ? originalOption.iconw : null,
          url: option.url,
          textTop: originalOption ? originalOption.textTop : '',
          textBottom: originalOption ? originalOption.textBottom : '',
        };
      })
    : [];

  return (
    <div style={{ background: backgroundcolor }} className="bg-gradient-to-b ml-1 flex flex-col h-full items-center min-w-[360px] min-h-[670px] max-w-[360px] max-h-[680px] rounded-[55px]">
      <WebLinkPhoneHeader
        image={appFormValues.image}
        logo={mesadoko}
        showImage={showImage}
        title={title}
        textColor={textColor}
        headerColor={headerColor}
        bordercolor={bordercolor}
      />
      <div style={{ background: backgroundcolor }} className="rounded-b-[52px] p-10 flex flex-col items-center w-full h-full">
        <div className="w-full">
          <p style={{ color: textColor }} className={`font-bold mb-5 mt-3 text-center relative ${title} whitespace-pre-line break-words`}>
            {title}
          </p>
        </div>
        {showDescription && (
          <div
            className="break-all overflow-y-auto max-h-[200px] custom-scrollbar text-lg leading-relaxed relative"
            style={{ color: descriptionColor, whiteSpace: 'pre-wrap' }}
          >
            {description || appFormValues.description}
          </div>
        )}
        <SocialButton data={data} botonColor={isDark} />
      </div>
    </div>
  );
};


  

const globalStyles = `
  .custom-scrollbar {
    scrollbar-width: thin; /* Para Firefox */
    scrollbar-color: rgba(0, 0, 0, 0.5) transparent; /* Para Firefox */
  }

  .custom-scrollbar::-webkit-scrollbar {
    width: 8px; /* Ancho de la barra de desplazamiento para WebKit */
  }

  .custom-scrollbar::-webkit-scrollbar-track {
    background: transparent; /* Fondo del track */
  }

  .custom-scrollbar::-webkit-scrollbar-thumb {
    background-color: rgba(0, 0, 0, 0.5); /* Color del pulgar */
    border-radius: 10px; /* Borde redondeado del pulgar */
    border: 2px solid transparent; /* Espacio alrededor del pulgar */
    background-clip: padding-box; /* Ajuste del fondo */
  }

  .custom-scrollbar::-webkit-scrollbar-thumb:hover {
    background-color: rgba(0, 0, 0, 0.7); /* Color del pulgar al pasar el ratón */
  }
`;

// Insertar los estilos globales
const styleSheet = document.createElement("style");
styleSheet.type = "text/css";
styleSheet.innerText = globalStyles;
document.head.appendChild(styleSheet);

export default WebLinkPhonePreview;