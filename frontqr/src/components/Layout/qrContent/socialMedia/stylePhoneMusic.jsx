import react from 'react';
import { SocialButton } from './socialButtons';
import logot from "../../../../assets/imgs/Captura.png"


export const WebLinkPhoneMusic = ({musicFormValues}) => {

    const options = [
        { 
          value: 'youtube',
          icon: <img style={{ width: '50px', height: '50px' }} src='https://img.icons8.com/color/48/youtube-music.png'/>
        },
        {
          
          value: 'soundcloud',
          textTop: "GET IT ON",
          textBottom: "Google Play",
          icon: <img style={{ width: '50px', height: '50px' }} src='https://img.icons8.com/?size=100&id=13669&format=png&color=000000'/>
        },
        {
          value: 'deezer',
          icon:<img style={{ width: '50px', height: '50px' }} src='https://img.icons8.com/external-tal-revivo-bold-tal-revivo/48/external-deezer-a-french-online-music-streaming-service-logo-bold-tal-revivo.png'/>,
          textTop: "Download on the", 
          textBottom: "App Store",
        },
        {
            value: 'spotify',
            icon: <img style={{ width: '50px', height: '50px' }} src='https://img.icons8.com/?size=100&id=G9XXzb9XaEKX&format=png&color=000000'/>,
            textTop: "Download on the", 
            textBottom: "App Store",
          },
          {
            value: 'amazon',
            icon: <img style={{ width: '50px', height: '50px' }} src='https://img.icons8.com/?size=100&id=lxwUaALAeQmr&format=png&color=000000'/>,
            textTop: "Download on the", 
            textBottom: "App Store",
          },
          {
            value: 'apple',
            icon: <img style={{ width: '50px', height: '50px' }} src='https://img.icons8.com/?size=100&id=Bri4HBrgCsPa&format=png&color=000000'/>,
            textTop: "Download on the", 
            textBottom: "App Store",
          }
      ];
    console.log(musicFormValues)
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
    return(
      <div className='ml-2 flex flex-col h-full items-center rounded-t-[52px] rounded-b-[50px] w-full p-5' style={{ background: musicFormValues.backgroundColor, minHeight: '670px', maxHeight: '670px', minWidth: '350px', maxWidth: '350px' }}>
      <div className='flex flex-col items-center mt-28 w-[97%] bg-white rounded-2xl' style={{ background: musicFormValues.backgroundColor }}>
  <div className='relative bg-white rounded-2xl -mt-14 border-4 shadow-lg' style={{ borderColor: musicFormValues.borderColor }}>
    <img className='w-36 rounded-2xl' src={musicFormValues.image || logot} alt="" />
  </div>
  <div className="mt-4 mb-2 w-[90%] text-center">
      <h1
        className="text-2xl mb-2 font-bold"
        style={{ color: musicFormValues.titleColor }}
      >
        {musicFormValues.title}
      </h1>
      <div
        className="break-words overflow-y-auto max-h-[200px] custom-scrollbar text-lg leading-relaxed relative"
        style={{ color: musicFormValues.descriptionColor }}
      >
        {musicFormValues.description}
      </div>
    </div>
</div>

      <SocialButton data={data} />
    </div>
    )
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
`;

// Insertar los estilos globales
const styleSheet = document.createElement("style");
styleSheet.type = "text/css";
styleSheet.innerText = globalStyles;
document.head.appendChild(styleSheet);