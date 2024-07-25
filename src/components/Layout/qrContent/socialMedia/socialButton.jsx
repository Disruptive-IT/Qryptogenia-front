import React from 'react';
import { FaApple } from "react-icons/fa";
import { SocialIcon } from 'react-social-icons'

/*
 * @UpdatedBy : Daniel Salazar,   @date 2024-07-25 11:28:17
 * @description : correcion estilos en div padre
 */

export const SocialButton = ({ data }) => {
    return (
      <div className="grid grid-flow-row gap-7 justify-center w-full mt-10 pb-7 relative">
        {data && data.map((social, index) => (
          <a
            key={index}
            href={social.url}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center bg-black text-white px-6 py-3 rounded-xl shadow-md hover:bg-gray-800"
            style={{ width: '225px', height: '65px' }}
          >
            <div style={{ fontSize: '1.7em' }}>
            {social.icon} 
            </div>
            <div className="flex flex-col text-left ml-2"> {/* Añade un margen izquierdo para separar el texto del ícono */}
              <span className="text-xs font-bold uppercase" style={{ fontFamily: 'Helvetica Neue, Helvetica, Arial, sans-serif' }}>
                {social.textTop}
              </span>
              <span className="text-lg font-bold" style={{ fontFamily: 'Helvetica Neue, Helvetica, Arial, sans-serif' }}>
                {social.textBottom}
              </span>
            </div>
          </a>
        ))}
      </div>
    );
  };
  

  export const SocialButtonM = ({ data }) => {
    console.log(data)
    return (
      <div className='flex gap-3 justify-center flex-wrap w-full mt-20 mb-5'>
        {data && data.map((social, index) => (
          <a
            target="_blank"
            rel="noopener noreferrer"
            href={social.url}
            key={index}
            type="button"
            className="relative bg-gray-100 p-2 min-w-32 h-12 rounded-lg flex gap-2 items-center"
            style={{ cursor: "pointer" }}
          >
            <SocialIcon network={social.name.toLowerCase()} style={{ width: 30, height: 30 }} />
            {/* Mostrar el nombre del botón solo en pantallas grandes */}
          </a>
  
        ))}
      </div>
    )
  }
