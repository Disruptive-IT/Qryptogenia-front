/*
 * @Author : Cristian Escobar, @date 2024-07-20 13:07:14
 * @description : Componente para el diseño de la tienda de música. Muestra el título, descripción, logo, y botones sociales personalizados.
 * @Props :
 *   - musicFormValues: Objeto que contiene los valores para personalizar el diseño de la tienda de música.
 *     - boxColor: Color del fondo de la caja que contiene el contenido.
 *     - title: Título de la tienda de música.
 *     - titleColor: Color del título.
 *     - descriptionColor: Color del texto de la descripción.
 *     - backgroundColor: Color de fondo de la página.
 *     - description: Descripción de la tienda de música.
 *     - image: Logo de la tienda de música.
 *     - borderColor: Color del borde alrededor del logo.
 *     - selectedOptions: Array de opciones seleccionadas para los botones sociales, cada una con:
 *       - value: Identificador de la opción (e.g., 'youtube', 'spotify').
 *       - url: Enlace asociado con la opción.
 * @return : Retorna un componente que representa el diseño de una tienda de música con elementos personalizables y botones sociales.
 */

import React from 'react';
import { SocialButtonM } from '../socialMedia/socialButtons';
import logot from "../../../../assets/imgs/Captura.png";
import apple from "../../../../assets/imgs/applew.png";

export const MusicLayout = ({ musicFormValues }) => {
console.log(musicFormValues)
  const options = [
    {
      value: 'youtube',
      icon: <img style={{ width: '50px', height: '50px' }} src='https://img.icons8.com/color/48/youtube-music.png' />
    },
    {
      value: 'soundcloud',
      textTop: "GET IT ON",
      textBottom: "Google Play",
      icon: <img style={{ width: '50px', height: '50px' }} src='https://img.icons8.com/?size=100&id=13669&format=png&color=000000' />
    },
    {
      value: 'deezer',
      icon: <img style={{ width: '50px', height: '50px' }} src='https://img.icons8.com/external-tal-revivo-bold-tal-revivo/48/external-deezer-a-french-online-music-streaming-service-logo-bold-tal-revivo.png' />,
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
      textTop: "Download on the",
      textBottom: "App Store",
    },
    {
      value: 'apple',
      icon: <img style={{ width: '50px', height: '50px' }} src='https://img.icons8.com/?size=100&id=Bri4HBrgCsPa&format=png&color=000000' />,
      textTop: "Download on the",
      textBottom: "App Store",
    }
  ];

  const data = Array.isArray(musicFormValues.selectedOptions)
    ? musicFormValues.selectedOptions.map(option => {
      const originalOption = options.find(opt => opt.value === option.value);
      return {
        name: option.value,
        icon: originalOption ? originalOption.icon : null,
        url: option.url,
        textTop: originalOption ? originalOption.textTop : '', // Aquí está la corrección
        textBottom: originalOption ? originalOption.textBottom : '',
      };
    })
    : [];

  return (
    <div
  className="flex flex-col min-h-screen w-full items-center justify-center"
  style={{ background: musicFormValues.backgroundColor }}
>
  <div
    className="flex flex-col items-center mt-10 md:mt-28 bg-white rounded-2xl w-[90%] sm:w-[400px] md:w-[600px] min-h-[400px] max-h-[600px] p-6 shadow-lg"
    style={{ background: musicFormValues.boxColor }}
  >
    <div
      className="relative bg-white rounded-2xl -mt-14 border-4 shadow-md p-1 transition-shadow hover:shadow-xl"
      style={{ borderColor: musicFormValues.borderColor }}
    >
      <img
        className="w-36 rounded-2xl"
        src={musicFormValues.image || logot}
        alt=""
      />
    </div>
    <div className="mt-4 mb-2 w-[90%] text-center">
      <h1
        className="text-2xl mb-2 font-bold"
        style={{ color: musicFormValues.titleColor }}
      >
        {musicFormValues.title}
      </h1>
      <div
        className="break-words overflow-y-auto max-h-[200px] custom-scrollbar text-lg leading-relaxed"
        style={{ color: musicFormValues.descriptionColor }}
      >
        {musicFormValues.description}
      </div>
    </div>
  </div>
  
  <SocialButtonM data={data} />
</div>
  );
}

// Añade estos estilos al encabezado de tu aplicación
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

export default MusicLayout;
