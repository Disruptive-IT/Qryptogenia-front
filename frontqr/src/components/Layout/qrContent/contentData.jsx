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
    "app-store": "Find out how to link your application in all stores.",
    "social-media": "Connect with your followers on all social networks.",
    "website-url": "Link to your web site and make it accessible to everyone.",
    "pdf": "Display or download your PDF with ease.",
    "news": "Keep up to date with the latest news.",
    "music": "Link your song in all music applications.",
    "wifi": "Connect to a wireless network with ease.",
    "curriculum": "Share your electronic resume easily.",
    "food-menu": "Create a digital menu for your restaurant.",
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