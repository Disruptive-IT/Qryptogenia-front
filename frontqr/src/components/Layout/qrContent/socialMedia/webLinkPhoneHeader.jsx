import React from 'react';

const WebLinkPhoneHeader = ({ logo, headerColor, bodyColor }) => (
    <div className="w-full flex flex-col items-center">
        {/* Encabezado */}
        <div style={{ background: headerColor }} className="w-full h-40 flex justify-center items-center rounded-t-[49px] ">
            {/* Espacio reservado para el logo */}
            <div style={{ marginTop: '7rem' }} className="relative bg-white p-1 rounded-full shadow-lg">
                <img className="w-25 h-20" src={logo} alt="logo" />
            </div>
        </div>
        {/* Espacio debajo del encabezado para ajustar la superposición del logo */}
        <div ></div>
    </div>
);

export default WebLinkPhoneHeader;