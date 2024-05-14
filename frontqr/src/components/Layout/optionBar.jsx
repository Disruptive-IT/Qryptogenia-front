import React, { useEffect, useState } from "react";
import celular from "../../assets/imgs/Celular.png";
import "./optionBar.css";
import { BoxLink } from "./boxLink";
import QR from "../../assets/imgs/qr.png";
import logo from "../../../public/Logo.png";
import { dataTypeQr } from "./qrContent/contentData";
import { useNavigate } from "react-router-dom";
import menu from "../../assets/imgs/QR-types/menu.png";
import Spline from '@splinetool/react-spline';

export const OptionBar = () => {

  return (
    <div className="w-screen px-10">
      <div className="flex items-center md:p-2 lg:p-10">
        <BoxLink />
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
      <div className="">
      <Spline scene="https://prod.spline.design/sX32gyMUh76zN7mX/scene.splinecode" />

      </div>
    </div>
  );
};

export const OptionBarTwo = (props) => {
  const [activeButtonIndex, setActiveButtonIndex] = useState(null);
  const { contentName, title } = props;
  const navigate = useNavigate();

  const handleItemClick = (item) => {
    alert("Los cambios se perderán"); //* Acá debería ir un modal de confirmación 
    navigate(`/qr/${item.name.toLowerCase().replace(/\s+/g, '-')}`);
  };

  useEffect(() => {
    const path = dataTypeQr.findIndex(item => item.name.toLowerCase() === title);
    if (path !== -1) {
      setActiveButtonIndex(path);
    } else {
      setActiveButtonIndex(null);
    }
  }, [contentName]);

  return (
    <div className='flex gap-4 flex-wrap justify-center mb-10 px-10 p-7'>
      {dataTypeQr.map((item, index) => (
        <button
          onClick={() => handleItemClick(item)}
          className={`shadow-md max-w-[200px] h-[80px] transition-all duration-200 ease-in-out hover:translate-y-1 flex-grow flex items-center p-3 justify-center gap-3 rounded-lg text-black ${activeButtonIndex === index ? 'bg-dark-blue' : 'bg-white'} hover:border-spacing-48 hover:text-neutral-100`}
        >
          <img className="w-[50px]" src={item.img} alt={item.name} />
        </button>
      ))}
    </div>
  )

};


