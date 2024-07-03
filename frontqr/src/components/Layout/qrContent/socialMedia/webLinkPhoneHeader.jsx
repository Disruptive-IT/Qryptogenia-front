import React from 'react';
import mesadoko from "../../../../assets/imgs/mesadoko.png";  // Ajusta la ruta según tu estructura de proyecto

const WebLinkPhoneHeader = ({ logo, headerColor, bordercolor, showImage }) => (
  <div className="w-full flex flex-col items-center">
    <div style={{ background: headerColor }} className="w-full h-32 flex justify-center items-center rounded-t-[49px]">
      {showImage && (
        <div style={{ marginTop: '6rem', background: bordercolor }} className="relative p-1 rounded-full shadow-lg">
          <img className="w-25 h-20" src={logo} alt="logo" />
        </div>
      )}
    </div>
  </div>
);

export default WebLinkPhoneHeader;