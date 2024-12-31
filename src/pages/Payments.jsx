import React from 'react';
import { useTranslation } from 'react-i18next';
import { useEffect, useState } from 'react';
import { useNavigate, useParams, useSearchParams } from 'react-router-dom';
import UserInfo from "../components/Admin/profile/userInfo";
import instance from '../libs/axios';
import { Wallet,initMercadoPago } from '@mercadopago/sdk-react';

initMercadoPago(`${import.meta.env.VITE_MERCADO_PAGO_PUBLIC_KEY}`)


    const Payments = () => {
        // Estado para almacenar los datos de la membresía
        const [membership, setMembership] = useState({});
        const [error, setError] = useState(null);
        const { t } = useTranslation();
        const navigate = useNavigate();
        const [params] = useSearchParams();
        const [user, setUser] = useState({});
        const id = params.get('membershipId');
        const [idPreference,setIdPreference]=useState(null);
        const current = new Date(); // Obtén el objeto Date directamente
        const limitDate = new Date(current); // Crea una copia de la fecha actual
        limitDate.setMonth(current.getMonth() + 1); // Incrementa el mes
        const limitDateString = limitDate.toLocaleDateString(); // Convierte a string si lo necesitas
        
        const handleRedirect = () => {
            navigate('/pricings'); 
        };

        const customization={
          visual:{
            buttonBackground:'#284B63'
          }
        }

        const createPreference=async()=>{
          try{
            if(Object.keys(membership).length>0){
              const responsePreference=await instance.post('/payment/preference',{
                planId:membership?.planId,
                startDate:current,
                endDate:limitDate,
                price:membership?.price,
                amount:1,
                membresyName:membership?.type,
                durationMembresy:1
              })
              const response=responsePreference.data
              setIdPreference(response.idPreference);
              console.log("prefrence id: ",response.idPreference);
            }
          }catch(error){
            console.error("error getting preference: ",error.message);
          }
        }

        useEffect(()=>{
          console.log("prefrence id ",idPreference);
        },[idPreference]);
        useEffect(() => {
            const fetchMembership = async () => {
                try {
                    const response = await instance.get(`/payment/dataMembership/${id}`);
                    if (response.status === 200) {
                        setMembership(response.data);
                    } else {
                        setError(response.data.message);
                    }
                    
                } catch (error) {
                    console.error('Error fetching membership:', error);
                }
            };

            fetchMembership(); // Ejecutamos la función al montar el componente
        }, []); // El arreglo vacío asegura que solo se ejecute una vez cuando el componente se monte
        console.log(membership);
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
            <div className="flex items-center justify-center mt-10">

              <div className="w-full max-w-5xl justify-center bg-white p-4 sm:p-8 lg:p-12 rounded-lg shadow-lg flex flex-col lg:flex-row">
                {/* Columna 1: Detalles de l plan */}
                <div className="w-full lg:w-2/3 p-4">
                  <h2 className="text-2xl font-bold mb-6">Detalles del Plan</h2>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center border-b pb-2">
                      <div>
                        <h3 className="font-semibold">Tipo de Membresía</h3>
                        <div>
                        <p className="text-gray-600">{membership?.type}</p>
                      </div>
                      <span className="font-bold text-lg text-dark-blue">${membership?.price}</span>
                    </div>
                    </div>
                    <div className="flex justify-between items-center border-b pb-2">
                      <div>
                        <h3 className="font-semibold">Fecha de Inicio</h3>
                        <p className="text-gray-600">
                        {current.toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                    <div className="flex justify-between items-center border-b pb-2">
                      <div>
                        <h3 className="font-semibold">Fecha de Vencimiento</h3>
                        <p className="text-gray-600">
                        {limitDateString}
                        </p>
                      </div>
                    </div>
                    <div>
                      <h3 className="font-semibold">Beneficios</h3>
                      <p className="text-gray-600">
                        Cantidad de escaneos por Qr: <span>{membership?.type=='Professional' || membership?.type=='Advanced' ? 'Unlimited' : membership?.scanQrs}</span>
                      </p>
                      <p className="text-gray-600">
                        Cantidad de Qrs activos: <span>{membership?.activeQrs}</span>
                      </p>
                    </div>
                  </div>
                  <div className="mt-6">
                    <button
                      onClick={handleRedirect}
                      className="bg-dark-blue text-white hover:bg-light-blue font-bold py-2 px-4 rounded "
                    >
                      Cambiar Membresía
                    </button>
                  </div>
                </div>
        
                {/* Columna 2: User Info */}
                <div className="w-full lg:w-3/5 bg-dark-blue text-white p-6 rounded-lg shadow-lg">
                  <h2 className="text-xl font-bold mb-4">Información del Usuario</h2>
                  <UserInfo setUser={setUser} user={user} hideEditButton={true} />
                  <div className="mt-6">
                    <button
                      onClick={() => createPreference()}
                      disabled={idPreference!==null}
                      className="bg-white text-my-black hover:bg-gray-200 font-bold py-2 px-4 rounded "
                    >
                      Continuar con MercadoPago
                    </button>
                  </div>
                  {idPreference && (
                    <Wallet initialization={{preferenceId:`${idPreference}`}} customization={customization} />
                  )}
                </div>
              </div>
              </div>
          
        );
        };
        
    
    export default Payments;
    