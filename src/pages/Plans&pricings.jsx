


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
import { useState, useEffect } from 'react';
import axios from 'axios';


export const PlansPricings = () => {

  const [data, setData] = useState([]);
  const [discounts, setDiscounts] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:3000/api/memberships', {
          withCredentials: true,
        });
        console.log(response);

        const fetchedDiscounts = response.data.discounts || []; // Asegurarse de obtener los descuentos
        setDiscounts(fetchedDiscounts);
        
        // Transformar los datos para coincidir con el formato requerido
        const transformedData = response.data.memberships.map(item => {
          const price = parseFloat(item.price);
          let finalDiscount = 0;
          if (item.discounts && item.discounts.length > 0) {
            // Mapear los IDs de descuentos a los valores reales
            const applicableDiscounts = item.discounts.map(discountId => {
              const discount = fetchedDiscounts.find(d => d.id === discountId);
              if (discount) {
                // Quitar el símbolo '%' y convertir a número
                const discountValue = parseFloat(discount.discount.replace('%', ''));
                return !isNaN(discountValue) ? discountValue : 0;
              }
              return 0;
            });

            // Aplicar la lógica de descuento deseada, por ejemplo, utilizar el mayor descuento
            finalDiscount = Math.max(...applicableDiscounts);
          }
          // Calcular precio con descuento si existe
          const discountedPrice = !isNaN(price) && finalDiscount > 0
            ? price * (1 - finalDiscount / 100)
            : price;
            console.log(finalDiscount);
            
          return {
            id: item.id,
            name: item.type_membership,
            pricings: !isNaN(discountedPrice) ? `$${discountedPrice.toFixed(2)}` : 'N/A',
            pricingsMonthly: !isNaN(price) ? `$${price.toFixed(2)}` : 'N/A', // Ejemplo de cálculo para mensual
            ActivateQrs: item.active_qrs,
            scansXqr: item.scan_qrs || "Unlimited",
            sopport: item.premium_support ? <FaCheck className='text-green-500 text-2xl' /> : <IoClose className='text-red-500 text-2xl' />,
            staticQrs: item.unlimited_static ? <FaCheck className='text-green-500 text-2xl' /> : <IoClose className='text-red-500 text-2xl' />
          };
        });

        setData(transformedData);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);


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
