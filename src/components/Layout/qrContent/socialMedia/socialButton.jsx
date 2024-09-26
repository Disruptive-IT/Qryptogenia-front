/*
 * @Author : Cristian Escobar, @date 2024-09-03 20:13:14
 * @description: Componente que renderiza un conjunto de botones sociales con íconos personalizados y colores adaptables. 
 *               Los botones cambian de color de fuente según el color de fondo del botón.
 * @Props:
 *   - data: Array de objetos que representan las opciones sociales, cada uno con las propiedades:
 *     - url: Enlace asociado al botón social.
 *     - icon: Identificador del icono de la red social.
 *     - iconw: Icono en versión white o alternativa, según el color del botón.
 *     - textBottom: Texto para mostrar en la parte inferior del botón.
 *   - botonColor: Color de fondo para los botones, que también determina el color del texto.
 * @return: Retorna un componente que renderiza botones sociales con íconos y texto.
 */

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
import { bottomNavigationActionClasses } from '@mui/material';
/*
 * @UpdatedBy : Daniel Salazar,   @date 2024-07-25 11:28:17
 * @description : correcion estilos en div padre
 */

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
    if(botonColor==='#ffffff'){
      setfontColor('#000000')
    }
    if(botonColor==='#000000'){
      setfontColor('#ffffff')
    }
  },[botonColor])
  
    return (
      <div className="flex gap-3 justify-center flex-wrap w-full mt-5 mb-5">
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

  const capitalizeFirstLetter = (string) => {
    if (typeof string !== 'string') return '';
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

  export const SocialButtonS = ({ data, botonColor }) => {
    const [fontColor, setfontColor] = useState('#ffffff');
    useEffect(()=>{
      if(botonColor==='#ffffff'){
        setfontColor('#000000')
      }
      if(botonColor==='#000000'){
        setfontColor('#ffffff')
      }
    },[botonColor])
    console.log(data)
    return (
      <div className='flex gap-3 justify-center flex-wrap w-full mt-5 mb-5'>
        {data && data.map((social, index) => (
          <a
            target="_blank"
            rel="noopener noreferrer"
            href={social.url}
            key={index}
            type="button"
            className="relative bg-gray-100 p-2 min-w-32 h-12 rounded-lg flex gap-2 items-center"
            style={{ cursor: "pointer", backgroundColor: botonColor}}
          >
            <SocialIcon network={social.name.toLowerCase()} style={{ width: 30, height: 30 }} />
            {/* Mostrar el nombre del botón solo en pantallas grandes */}
            <span style={{color: fontColor}}>{capitalizeFirstLetter(social.name)}</span>
          </a>
  
        ))}
      </div>
    )
  }
