import AppForm from "./forms/App";
import { YouTubePlaylistComponent } from "./forms/Music";
import { PdfUploadComponent, LinkInput } from "./forms/Pdf";
import SocialForm from "./forms/Social";
import { WebLinkPhone } from "./socialMedia/stylePhone";

export const QrContentSwitch = ({ contentName, onFormChange }) => {

    let qrContent;
    switch (contentName) {
        case "app store":
            qrContent = (
                <div>
                    <AppForm />
                </div>
            );
            break;
        case "social media":
            qrContent = (
                <div>
                    <SocialForm onFormChange={onFormChange} />
                </div>
            );
            break;
        case "website url":
            qrContent = (
                <div>
                    <LinkInput />
                </div>
            );
            break;
        case "pdf":
            qrContent = (
                <div>
                    <PdfUploadComponent />
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
                    <YouTubePlaylistComponent />
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


export const PhoneContentSwitch = ({socialFormValues, contentName} ) => {
    
    let phoneContent;
    switch (contentName) {
        case "app store":
            phoneContent = (
                <div>
                    <WebLinkPhone socialFormValues={socialFormValues}/>
                </div>
                
            );
            break;
        case "social media":
            phoneContent = (
                <div>
                    <WebLinkPhone socialFormValues={socialFormValues}/>


                </div>
            );
            break;
        case "website url":
            phoneContent = (
                <div>
                    <WebLinkPhone title={"HOLA MUNDO"}
                        textColor={"blue"} />
                </div>
            );
            break;
        case "pdf":
            phoneContent = (
                <div>
                    <WebLinkPhone title={"HOLA MUNDO"}
                        textColor={"blue"} />
                </div>
            );
            break;
        case "news":
            phoneContent = (
                <div>
                    <WebLinkPhone title={"HOLA MUNDO"}
                        textColor={"blue"} />
                </div>
            );
            break;
        case "music":
            phoneContent = (
                <div>
                    <WebLinkPhone title={"HOLA MUNDO"}
                        textColor={"blue"} />
                </div>
            );
            break;
        case "wifi":
            phoneContent = (
                <div>
                    <p>WIFI</p>
                </div>
            );
            break;
        case "curriculum":
            phoneContent = (
                <div>
                    <p>COMPARTIR LA HOJA DE VIDA</p>
                </div>
            );
            break;
        case "food menu":
            phoneContent = (
                <div>
                    <p>ACÁ EL MENU DEL NEGOCIO</p>
                </div>
            );
            break;
    }

    return phoneContent;
};