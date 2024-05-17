import React from 'react';
import WebLinkPhoneHeader from './webLinkPhoneHeader';
import SocialButton from './socialButton';
import appstore from "../../../../assets/imgs/appstore.png";
import googleplay from "../../../../assets/imgs/googleplay.png";
import mesadoko from "../../../../assets/imgs/mesadoko.png";
import logoforms from "../../../../assets/imgs/logoForms.png";
import zenu from "../../../../assets/imgs/zenulogo.png";

const WebLinkPhonePreview = ({ bodyColor }) => {
    const headerColor = "rgb(251, 164, 14)"
    const title = "¡Bienvenidos a Mesadoko!";
    const textColor = "247, 247, 247";
    const backgroundcolor = "linear-gradient(180deg, rgb(253, 93, 8) 0.00%,rgb(251, 164, 14) 100.00%)"
    const degradado ="247, 179, 34"
    const description = "Juega sudoko con palabras mientras te diviertes y aprendes. eeeeeeee eeee eeeee eeeeeeee eeeeee eeeeeeeeeee eeee eeeeee eeeeeee  eeeeeee eeeee eeeeee eeee eeee eeeeeeee eeee eeeeeee eeeeeeeeeee eeee eeeeeeeee"
    const data = [
        { name: 'Appstore', icon: appstore, link: 'https://apps.apple.com/es/app/mesadoko/id6459267121' },
        { name: 'Googleplay', icon: googleplay, link: 'https://play.google.com/store/apps/details?id=com.mesadavisenterprises.mesadokoapp&hl=es_CL&gl=US' },
    ];


    
    return (
        <div style={{ background:backgroundcolor }} className={`bg-gradient-to-b ml-2   flex flex-col h-full items-center rounded-t-[52px] rounded-b-[50px] w-full  p-2`}>
            {/* Encabezado del teléfono */}
            <WebLinkPhoneHeader logo={mesadoko} title={title} textColor={textColor} headerColor={headerColor} description={description}  />
            {/* Cuerpo del teléfono */}
            <div style={{ background: backgroundcolor }} className="rounded-b-[52px] p-5 flex flex-col items-center w-full h-full">
            <h1 style={{ color: `rgb(${textColor})` }} className={`font-bold mb-3 text-center relative ${title.length > 22 ? 'text-xl' : 'text-2xl'}`}>{title}</h1>

                <div>
                    <p className={`text-dark font-thin relative`}>{description}</p>
                </div>
                {/* Agrega aquí el contenido del cuerpo del teléfono */}
                <SocialButton data={data} />
            </div>
        </div>
    );
};

export default WebLinkPhonePreview;