/*
 * @Author : Jaider cuartas   @Date : 2024-07-15
 * @Description : Componente que muestra diferentes vistas previas de teléfono según el nombre de contenido proporcionado.
 * @Props :
 *   - contentName: Nombre del contenido a mostrar (obligatorio).
 *   - appFormValues: Valores del formulario de la aplicación (opcional).
 *   - socialFormValues: Valores del formulario de redes sociales (opcional).
 *   - musicFormValues: Valores del formulario de música (opcional).
 * @Return : Retorna la vista previa correspondiente según el nombre de contenido.
 */

/*
 * @UpdatedBy : Nicolas Barrios,   @date 2024-07-29 16:59:26
 * @description : se borraron archivos de previwes cleular para social y apps dejando solo el esqueleto del de musica para todos
 */

import AppForm from "./forms/App";
import { PdfUploadComponent, LinkInput } from "./forms/Pdf";
import SocialForm from "./forms/Social";
import MusicForm from "./forms/Music";
import { WebLinkPhoneMusic } from "./socialMedia/stylePhoneMusic";
export const QrContentSwitch = ({contentName, onFormChangeApp, onFormChange, onFormChangeMusic, onSocialFormSubmit}) => {

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
                    <SocialForm onFormChange={onFormChange} onSubmit={onSocialFormSubmit} />
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

let phoneContent;
switch (contentName) {
    case "app store":                                                       
    phoneContent = (
            <div>
                <WebLinkPhoneMusic FormValues={appFormValues}/>
            </div>
        );
        break;
    case "social media":
        phoneContent = (
            <div>
                <WebLinkPhoneMusic FormValues={socialFormValues}/>
            </div>
        );
        break;
        case "website url":
            phoneContent = (
                <div>
                    <WebLinkPhoneMusic FormValues={appFormValues}/>
                </div>
            );
            break;
        case "pdf":
            phoneContent = (
                <div>
                    <h1>PDF</h1>
                </div>
            );
            break;
        case "news":
            phoneContent = (
                <div>
                    <h1>NOTICIAS</h1>
                </div>
            );
            break;
        case "music":
            phoneContent = (
                <div>
                    <WebLinkPhoneMusic FormValues={musicFormValues}/>
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