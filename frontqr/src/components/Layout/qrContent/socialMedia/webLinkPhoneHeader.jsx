import React from 'react';

const WebLinkPhoneHeader = ({ logo, headerColor, bodyColor }) => (
    <div className=" w-full flex flex-col items-center mt-20">
        {/* Encabezado */}
        <div style={{ backgroundColor: `headerColor` }} className="w-full h-16 flex justify-center items-center shadow-top">
            {/* Espacio reservado para el logo */}
            <div style={{ marginTop: '1rem' }} className="absolute bg-white p-1 rounded-full shadow-lg">
                <img className="w-25 h-20" src={logo} alt="logo" />
            </div>
        </div>
        {/* Espacio debajo del encabezado para ajustar la superposición del logo */}
        <div  className="w-full mt-3"></div>
    </div>
);

export default WebLinkPhoneHeader;