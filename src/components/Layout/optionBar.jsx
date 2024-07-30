import React, { useEffect, useState } from "react";
import celular from "../../assets/imgs/Celular.png";
import "./optionBar.css";
import { BoxLink } from "./boxLink";
import QR from "../../assets/imgs/qr.png";
import logo from "../../../public/Logo.png";
import { dataTypeQr } from "./qrContent/contentData";
import { useNavigate } from "react-router-dom";
import menu from "../../assets/imgs/QR-types/menu.png";
import Swal from 'sweetalert2';
import { useQr } from "../../context/QrContext";
import './styles/qr-animation.css'
import { motion } from "framer-motion";

/*
 * @UpdatedBy : Nicolas Barrios,   @date 2024-07-25 11:51:05
 * @description : estilos corregidos del div del celular del home                                                     
 */

/*
 * @Author : Nicolas Barrios,   @date 2024-07-25 19:25:40
 * @description : se agrego motion para estilos y animaciones, se hizo animacion del qr scaneado
 * @Props : ninguna
 * @return :
 */

export const OptionBar = () => {

  return (
    <div className="w-screen px-10">
      <div className="flex items-center md:p-2 lg:p-10">
        <BoxLink />
        <div className="w-full hidden lg:block gap-4 sm:min-h-[490px] md:h-[490px] lg:max-h-[690px] lg:max-w-60  cellPhone custom-max:ml-6">
          <div className=" flex flex-col h-full gap-4 text-center  items-center jutify-center">
            <div className="h-1/3 w-full flex flex-col justify-end items-center">
              <img src={logo} alt="" className="w-20" />
            </div>
            <h1> <strong>QR</strong>Type</h1>
            <p className="mt-3 p-3 text-sm">
              Enjoy all the services that Qryptogenia can offer you, don't wait any longer
            </p>
            <div 
            className={`relative p-2 w-[40%] bg-transparent rounded-[10%] my-[1%]`}
            >
              <motion.img 
              src={QR} 
              alt="" 
              className="w-full"
              initial={{ opacity: 0 }}
              animate={{
                opacity: 1,
                scale: [1, 0.8, 0.7, 1]
              }}
              transition={{
                duration: 3,
                times: [0.3, 0.4, 0.5, 0.6],
                repeat: Infinity,
                repeatDelay:2
              }} />
            </div>
          </div>
        </div>
      </div>
      <div className="">

      </div>
    </div>
  );
};

export const OptionBarTwo = ({ contentName, name }) => {
  const [activeButtonIndex, setActiveButtonIndex] = useState(null);
  const { qrType, setQrType } = useQr();
  const navigate = useNavigate();

  const handleItemClick = (item) => {
    Swal.fire({
      title: 'Alert',
      text: 'Are you sure you want to change the type? The qr status will be lost.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Confirm',
      cancelButtonText: 'Cancel'
    }).then((result) => {
      if (result.isConfirmed) {
        let direcc = item.name.toLowerCase().replace(/\s+/g, '-')
        setQrType(direcc)
        navigate(`/qr/${direcc}`);
      }
    });
  };

  useEffect(() => {
    const path = dataTypeQr.findIndex(item => item.name.toLowerCase() === name);
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


