import React, { useEffect, useState} from 'react';
import { FaApple } from "react-icons/fa";
import { SocialIcon } from 'react-social-icons'
import apple from "../../../../../src/assets/imgs/apple.png"
import applew from "../../../../../src/assets/imgs/applew.png"
import huawei from "../../../../../src/assets/imgs/huawei.png"
import play from "../../../../../src/assets/imgs/play.png"
import galaxy from "../../../../../src/assets/imgs/galaxy.png"
import microsoft from "../../../../../src/assets/imgs/microsoft.png"
import microsoftw from "../../../../../src/assets/imgs/microsoftw.png"

export const SocialButton = ({ data, botonColor}) => {
  const [fontColor, setfontColor] = useState('#ffffff');
  const iconMap = {
    apple: apple,
    applew: applew,
    huawei: huawei,
    play: play,
    galaxy: galaxy,
    microsoft: microsoft,
    microsoftw: microsoftw
    // Puedes agregar más mapeos aquí si es necesario
  };
  console.log(data)

  useEffect(()=>{
    if(botonColor==='#ffffff')
      setfontColor('#000000')
    console.log(fontColor);
  },[botonColor]);
  useEffect(()=>{
    if(botonColor==='#000000')
      setfontColor('#ffffff')
    console.log(fontColor);
  },[botonColor]);
  
    return (
      <div className="flex gap-3 justify-center flex-wrap w-full mt-20 mb-5">
        {data && data.map((social, index) => (
          <a
            key={index}
            href={social.url}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center text-white px-6 py-3 rounded-xl shadow-md hover:bg-gray-800"
            style={{ width: '225px', height: '65px', backgroundColor: botonColor}}
          >
            <img src={botonColor === '#000000' ? iconMap[social.iconw] : iconMap[social.icon]} alt="" style={{width: '25px', height: '25px', marginRight: '10px'}}/>
             
            
            <div className="flex flex-col text-left ml-2"> {/* Añade un margen izquierdo para separar el texto del ícono */}
              <span className="text-xs font-bold uppercase" style={{ fontFamily: 'Helvetica Neue, Helvetica, Arial, sans-serif', color: fontColor }}>
                GET IT ON
              </span>
              <span className="text-base font-bold" style={{ fontFamily: 'Helvetica Neue, Helvetica, Arial, sans-serif', color: fontColor}}>
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
