/**
 * @Author : Cristian Rueda,   @date 2024-09-26 17:48:10
 * @description : Componente creado para menejar la informacion del plan que maneja el usuario en el apartado de editar perfil
 * @Props :
 * @return :
 */
import React from 'react';

const SubscriptionInfo = ({ plan, expirationDate, benefits }) => {
    return (
        <div className=" bg-my-gray p-8 rounded-lg shadow-md mb-4 text-black max-w-90 mx-auto">
            <h2 className="text-3xl font-bold mb-4">
                Tu suscripción expira {expirationDate}
            </h2>
            <p className="mb-4">
                Los códigos QR se pueden escanear durante 30 días. Reactive su suscripción para:
            </p>
            <ul className="list-disc list-inside mb-4">
                {benefits.map((benefit, index) => (
                    <li key={index} className="mb-2"> {benefit}</li>
                ))}
            </ul>
            <button className="bg-dark-blue text-white py-2 px-4 rounded-full hover:bg-light-blue">
                SELECCIONAR PLAN
            </button>
        </div>
    );
};

export default SubscriptionInfo;
