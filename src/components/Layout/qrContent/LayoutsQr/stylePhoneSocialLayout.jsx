/*
 * @Author : Cristian Escobar, @date 2024-07-24 09:45:14
 * @description : Componente para el diseño de la tienda social. Muestra el título, descripción, logo, y botones sociales.
 * @Props :
 *   - socialFormValues: Objeto que contiene los valores para personalizar el diseño de la tienda social.
 *     - boxColor: Color del fondo de la caja que contiene el contenido.
 *     - title: Título de la tienda social.
 *     - titleColor: Color del título.
 *     - descriptionColor: Color del texto de la descripción.
 *     - backgroundColor: Color de fondo de la página.
 *     - description: Descripción de la tienda social.
 *     - image: Logo de la tienda social en formato base64.
 *     - borderColor: Color del borde alrededor del logo.
 *     - selectedOptions: Array de opciones seleccionadas para los botones sociales, cada una con:
 *       - value: Identificador de la opción (e.g., 'facebook', 'twitter').
 *       - url: Enlace asociado con la opción.
 * @return : Retorna un componente que representa el diseño de una tienda social con elementos personalizables y botones sociales.
 */

import react from 'react';
import logot from "../../../../assets/imgs/google.png"
import { SocialButtonM } from '../socialMedia/socialButtons';


export const SocialLayout = ({socialFormValues}) => {
    console.log(socialFormValues)
    const data = Array.isArray(socialFormValues.selectedOptions) ? socialFormValues.selectedOptions.map(option => ({
        name: option.value.charAt(0).toUpperCase() + option.value.slice(1),
        url: option.url // Include URL
    })) : [];
    return(
        <div className='flex flex-col min-h-screen w-full items-center justify-center' style={{ background: socialFormValues.backgroundColor }}>
            
            <div className='flex flex-col items-center mt-10 md:mt-28 bg-white rounded-2xl w-[90%] sm:w-[400px] md:w-[600px] min-h-[400px] max-h-[600px] p-6 shadow-lg' style={{ background: socialFormValues.boxColor }}>
                <div className='relative bg-white rounded-2xl -mt-14 border-4 shadow-md p-1 transition-shadow hover:shadow-xl' style={{borderColor:socialFormValues.borderColor}}>
                    <img className='w-20' src={`data:image/png;base64,${socialFormValues.image}`} alt="" />
                </div>
                <div className="mt-4 mb-2 w-[90%] text-center">
      <h1
        className="text-2xl mb-2 font-bold"
        style={{ color: socialFormValues.titleColor }}
      >
        {socialFormValues.title}
      </h1>
      <div
        className="break-words overflow-y-auto max-h-[200px] custom-scrollbar text-lg leading-relaxed"
        style={{ color: socialFormValues.descriptionColor }}
      >
        {socialFormValues.description}
      </div>
    </div>
            </div>
            <SocialButtonM data={data}/>
        </div>
    )
}