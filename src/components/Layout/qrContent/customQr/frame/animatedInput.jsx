import React from 'react';
import { motion } from 'framer-motion';

/**
 * @Author : Jobserd Julián Ocampo,   @date 2024-08-08 14:04:10
 * @description : Componente del input tipo texto animado con framer motion
 * @Props : ID del campo de entrada, Texto del placeholder, Longitud máxima del texto,  Función para manejar el cambio del texto, Texto de la etiqueta, Valor del campo de entrada
 * @return : Elemento JSX del componente AnimatedInput
**/


const AnimatedInput = ({ id, maxLength, onChange, label, value }) => {
    return (
        <div className="relative w-full">
            <motion.input
                type="text"
                id={id}
                maxLength={maxLength}
                onChange={onChange}
                value={value} 
                style={{
                    width: '100%',
                    padding: '10px',
                    paddingTop: '15px',
                    borderRadius: '5px',
                    border: '1px solid #ccc', // Borde caja de texto
                    backgroundColor: '#fff', // Fondo color texto
                    outline: 'none',
                    boxSizing: 'border-box'
                }}
            />
            <motion.label
                htmlFor={id}
                style={{
                    position: 'absolute',
                    top: "10px",
                    left: '10px',
                    fontSize: '14px',
                    color: '#999',
                    pointerEvents: 'none',
                    transition: 'all 0s ease'
                }}
                animate={{
                    top: value ? '2px' : '15px', 
                    fontSize: value ? '12px' : '14px', 
                    color: value ? '#000' : '#999' 
                }}
                whileFocus={{ top: '-10px', fontSize: '12px', color: '#000' }}
            >
                {label}
            </motion.label>
        </div>
    );
};

export default AnimatedInput;
