import React, { useState, useEffect, useRef } from 'react';
import { SocialButtonM } from './socialButtons';
import logot from "../../../../assets/imgs/Captura.png";
import mesadoko from "../../../../assets/imgs/mesadoko.png";
import google from "../../../../assets/imgs/google.png";

import { SocialButton, SocialButtonS } from './socialButton';
/*
 * @Author : Cristian Escobar, @date 2024-09-03 20:13:14
 * @description: Componente que renderiza una vista de enlace web en la preview del movil. 
 *                Muestra una imagen, título y descripción según los valores del formulario, 
 *                y un conjunto de botones sociales con íconos que cambian en función del color de fondo. 
 *                El componente también se ajusta según el `contentName`, mostrando diferentes botones sociales.
 * @Props:
 *   - FormValues: Objeto que contiene valores de configuración como título, descripción, colores y opciones seleccionadas.
 *   - contentName: Cadena que determina el tipo de contenido y ajusta la visualización de botones sociales.
 * @return: Retorna un componente que renderiza un contenedor con imagen, título, descripción y botones sociales,
 *          y ajusta la visibilidad de estos elementos en función de los cambios en `FormValues` y `contentName`.
 */

/*
 * @UpdatedBy : Nicolas Barrios,   @date 2024-07-29 16:58:46
 * @description : se cambio el nombre de la prop de la funcion export 
 */
export const WebLinkPhoneMusic = ({ FormValues, contentName }) => {
  const [showImage, setShowImage] = useState(true);
  const [showDesc, setShowDesc] = useState(true);
  const initialValues = useRef(FormValues);
  const [isDark, setIsDark] = useState('#000000');
  console.log(contentName)
  console.log(FormValues.backgroundColor)


  useEffect(() => {
    // Function to compare if current values differ from initial values
    const hasChanged = (current, initial) => {
      const keysToCompare = ['title', 'description', 'backgroundColor', 'boxColor', 'titleColor', 'descriptionColor', 'selectedOptions'];
      return keysToCompare.some(key => {
        if (key === 'selectedOptions') {
          return current[key].length !== initial[key].length ||
            current[key].some((opt, index) => opt.value !== initial[key][index].value);
        }
        return current[key] !== initial[key];
      });
    };

    if(hasChanged(FormValues, initialValues.current)){
      setShowImage(false);
      setShowDesc(FormValues.description !== initialValues.current.description);
    }

    // Check if any of the values (excluding image) have changed from initial values
    if (hasChanged(FormValues, initialValues.current)) {
      console.log('Values have changed, setting showImage to false');
      setShowImage(false);
    }

    // If a new image is provided, show the image
    if (FormValues.image && FormValues.image !== logot) {
      console.log('New image provided, setting showImage to true');
      setShowImage(true);
    }

    // Update initialValues ref
    initialValues.current = FormValues;
  }, [FormValues]);

  useEffect(() => {
    // Reset showImage when contentName changes
    setShowImage(true);
    // Reset description visibility when contentName changes
    setShowDesc(true);
  }, [contentName]);


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
  
    },
    {
      value: 'youtube',
      icon: <img style={{ width: '50px', height: '50px' }} src='https://img.icons8.com/color/48/youtube-music.png' />,
      iconw: <img style={{ width: '50px', height: '50px' }} src='https://img.icons8.com/color/48/youtube-music.png' />
    },
    {
      value: 'soundcloud',
      textTop: "GET IT ON",
      textBottom: "Google Play",
      icon: <img style={{ width: '50px', height: '50px' }} src='https://img.icons8.com/?size=100&id=13669&format=png&color=000000' />,
      iconw: <img style={{ width: '50px', height: '50px' }} src='https://img.icons8.com/?size=100&id=13669&format=png&color=000000' />
    },
    {
      value: 'deezer',
      icon: <img style={{ width: '50px', height: '50px' }} src='https://img.icons8.com/external-tal-revivo-bold-tal-revivo/48/external-deezer-a-french-online-music-streaming-service-logo-bold-tal-revivo.png' />,
      iconw: <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="50" height="50" viewBox="0,0,256,256">
      <g fill="#ffffff" fill-rule="nonzero" stroke="none" stroke-width="1" stroke-linecap="butt" stroke-linejoin="miter" stroke-miterlimit="10" stroke-dasharray="" stroke-dashoffset="0" font-family="none" font-weight="none" font-size="none" text-anchor="none"><g transform="scale(5.12,5.12)"><path d="M39,14v2h8v-2zM21,17v2h8v-2zM39,17v2h8v-2zM21,20v2h8v-2zM39,20v2h8v-2zM3,23v2h8v-2zM21,23v2h8v-2zM30,23v2h8v-2zM39,23v2h8v-2zM3,26v2h8v-2zM21,26v2h8v-2zM30,26v2h8v-2zM39,26v2h8v-2zM3,29v2h8v-2zM12,29v2h8v-2zM21,29v2h8v-2zM30,29v2h8v-2zM39,29v2h8v-2zM3,32v2h8v-2zM12,32v2h8v-2zM21,32v2h8v-2zM30,32v2h8v-2zM39,32v2h8v-2zM3,35v2h8v-2zM12,35v2h8v-2zM21,35v2h8v-2zM30,35v2h8v-2zM39,35v2h8v-2z"></path></g></g>
      </svg>,
      textTop: "Download on the",
      textBottom: "App Store",
    },
    {
      value: 'spotify',
      icon: <img style={{ width: '50px', height: '50px' }} src='https://img.icons8.com/?size=100&id=G9XXzb9XaEKX&format=png&color=000000' />,
      textTop: "Download on the",
      textBottom: "App Store",
    },
    {
      value: 'amazon',
      icon: <img style={{ width: '50px', height: '50px' }} src='https://img.icons8.com/?size=100&id=lxwUaALAeQmr&format=png&color=000000' />,
      iconw: <img style={{ width: '50px', height: '50px' }} src='https://img.icons8.com/?size=100&id=lxwUaALAeQmr&format=png&color=000000' />,
      textTop: "Download on the",
      textBottom: "App Store",
    },
    {
      value: 'apple',
      icon: <img style={{ width: '50px', height: '50px' }} src='https://img.icons8.com/?size=100&id=Bri4HBrgCsPa&format=png&color=000000' />,
      iconw: <img style={{ width: '50px', height: '50px' }} src='https://img.icons8.com/?size=100&id=Bri4HBrgCsPa&format=png&color=000000' />,
      textTop: "Download on the",
      textBottom: "App Store",
    }
  ];

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
    const backgroundColor = FormValues?.backgroundColor;
    if (backgroundColor) {
      if (backgroundColor.startsWith('linear-gradient')) {
        // Extrae el color en el 30% desde abajo hacia arriba
        const colorAt30FromBottom = extractColorFromGradient(backgroundColor, 30);
        // Actualiza el estado basado en si el color es oscuro
        setIsDark(isDarkColor(colorAt30FromBottom) ? '#ffffff' : '#000000');
      } else {
        // Si es un color sólido, usa la misma función para verificar si es oscuro
        setIsDark(isDarkColor(backgroundColor) ? '#ffffff' : '#000000');
      }
    }
  }, [FormValues.backgroundColor]);

  const data = Array.isArray(FormValues.selectedOptions)
    ? FormValues.selectedOptions.map(option => {
      const originalOption = options.find(opt => opt.value === option.value);
      return {
        name: option.value,
        icon: originalOption ? originalOption.icon : null,
        iconw: originalOption ? originalOption.iconw : null,
        url: option.url,
        textTop: originalOption ? originalOption.textTop : '', // Aquí está la corrección
        textBottom: originalOption ? originalOption.textBottom : '',
      };
    })
    : [];

  console.log(FormValues)

  return (
    <div className='relative flex flex-col w-[100%] h-[100%] items-center rounded-t-[52px] rounded-b-[50px]  p-4 overflow-y-auto custom-scrollbarphone' style={{ background:FormValues.backgroundColor, minHeight: '670px', maxHeight: '670px', minWidth: '350px', maxWidth: '350px'}}>
        <div className='flex flex-col items-center mt-28 w-[97%] bg-white rounded-2xl' style={{ background:FormValues.boxColor }}>
            {showImage && (
                <div className='relative bg-white rounded-2xl -mt-14 border-4 shadow-lg' style={{ borderColor: FormValues.borderImg }}>
                    <img className='w-36  rounded-2xl' src={FormValues.image ? `data:image/png;base64,${FormValues.image}` : (contentName === 'music' ? logot : (contentName === 'social media' ? google : mesadoko))} alt="" />
                </div>
            )}
            <div className="mt-[1%] mb-2 w-[90%] text-center">
                <div className='break-words overflow-y-auto' style={{ color:FormValues.colorTitle, fontSize: '30px' }}>
                    {FormValues.title}
                </div>
                {showDesc && (
                <div
                    className="break-words overflow-y-auto max-h-[200px] mt-5 custom-scrollbar text-lg leading-relaxed relative"
                    style={{ color:FormValues.descriptionColor }}
                >{FormValues.description}
                </div>
                )}
            </div>
        </div>

        {contentName === 'app store' && <SocialButton data={data} botonColor={isDark}/>}
        {contentName === 'social media' && <SocialButtonS data={data} botonColor={isDark}/>}
        {contentName === 'music' && <SocialButtonM data={data} botonColor={isDark}/>}

    </div>
);
}

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

  .custom-scrollbarphone::-webkit-scrollbar {
  width: 0px;
  }

  /* Para Firefox */
  .custom-scrollbarphone {
  scrollbar-width: none; /* Oculta la barra de desplazamiento */
}
`;

// Insertar los estilos globales
const styleSheet = document.createElement("style");
styleSheet.type = "text/css";
styleSheet.innerText = globalStyles;
document.head.appendChild(styleSheet);
