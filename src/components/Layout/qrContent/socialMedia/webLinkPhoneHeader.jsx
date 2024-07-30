import React from 'react';
import mesadoko from "../../../../assets/imgs/mesadoko.png";

export const WebLinkPhoneHeader = ({ image, logo, headerColor, bordercolor, showImage }) => (
  <div className="w-full flex flex-col items-center">
    <div style={{ background: headerColor }} className="w-full h-32 flex justify-center items-center">
      {showImage && (
        <div style={{ marginTop: '6rem', background: bordercolor }} className="relative p-1 rounded-full shadow-lg">
          <img className="w-25 h-20" src={image ? `data:image/png;base64,${image}` : logo} alt="logo" />
        </div>
      )}
    </div>
  </div>
);


export const WebLinkPhoneHeaderq = ({ image, logo, headerColor, bordercolor}) => (
  <div className="w-full flex flex-col items-center">
    <div style={{ background: headerColor }} className="w-full h-32 flex justify-center items-center">
        <div style={{ marginTop: '6rem', background: bordercolor }} className="relative p-1 rounded-full shadow-lg">
          <img className="w-25 h-20 rounded-full" src={image ? `data:image/png;base64,${image}` : logo} alt="logo" />
        </div>
    </div>
  </div>
)
