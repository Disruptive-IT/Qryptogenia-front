export const QrContentSwitch = ({ contentName }) => {
    
    let qrContent;
    switch (contentName) {
        case "app store":
            qrContent = (
                <div>
                    <p>APP</p>
                </div>
            );
            break;
        case "social media":
            qrContent = (
                <div>
                    <p>REDES SOCIALES</p>
                </div>
            );
            break;
        case "website url":
            qrContent = (
                <div>
                    <p>PARA SITIOS WEBS</p>
                </div>
            );
            break;
        case "pdf":
            qrContent = (
                <div>
                    <form>
                        <label htmlFor="pdfFile">Selecciona tu archivo PDF:</label>
                        <input type="file" id="pdfFile" name="pdfFile" accept=".pdf" required />
                    </form>
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
                    <p>MUSICA</p>
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
