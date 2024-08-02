


/**
 * @Author : Daniel Salazar,   @date 2024-07-30 10:31:02
 * @description :
 * @Props :
 * @return :
 */
import { data } from 'autoprefixer';
import React from 'react';
import { PricingsCards } from '../components/Layout/pricingsCards';
import { IoClose } from "react-icons/io5";
import { FaCheck } from "react-icons/fa";


export const PlansPricings = () => {

    const data=[
        {
            id:1,
            name:"FREE",
            pricings:"$0.00",
            pricingsMonthly: "$0.00",
            ActivateQrs: "2",
            scansXqr: "10",
            sopport:<IoClose className='text-red-500 text-2xl' />,
            staticQrs: <IoClose className='text-red-500 text-2xl' />

        },

        {
            id:2,
            name:"BASIC",
            pricings:"$9.99",
            pricingsMonthly: "$11.99",
            ActivateQrs: "5",
            scansXqr: "10000",
            sopport:<IoClose className='text-red-500 text-2xl' />,
            staticQrs: <IoClose className='text-red-500 text-2xl' />
        },
        {
            id:3,
            name:"ADVANCED",
            pricings:"$20.99",
            pricingsMonthly: "$24.99",
            ActivateQrs: "50",
            scansXqr: "Unlimited",
            sopport:<IoClose className='text-red-500 text-2xl' />,
            staticQrs: <FaCheck className='text-green-500 text-2xl' />
        },
        {
            id:4,
            name:"PROFESIONAL",
            pricings:"$45.99",
            pricingsMonthly: "$49.99",
            ActivateQrs: "250",    
            scansXqr: "Unlimited",
            sopport:<FaCheck className='text-green-500 text-2xl' />,
            staticQrs: <FaCheck className='text-green-500 text-2xl' />

        }
    ]



  return (
    <div className='flex flex-col items-center justify-center w-full h-full gap-4 rounded-lg p-5 pt-10 text-center'>
      <h1 className="text-2xl font-bold">PLANS & PRICINGS</h1>
      <span className='font-bold text-slate-500'>Find the Plan that Best Suits Your Needs</span>
      <PricingsCards data={data} />
      <span className='text-slate-400 '>All our plans include full QR code customization features, allowing you to personalize with your colors and logos. Enjoy unlimited static QR codes and downloadable files in print-quality formats (PNG, JPG, SVG).</span>
      <span className='text-slate-400'>All prices are inclusive of value-added tax (VAT) and shipping fees.</span>
    </div>
  );
};
