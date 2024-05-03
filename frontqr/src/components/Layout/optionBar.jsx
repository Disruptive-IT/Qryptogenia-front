import React from "react";
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

export const OptionBar = () => {
  const rigthItems = [
    { name: "APP", img: app },
    { name: "Social", img: social },
    { name: "Link", img: link },
    { name: "PDF", img: pdf },
  ];

  const leftItems = [
    { name: "News", img: news },
    { name: "Music", img: music },
    { name: "Wifi", img: wifi },
    { name: "V-Card", img: vcard },
  ];

  return (
    <div className="w-full">
      <div className="container-layout">
        <BoxLink data={rigthItems} />
        <div className="gridItem cellPhone">
          <div className="flex-wrap text-center jutify-center">
            <div>
              <h1>
                <strong>QR</strong> Type
              </h1>
              <p className="mt-5 p-3">
                Enjoy all the services that Qryptogenia can offer you, don't wait any longer
              </p>
            </div>
            <div className="w-ful flex justify-center">
              <img src={QR} alt="" className="w-20" />
            </div>
          </div>
          <img
            src={celular}
            alt="prevew"
            style={{ width: "230px", position: "absolute" }}
          />
        </div>
        <BoxLink data={leftItems} />
      </div>

      <div className="w-full flex justify-center mt-20 mb-20 explanation">
        <Explanations/>
      </div>
    </div>
  );
};
