import React from 'react';
import mesadoko from "../../../../assets/imgs/mesadoko.png";

const WebLinkPhoneHeader = ({ logo, headerColor, bordercolor }) => (
    <div className="w-full flex flex-col items-center">
        <div style={{ background: headerColor }} className="w-full h-40 flex justify-center items-center rounded-t-[49px]">
            <div style={{ marginTop: '7rem', background: bordercolor }} className="relative p-1 rounded-full shadow-lg">
                <img className="w-25 h-20" src={logo || mesadoko} alt="logo" />
            </div>
        </div>
    </div>
);


export default WebLinkPhoneHeader;