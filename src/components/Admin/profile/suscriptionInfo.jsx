/**
 * @Author : Cristian Rueda,   @date 2024-09-26 17:48:10
 * @description : Componente creado para menejar la informacion del plan que maneja el usuario en el apartado de editar perfil
 * @Props :
 * @return :
 */
import React from 'react';

const SubscriptionInfo = ({ plan, expirationDate, benefits }) => {
    return (
        <div className="subscription-info bg-gray-100 p-4 rounded-lg shadow-md mb-4 "
        style={{ backgroundColor: "#3C6E71", color: "#D9D9D9"

            
         }}>
            <h2 className="text-lg font-semibold">Subscription Plan</h2>
            <p><strong>Plan:</strong> {plan}</p>
            <p><strong>Expiration Date:</strong> {expirationDate}</p>
            <p><strong>Benefits:</strong></p>
            <ul>
                {benefits.map((benefit, index) => (
                    <li key={index}>• {benefit}</li>
                ))}
            </ul>
        </div>
    );
};

export default SubscriptionInfo;
