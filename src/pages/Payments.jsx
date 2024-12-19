import React from 'react';
import { useTranslation } from 'react-i18next';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import UserInfo from "../components/Admin/profile/userInfo";


    const Payments = () => {
        // Estado para almacenar los datos de la membresía
        const [membership, setMembership] = useState(null);
        const [error, setError] = useState(null);
        const { t } = useTranslation();
        const navigate = useNavigate();
        const [user, setUser] = useState(null);

        const handleRedirect = () => {
            navigate('/pricings'); 
        };
        useEffect(() => {
            // Hacer la solicitud GET al backend
            const fetchMembership = async () => {
        try {
            // Hacer la solicitud al backend
            const response = await fetch('http://localhost:3000/api/user/getUserMembership', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: 'include', // Necesario para enviar las cookies con la solicitud
            });
    
            if (!response.ok) {
                throw new Error(`Error: ${response.statusText}`);
            }
    
            const data = await response.json();
            setMembership(data.membership); // Almacenar los datos de membresía
        } catch (err) {
            setError(err.message); // Manejar el error si ocurre
        }
    };
    
    
            fetchMembership(); // Ejecutamos la función al montar el componente
        }, []); // El arreglo vacío asegura que solo se ejecute una vez cuando el componente se monte
    
        // Si hay un error, lo mostramos
        if (error) {
            return <div>Error: {error}</div>;
        }
    
        // Si no tenemos datos de membresía, mostramos un mensaje de carga
        if (!membership) {
            return <div>Cargando información de la membresía...</div>;
        }
    
        // Si tenemos los datos, los mostramos
        return (
<div className="flex items-start justify-center ">
              <div className="mx-auto bg-my-gray p-6 sm:p-10 lg:p-12 rounded-lg shadow-md mb-4 text-black flex flex-col lg:flex-row justify-center lg:justify-start space-y-6 lg:space-y-0 mx-6 lg:mx-12 w-3/4">
                {/* Columna 1: Detalles de la membresía */}
                <div className="w-full lg:w-1/2 px-4 lg:px-8 flex flex-col items-center lg:items-start">
                  <h2 className="text-3xl font-bold mb-4 text-center lg:text-left">Detalles de la compra</h2>
                  <p className="text-gray-700 mb-2">
                    <strong>Tipo de Membresía:</strong> {membership.membershipName}
                  </p>
                  <p className="text-gray-700 mb-2">
                    <strong>Beneficios:</strong>
                  </p>
                  <p className="text-gray-700 mb-2">
                    <strong>Fecha de Inicio:</strong>{" "}
                    {new Date(membership.startDate).toLocaleDateString()}
                  </p>
                  <p className="text-gray-700 mb-2">
                    <strong>Fecha de Vencimiento:</strong>{" "}
                    {new Date(membership.limitDate).toLocaleDateString()}
                  </p>
                  <p className="text-gray-700 mb-4">
                    <strong>Precio:</strong> ${membership.price}
                  </p>
                  <button
                    onClick={handleRedirect}
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                  >
                    Cambiar membresía
                  </button>
                </div>
          
                {/* Columna 2: User Info y Botón adicional */}
                <div className="w-full mt-4 lg:ml-8 lg:mt-0 lg:w-3/6">
                  <UserInfo setUser={setUser} user={user} />
                  <button
                    onClick={() => console.log("Continuar compra")}
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-12"
                  >
                    Continua MercadoPago
                  </button>
                </div>
              </div>
            </div>
          );
          
          
          
          
    };
    
    export default Payments;
    