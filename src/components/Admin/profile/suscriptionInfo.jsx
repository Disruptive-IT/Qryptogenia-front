/**
 * @Author : Cristian Rueda,   @date 2024-09-26 17:48:10
 * @description : Componente creado para menejar la informacion del plan que maneja el usuario en el apartado de editar perfil
 * @Props :
 * @return :
 */
import React from 'react';
import { useTranslation } from 'react-i18next';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';


    const SubscriptionInfo = () => {
        // Estado para almacenar los datos de la membresía
        const [membership, setMembership] = useState(null);
        const [error, setError] = useState(null);
        const { t } = useTranslation();
        const navigate = useNavigate();

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
            <div className=" bg-my-gray p-8 rounded-lg shadow-md mb-4 text-black max-w-90 mx-auto">
                        <h2 className="text-3xl font-bold mb-4">
                        Información de la Membresía</h2>
            <p className="text-gray-700 mb-2">
                <strong>Tipo de Membresía:</strong> {membership.membershipName}
            </p>
            <p className="text-gray-700 mb-2">
                <strong>Fecha de Inicio:</strong> {new Date(membership.startDate).toLocaleDateString()}
            </p>
            <p className="text-gray-700 mb-2">
                <strong>Fecha de Vencimiento:</strong> {new Date(membership.limitDate).toLocaleDateString()}
            </p>
            <p className="text-gray-700 mb-4">
                <strong>Precio:</strong> ${membership.price}
            </p>
            <button className="w-full bg-dark-blue text-white py-2 rounded-md hover:bg-light-blue transition"
                    onClick={handleRedirect}>
                Renovar Plan
            </button>
        </div>
        );
    };
    
    export default SubscriptionInfo;
    

