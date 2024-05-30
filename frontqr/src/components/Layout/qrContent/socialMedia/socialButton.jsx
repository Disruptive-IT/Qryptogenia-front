import React from 'react';
import { FaApple } from "react-icons/fa";

const SocialButton = ({ data }) => {
    return (
      <div className="grid grid-flow-row gap-5 justify-center w-full mt-10 relative">
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
  
  export default SocialButton;