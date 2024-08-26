import React from "react";
import { FaFacebookSquare , FaInstagramSquare, FaTwitterSquare } from 'react-icons/fa';
import disruptive from "../../assets/imgs/disruptive/disruptive.png";
import { FaLinkedin, FaSquareXTwitter  } from "react-icons/fa6";
import { useTranslation } from "react-i18next";

export const Footer = () => {
  const gradientStyle = {
    background: 'linear-gradient(45deg, #f58529, #dd2a7b, #8134af, #515bd4)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    backgroundClip: 'text',
    textFillColor: 'transparent',
  };
  const { t } = useTranslation();

    const socialMedia = [
      {
        icon: <FaFacebookSquare className="text-[#0865fe] w-6 h-6" title="Facebook" />,
        link: 'https://www.facebook.com/disruptive.devops?locale=es_LA',
        color: '#0865fe'
      },
      {
        icon: <FaLinkedin className="text-[#0b65c3] w-6 h-6" title="Linkedin" />,
        link: 'https://www.linkedin.com/company/disruptive-information-technologies/',
        color: '#0b65c3'
      },
      {
        icon: <FaInstagramSquare className="text-[#c32a5f] w-6 h-6" title="Instagram" />,
        link: 'https://www.instagram.com/disruptive.info/',
        color: '#0865fe'

      },
      {
        icon: <FaSquareXTwitter className="text-black w-6 h-6" title="Instagram" />,
        link: 'https://x.com/DisruptiveITDev',
        color: '#0865fe'

      },
    ]

    
  return (
    <footer className="mt-10">
      <svg
        viewBox="0 -20 700 110"
        width="100%"
        height="70"
        preserveAspectRatio="none"
      >
        <path
          transform="translate(0, -20)"
          d="M0,10 c80,-22 240,0 350,18 c90,17 260,7.5 350,-20 v50 h-700"
          fill="#284B63"
        />
        <path
          d="M0,10 c80,-18 230,-12 350,7 c80,13 260,17 350,-5 v100 h-700z"
          fill="#cbd5e1"
        />
      </svg>
      <div className="flex justify-between flex-wrap bg-slate-300 w-full px-6">

        <div className="cursor-default flex flex-col items-center md:items-start justify-center w-full md:w-2/6 text-slate-500">
          <p><strong>{t("Contact us")}</strong></p>
          <p><strong>{t("Email")}:</strong> disruptive.devops@gmail.com</p>
          <p><strong>{t("Phone")}:</strong> +57 324 2167567</p>
        </div>

        <div className="flex flex-col items-center justify-center text-center w-full md:w-2/6">
            <span className="cursor-default text-slate-500"><strong>{t("Developed By")}</strong></span>
            <img src={disruptive} alt="disruptive" className="w-36 h-36"/>
            
        </div>

        <div className="flex flex-col items-center  gap-2 w-full md:w-2/6 md:items-end text-slate-500">
          <div className="flex gap-1 flex-nowrap">
            
          {socialMedia.map((item, index) => (
              <a href={item.link} target="_blank" rel="noreferrer" key={index}>
              <div className="flex items-center justify-center transition-all hover:scale-110 duration-300">
                {item.icon}
              </div>
            </a>
          ))}
          </div>
          
          <p className="font-bold cursor-pointer">{t("Terms of use")}</p>
          <p className="font-bold cursor-pointer">{t("Privacy policy")}</p>
        </div>
        
      </div>
      <div className="w-full flex justify-center bg-slate-300 mb-[55px] md:mb-0 md:py-3  ">
        <p className="text-slate-500 font-bold">© 2024 {t("All rights reserved")}</p>
      </div>
    </footer>
  );
};
