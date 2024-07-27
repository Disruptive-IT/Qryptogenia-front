import React, { useState, useEffect, useRef } from 'react';
import { SocialButton } from './socialButtons';
import logot from "../../../../assets/imgs/Captura.png";

export const WebLinkPhoneMusic = ({ musicFormValues }) => {
  const [showImage, setShowImage] = useState(true);
  const initialValues = useRef(musicFormValues);
  console.log(musicFormValues)
  console.log(musicFormValues.backgroundColor)

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

    // Check if any of the values (excluding image) have changed from initial values
    if (hasChanged(musicFormValues, initialValues.current)) {
      console.log('Values have changed, setting showImage to false');
      setShowImage(false);
    }

    // If a new image is provided, show the image
    if (musicFormValues.image && musicFormValues.image !== logot) {
      console.log('New image provided, setting showImage to true');
      setShowImage(true);
    }
  }, [musicFormValues]);

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

  console.log(musicFormValues.backgroundColor)

  return (
    <div className='relative flex flex-col w-[100%] h-[100%] items-center rounded-t-[52px] rounded-b-[50px]  p-4 overflow-y-auto custom-scrollbarphone' style={{ background: musicFormValues.backgroundColor, minHeight: '670px', maxHeight: '670px', minWidth: '350px', maxWidth: '350px'}}>
        <div className='flex flex-col items-center mt-28 w-[97%] bg-white rounded-2xl' style={{ background: musicFormValues.boxColor }}>
            {showImage && (
                <div className='relative mt-[-5%] top-[-17%] mb-1%  bg-white rounded-2xl border-4 shadow-lg' style={{ borderColor: musicFormValues.borderColor }}>
                    <img className='w-36  rounded-2xl' src={musicFormValues.image ? `data:image/png;base64,${musicFormValues.image}` : logot} alt="" />
                </div>
            )}
            <div className="mt-[1%] mb-2 w-[90%] text-center">
                <div className='break-words overflow-y-auto' style={{ color: musicFormValues.titleColor, fontSize: '20px' }}>
                    {musicFormValues.title}
                </div>
                <div
                    className="break-words overflow-y-auto max-h-[200px] mt-5 custom-scrollbar text-lg leading-relaxed relative"
                    style={{ color: musicFormValues.descriptionColor }}
                >
                    {musicFormValues.description}
                </div>
            </div>
        </div>

        <SocialButton data={data} />
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
