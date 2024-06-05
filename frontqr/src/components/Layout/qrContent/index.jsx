import AppForm from "./forms/App";
import { MusicForm } from "./forms/Music";
import { PdfUploadComponent, LinkInput } from "./forms/Pdf";
import SocialForm from "./forms/Social";
import { WebLinkPhone } from "./socialMedia/stylePhone";
import { WebLinkPhoneMusic } from "./socialMedia/stylePhoneMusic";
import WebLinkPhonePreview from "./socialMedia/webLinkPhonePreview";
export const QrContentSwitch = ({contentName, onFormChangeApp, onFormChange, onFormChangeMusic}) => {

    let qrContent;
    switch (contentName) {
        case "app store":
            qrContent = (
                <div>
                    <AppForm onFormChangeApp={onFormChangeApp}/>
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
                    <MusicForm onFormChangeMusic={onFormChangeMusic}/>
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


export const PhoneContentSwitch = ({contentName, appFormValues, socialFormValues, musicFormValues}) => {
console.log(musicFormValues)
let phoneContent;
switch (contentName) {
    case "app store":                                                       
    phoneContent = (
            <div>
                <WebLinkPhonePreview appFormValues={appFormValues}/>
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
        case "news":
            phoneContent = (
                <div>
                    <p>News</p>
                </div>
            );
            break;
        case "music":
            phoneContent = (
                <div>
                    <WebLinkPhoneMusic musicFormValues={musicFormValues}/>
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