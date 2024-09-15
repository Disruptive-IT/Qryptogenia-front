
import React, { useEffect } from 'react';
/*
 * @Author : Cristian Escobar, @date 2024-09-03 20:13:14
 * @description: Función utilitaria que capitaliza la primera letra de una cadena de texto.
 * @param string: Texto a capitalizar.
 * @return: Texto con la primera letra en mayúscula.
 */

const capitalizeFirstLetter = (string) => {
  return string.charAt(0).toUpperCase() + string.slice(1);
};

/*
 * @Author : Cristian Escobar, @date 2024-09-03 20:13:14
 * @description: Componente que renderiza un conjunto de botones sociales. Cada botón contiene un ícono y, en pantallas grandes,
 *               muestra el nombre de la red social. Este componente es flexible y se ajusta bien en dispositivos móviles y de escritorio.
 * @Props:
 *   - data: Array de objetos que representan las opciones sociales, cada uno con las propiedades:
 *     - url: Enlace asociado al botón social.
 *     - icon: Elemento de React que representa el ícono de la red social.
 *     - name: Nombre de la red social (e.g., 'facebook', 'twitter').
 * @return: Retorna un componente que renderiza botones sociales con íconos y, opcionalmente, texto.
 */
export const SocialButton = ({ data }) => {
  return (
    <div className='flex gap-3 justify-center flex-wrap w-full mt-8 mb-5 relative'>
      {data && data.map((social, index) => (
        <a
          key={index}
          href={social.url}
          target="_blank"
          rel="noopener noreferrer"
          className="p-2 min-w-16 h-16 rounded-lg flex items-center justify-center hover:bg-gray-300"
          style={{ cursor: "pointer", minWidth: '4rem', verticalAlign: 'middle' }}
        >
          {social.icon}
          <span className="hidden lg:inline ml-2">{capitalizeFirstLetter(social.name)}</span>
        </a>
      ))}
    </div>
  );
};

/*
 * @Author : Cristian Escobar, @date 2024-09-03 20:13:14
 * @description: Componente que renderiza un conjunto de botones sociales. Cada botón puede cambiar el ícono visualizado dependiendo del color de fondo.
 *               Este diseño es ideal para situaciones en las que los íconos necesitan contrastar con el color del botón.
 * @Props:
 *   - data: Array de objetos que representan las opciones sociales, cada uno con las propiedades:
 *     - url: Enlace asociado al botón social.
 *     - icon: Elemento de React que representa el ícono de la red social en fondo claro.
 *     - iconw: Elemento de React que representa el ícono de la red social en fondo oscuro.
 *   - botonColor: Color de fondo del botón, que determina qué ícono se muestra (claro u oscuro).
 * @return: Retorna un componente que renderiza botones sociales con íconos que cambian según el color de fondo.
 */

export const SocialButtonM = ({ data, botonColor }) => {
  return (
    <div className='flex gap-3 justify-center mt-8 flex-wrap w-full mb-5'>
      {data && data.map((social, index) => (
        <a target="_blank" rel="noopener noreferrer" href={social.url} key={index} type="button" className="relative p-2 min-w-16 h-16 rounded-lg flex gap-2 items-center" style={{ cursor: "pointer", verticalAlign: 'middle'}}>
            {botonColor === '#000000' ? social.icon : social.iconw}
        </a>
      ))}
    </div>
  );
};