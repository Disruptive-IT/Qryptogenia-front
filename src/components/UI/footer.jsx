import React from "react";
import { FaFacebookSquare , FaInstagramSquare, FaTwitterSquare } from 'react-icons/fa';
import disruptive from "../../assets/imgs/disruptive/disruptive.png";


export const Footer = () => {

    const socialMedia = [
      {
        icon: FaFacebookSquare,
        link: 'https://www.facebook.com',
      },
      {
        icon: FaTwitterSquare,
        link: 'https://www.twitter.com',
      },
      {
        icon: FaInstagramSquare,
        link: 'https://www.instagram.com',
      },
    ]

    
  return (
    <footer className="">
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
      <div className="flex justify-between bg-slate-300 w-full px-6">

        <div className="flex flex-col w-2/6 text-slate-500">
          <p><strong>Contact us</strong></p>
          <p><strong>Email:</strong> disruptive.devops@gmail.com</p>
          <p><strong>Phone:</strong> +1 (555) 555-5555</p>
          <p>Terms of use</p>
          <p>Privacy policy</p>
        </div>

        <div className="flex flex-col items-center justify-center text-center w-2/6">
            <span className=" text-slate-500">Created By</span>
            <img src={disruptive} alt="disruptive" className="w-36 h-36"/>
            
        </div>

        <div className="flex flex-col w-2/6 items-end text-slate-500">
          <p>Social media:  </p>
          <div className="flex gap-1 flex-nowrap">
          {socialMedia.map((item, index) => (
              <a href={item.link} target="_blank" rel="noreferrer" key={index}>
              <div className="flex items-center justify-center">
                <item.icon className="w-6 h-6" />
              </div>
            </a>
          ))}
          </div>
        </div>
        
      </div>
      <div className="w-full flex justify-center bg-slate-300 py-2 ">

        <p className="text-slate-500 font-bold">© 2024 All rights reserved</p>
      </div>
    </footer>
  );
};
