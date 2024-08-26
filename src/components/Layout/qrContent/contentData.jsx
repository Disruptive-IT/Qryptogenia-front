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
import { useTranslation } from "react-i18next";

export const UseContentTexts = () => {
    const { t } = useTranslation();
    return {
    "app-store": t("Find out how to link your application in all stores."),
    "social-media": t("Connect with your followers on all social networks."),
    "website-url": t("Link to your web site and make it accessible to everyone."),
    "pdf": t("Display or download your PDF with ease."),
    "news": t("Keep up to date with the latest news."),
    "music": t("Link your song in all music applications."),
    "wifi": t("Connect to a wireless network with ease."),
    "curriculum": t("Share your electronic resume easily."),
    "food-menu": t("Create a digital menu for your restaurant."),
    }
};

const UseDataTypeQr = () => {
    const { t } = useTranslation();
     return [
    { name: "App Store", img: app, description: t("Link your app in all stores") },
    { name: "Social Media", img: social, description: t("Link to all your social media channels") },
    { name: "Website Url", img: link, description: t("Link to the website of your choice") },
    { name: "PDF", img: pdf, description: t("Show or download your pdf") },
    { name: "News", img: news, description: t("hello world") },
    { name: "Music", img: music, description: t("Link your song in all music apps") },
    { name: "Wifi", img: wifi, description: t("Connect to a wireless network") },
    { name: "Curriculum", img: vcard, description: t("Share your electronic business card") },
    { name: "Food Menu", img: menu, description: t("Create a digital restaurant menu") },
];
}
export default UseDataTypeQr;