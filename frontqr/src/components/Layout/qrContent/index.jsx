import AppForm from "./forms/App";
import SpotifyPlaylist from "./forms/Music";
import {PdfUploadComponent, LinkInput } from "./forms/Pdf";
import SocialForm from "./forms/Social";

export const QrContentSwitch = ({contentName}) => {
    
    let qrContent;
    switch (contentName) {
        case "app store":                                                       
            qrContent = (
                <div>
                    <AppForm/>
                </div>
            );
            break;
        case "social media":
            qrContent = (
                <div>
                    <SocialForm/>
                </div>
            );
            break;
        case "website url":
            qrContent = (
                <div>
                    <LinkInput/>
                </div>
            );
            break;
        case "pdf":
            qrContent = (
                <div>
                    <PdfUploadComponent/>
                </div>
            );
            break;
        case "news":
            qrContent = (
                <div>
                    <p>NOTICIAS</p>
                </div>
            );
            break;
        case "music":
            qrContent = (
                <div>
                    <SpotifyPlaylist/>
                </div>
            );
            break;
        case "wifi":
            qrContent = (
                <div>
                    <p>WIFI</p>
                </div>
            );
            break;
        case "curriculum":
            qrContent = (
                <div>
                    <p>COMPARTIR LA HOJA DE VIDA</p>
                </div>
            );
            break;
        case "food menu":
            qrContent = (
                <div>
                    <p>ACÁ EL MENU DEL NEGOCIO</p>
                </div>
            );
            break;
    }

    return qrContent;
};
