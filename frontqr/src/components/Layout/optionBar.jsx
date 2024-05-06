import React, { useState } from "react";
import celular from "../../assets/imgs/Celular.png";
import "./optionBar.css";
import { BoxLink } from "./boxLink";
import app from "../../assets/imgs/QR-types/app.png";
import QR from "../../assets/imgs/qr.png";
import news from "../../assets/imgs/QR-types/news.png";
import pdf from "../../assets/imgs/QR-types/pdf.png";
import link from "../../assets/imgs/QR-types/link.png";
import social from "../../assets/imgs/QR-types/social.png";
import music from "../../assets/imgs/QR-types/music.png";
import wifi from "../../assets/imgs/QR-types/wifi.png";
import vcard from "../../assets/imgs/QR-types/vcard.png";
import { Explanations } from "./explanatios";
import logo from "../../../public/Logo.png";
import menu from "../../assets/imgs/QR-types/menu.png";

export const OptionBar = () => {
  const data = [
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

  return (
    <div className="w-screen px-10">
      <div className="flex items-center md:p-2 lg:p-10">
        <BoxLink data={data}/>
        <div className="w-full hidden lg:block gap-4 sm:min-h-[490px] md:h-[490px] lg:max-h-[690px] lg:max-w-60  cellPhone">
          <div className=" flex flex-col h-full gap-4 text-center  items-center jutify-center">
            <div className="h-1/3 w-full flex flex-col justify-end items-center">
              <img src={logo} alt="" className="w-20" />
            </div>
            <h1> <strong>QR</strong>Type</h1>
            <p className="mt-3 p-3 text-sm">
              Enjoy all the services that Qryptogenia can offer you, don't wait any longer
            </p>
            <img src={QR} alt="" className="w-14" />
          </div>
        </div>
      </div>
      <div className="w-full flex justify-center mt-20 mb-20 explanation">
        <Explanations />
      </div>
    </div>
  );
};
