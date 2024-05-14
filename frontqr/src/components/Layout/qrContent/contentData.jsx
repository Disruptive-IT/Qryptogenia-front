import app from "../../../assets/imgs/QR-types/app.png";
import QR from "../../../assets/imgs/qr.png";
import news from "../../../assets/imgs/QR-types/news.png";
import pdf from "../../../assets/imgs/QR-types/pdf.png";
import link from "../../../assets/imgs/QR-types/link.png";
import social from "../../../assets/imgs/QR-types/social.png";
import music from "../../../assets/imgs/QR-types/music.png";
import wifi from "../../../assets/imgs/QR-types/wifi.png";
import vcard from "../../../assets/imgs/QR-types/vcard.png";
import menu from "../../../assets/imgs/QR-types/menu.png";

export const contentTexts = {
    "app-store": "Descubre cómo enlazar tu aplicación en todas las tiendas.",
    "social-media": "Conecta con tus seguidores en todas las redes sociales.",
    "website-url": "Enlaza a tu sitio web y hazlo accesible para todos.",
    "pdf": "Muestra o descarga tu PDF con facilidad.",
    "news": "Mantente al día con las últimas noticias.",
    "music": "Enlaza tu canción en todas las aplicaciones de música.",
    "wifi": "Conéctate a una red inalámbrica con facilidad.",
    "curriculum": "Comparte tu currículum electrónico con facilidad.",
    "food-menu": "Crea un menú digital para tu restaurante.",
};

export const dataTypeQr = [
    { name: "APP Store", img: app, description: "Link your app in all stores" },
    { name: "Social media", img: social, description: "Link to all your social media channels" },
    { name: "Website URL", img: link, description: "Link to the website of your choice" },
    { name: "PDF", img: pdf, description: "Show or download your pdf" },
    { name: "News", img: news, description: "hello world" },
    { name: "Music", img: music, description: "Link your song in all music apps" },
    { name: "Wifi", img: wifi, description: "Connect to a wireles network" },
    { name: "Curriculum", img: vcard, description: "Share your electronic business card" },
    { name: "Food Menu", img: menu, description: "Create a digital restauran menu" },
];