import React from 'react';
import WebLinkPhoneHeader from './webLinkPhoneHeader';
import {SocialButton} from '../socialMedia/socialButton'
import appstore from "../../../../assets/imgs/appstore.png";
import googleplay from "../../../../assets/imgs/googleplay.png";
import mesadoko from "../../../../assets/imgs/mesadoko.png";
import logoforms from "../../../../assets/imgs/logoForms.png";
import zenu from "../../../../assets/imgs/zenulogo.png";
import iconapple from "../../../../../src/assets/imgs/iconapple.png"
import icongoogleplay from "../../../../assets/imgs/icongoogleplay.png";
import { FaApple, FaGooglePlay  } from "react-icons/fa";

const options = [
    { 
      textTop: "", 
      textBottom: "Galaxy Store",
      value: 'Samsung Galaxy Store',
      icon: <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="35" height="35" style={{ marginTop: '1px' }} viewBox="0 0 48 48">
      <linearGradient id="gTN3BY4aRov8yoX_HP084a_GnODgj39wOZm_gr1" x1="9.422" x2="36.928" y1="8.565" y2="37.688" gradientUnits="userSpaceOnUse"><stop offset="0" stopColor="#c72cce"></stop><stop offset="1" stopColor="#fe5b5b"></stop></linearGradient><path fill="url(#gTN3BY4aRov8yoX_HP084a_GnODgj39wOZm_gr1)" d="M29.393,43H18.607C11.092,43,5,36.908,5,29.393V18.607C5,11.092,11.092,5,18.607,5h10.787 C36.908,5,43,11.092,43,18.607v10.787C43,36.908,36.908,43,29.393,43z"></path><path fill="#222220" d="M28.303,36h-8.605c-3.169,0-5.791-2.464-5.989-5.626l-0.707-11.312 C12.966,18.487,13.423,18,14,18h4c0-3.309,2.691-6,6-6s6,2.691,6,6h4c0.577,0,1.034,0.487,0.998,1.062l-0.707,11.312 C34.093,33.537,31.471,36,28.303,36z M15.064,20l0.641,10.249C15.837,32.353,17.591,34,19.697,34h8.605 c2.106,0,3.86-1.647,3.992-3.751L32.936,20H28v-2v2H15.064z M22,18h4c0-1.103-0.897-2-2-2S22,16.897,22,18z" opacity=".05"></path><path fill="#030000" d="M28.302,35.5h-8.605c-2.905,0-5.308-2.258-5.49-5.157l-0.674-10.78 c-0.036-0.576,0.421-1.062,0.998-1.062H18.5v-0.254c0-2.871,2.093-5.44,4.95-5.719c3.278-0.32,6.05,2.259,6.05,5.473v0.5h3.968 c0.577,0,1.034,0.487,0.998,1.062l-0.674,10.78C33.611,33.242,31.207,35.5,28.302,35.5z M14.532,19.5l0.674,10.78 c0.148,2.366,2.121,4.22,4.491,4.22h8.605c2.37,0,4.343-1.854,4.491-4.22l0.674-10.78H28.5V18c0-2.481-2.019-4.5-4.5-4.5 s-4.5,2.019-4.5,4.5v1.5H14.532z M27.5,19.5h-7V18c0-1.93,1.57-3.5,3.5-3.5s3.5,1.57,3.5,3.5V19.5z M21.5,18.5h5V18 c0-1.379-1.121-2.5-2.5-2.5s-2.5,1.121-2.5,2.5V18.5z" opacity=".07"></path><path fill="#fff" d="M29,19l0-0.777c0-2.61-1.903-4.945-4.5-5.199C21.52,12.733,19,15.078,19,18v1h-3.936 c-0.577,0-1.034,0.487-0.998,1.062l0.641,10.249c0.165,2.635,2.35,4.688,4.99,4.688h8.605c2.64,0,4.826-2.053,4.99-4.688 l0.641-10.249C33.97,19.487,33.512,19,32.936,19H29z M21,18c0-1.654,1.346-3,3-3s3,1.346,3,3v1h-6V18z"></path>
  </svg>
    },
    {
      
      value: 'Google Play Store',
      textTop: "GET IT ON",
      textBottom: "Google Play",

      icon: <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="25" height="25" style={{ marginRight: '5px' }} viewBox="0 0 48 48">
            <linearGradient id="jFdG-76_seIEvf-hbjSsaa_rZwnRdJyYqRi_gr1" x1="1688.489" x2="1685.469" y1="-883.003" y2="-881.443" gradientTransform="matrix(11.64 0 0 22.55 -19615.32 19904.924)" gradientUnits="userSpaceOnUse"><stop offset="0" stopColor="#047ed6"></stop><stop offset="1" stopColor="#50e6ff"></stop></linearGradient><path fill="url(#jFdG-76_seIEvf-hbjSsaa_rZwnRdJyYqRi_gr1)" fillRule="evenodd" d="M7.809,4.608c-0.45,0.483-0.708,1.227-0.708,2.194	v34.384c0,0.967,0.258,1.711,0.725,2.177l0.122,0.103L27.214,24.2v-0.433L7.931,4.505L7.809,4.608z" clipRule="evenodd"></path><linearGradient id="jFdG-76_seIEvf-hbjSsab_rZwnRdJyYqRi_gr2" x1="1645.286" x2="1642.929" y1="-897.055" y2="-897.055" gradientTransform="matrix(9.145 0 0 7.7 -15001.938 6931.316)" gradientUnits="userSpaceOnUse"><stop offset="0" stopColor="#ffda1c"></stop><stop offset="1" stopColor="#feb705"></stop></linearGradient><path fill="url(#jFdG-76_seIEvf-hbjSsab_rZwnRdJyYqRi_gr2)" fillRule="evenodd" d="M33.623,30.647l-6.426-6.428v-0.45l6.428-6.428	l0.139,0.086l7.603,4.321c2.177,1.227,2.177,3.249,0,4.493l-7.603,4.321C33.762,30.561,33.623,30.647,33.623,30.647z" clipRule="evenodd"></path><linearGradient id="jFdG-76_seIEvf-hbjSsac_rZwnRdJyYqRi_gr3" x1="1722.978" x2="1720.622" y1="-889.412" y2="-886.355" gradientTransform="matrix(15.02 0 0 11.5775 -25848.943 10324.73)" gradientUnits="userSpaceOnUse"><stop offset="0" stopColor="#d9414f"></stop><stop offset="1" stopColor="#8c193f"></stop></linearGradient><path fill="url(#jFdG-76_seIEvf-hbjSsac_rZwnRdJyYqRi_gr3)" fillRule="evenodd" d="M33.762,30.561l-6.565-6.567L7.809,43.382	c0.708,0.761,1.9,0.847,3.232,0.103L33.762,30.561" clipRule="evenodd"></path><linearGradient id="jFdG-76_seIEvf-hbjSsad_rZwnRdJyYqRi_gr4" x1="1721.163" x2="1722.215" y1="-891.39" y2="-890.024" gradientTransform="matrix(15.02 0 0 11.5715 -25848.943 10307.886)" gradientUnits="userSpaceOnUse"><stop offset="0" stopColor="#33c481"></stop><stop offset="1" stopColor="#61e3a7"></stop></linearGradient><path fill="url(#jFdG-76_seIEvf-hbjSsad_rZwnRdJyYqRi_gr4)" fillRule="evenodd" d="M33.762,17.429L11.041,4.522	c-1.33-0.761-2.524-0.658-3.232,0.103l19.386,19.369L33.762,17.429z" clipRule="evenodd"></path>
        </svg>
    },
    {
      textTop: "Download on the", 
      textBottom: "App Store",
      value: 'App Store',
      icon: <FaApple />,
      
    }
  ];
  
  const WebLinkPhonePreview = ({ appFormValues }) => {
    const headerColor = appFormValues.boxColor;
    const title = appFormValues.title;
    const textColor = appFormValues.titleColor;
    const descriptionColor = appFormValues.descriptionColor;
    const backgroundcolor = appFormValues.backgroundColor;
    const description = appFormValues.description;
    const logo = appFormValues.image
    const bordercolor = appFormValues.borderColor
  
    const data = Array.isArray(appFormValues.selectedOptions)
      ? appFormValues.selectedOptions.map(option => {
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
        <div style={{ background: backgroundcolor }} className="bg-gradient-to-b ml-1 flex flex-col h-full items-center min-w-[360px] min-h-[670px] max-w-[360px] max-h-[680px] rounded-[55px]">
            {/* Encabezado del teléfono */}
            <WebLinkPhoneHeader logo={logo} title={title} textColor={textColor} headerColor={headerColor} bordercolor={bordercolor} />
            {/* Cuerpo del teléfono */}
            <div style={{ background: backgroundcolor }} className="rounded-b-[52px] p-10 flex flex-col items-center w-full h-full">
               <div className="w-full">
                <p style={{ color: textColor }} className={`font-bold mb-5 mt-3 text-center relative ${title} whitespace-pre-line break-words`}>{title}</p>

               </div>
    
               <div
                        className="break-words overflow-y-auto max-h-[200px] custom-scrollbar text-lg leading-relaxed relative"
                        style={{ color: descriptionColor }}>
                        {description}
                    </div>
                {/* Agrega aquí el contenido del cuerpo del teléfono */}
                <SocialButton data={data} />
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