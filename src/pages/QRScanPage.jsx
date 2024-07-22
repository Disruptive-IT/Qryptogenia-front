import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import axios from '../libs/axios';
import { SocialLayout } from '../components/Layout/qrContent/LayoutsQr/stylePhoneSocialLayout';
import { SocialButtonM } from '../components/Layout/qrContent/socialMedia/socialButtons';

/**
 * @Author : Jobserd Julián Ocampo,   @date 2024-07-19 09:08:16
 * @description : Página de destino del usuario tras la lectura del QR, donde se muestra la vista previa obtenida
 * @Props : Se recibe el qrId desde los parámetros, el cual se utiliza para realizar una petición al backend
 * @return: Retorna los datos obtenidos de la petición, incluyendo posibles errores y resultados exitosos
**/

// const musicData = {
//     selectedOptions: [
//         { value: 'spotify', url: 'https://spotify.com' },
//         { value: 'youtube', url: 'https://youtube.com' },
//     ],
//     backgroundColor: 'linear-gradient(180deg, #fff 0.00%,rgb(50, 52, 53) 100.00%)',
//     borderColor: '#000000',
//     image: 'https://cdn-icons-png.flaticon.com/512/25/25231.png',
//     titleColor: '#000',
//     descriptionColor: '#000',
//     title: 'Título',
//     description: '.',
// };



const QRScanPage = () => {
    const [searchParams] = useSearchParams();
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [qrData, setQrData] = useState(null);
    const qrId = searchParams.get('q');

    const fetchData = async () => {
        try {
            const res = await axios.get(`/verify-qr?q=${qrId}`);
            console.log(res.data.QrPreview)
            setQrData(res.data.QrPreview);
            // setQrData(musicData);
            setLoading(false);
        } catch (err) {
            setError(err.response?.data?.msg || 'Error de verificación de QR');
            setLoading(false);
        }
    };

    useEffect(() => {
        if (qrId) {
            fetchData();
        } else {
            setError('No se proporcionó ningún ID de QR');
            setLoading(false);
        }
    }, [qrId]);

    if (loading) {
        return (
            <div className='flex items-center justify-center min-h-screen'>
                <p className='text-xl'>Cargando</p>
            </div>
        );
    }

    if (error) {
        return (
            <div className='flex items-center justify-center min-h-screen'>
                <p className='text-xl'>{error}</p>
            </div>
        );
    }

    // Acá se debe de tomar correctamente el nombre del enlace, dicho nombre se usa para tomar los iconos.
    //! Al momento de guardar las opciones de seleccion de la preview, se debes de guardar de manera que se pueda tomar el "value" para tomar el icono de react-icons y presentar el texto
    const dataBtns = Array.isArray(qrData.SelectOptions) ? qrData.SelectOptions.map(option => ({
        name: option.value.split(' ')[0].charAt(0).toUpperCase() + option.value.split(' ')[0].slice(1),
        url: option.url
    })) : [];

    
    return (
        <div className='flex items-center justify-center min-h-screen'>
            <div className='flex flex-col min-h-screen w-full items-center justify-center' style={{ background: qrData.backgroudColor }}>
                <div className='flex flex-col items-center mt-10 md:mt-28 bg-white rounded-2xl w-[90%] sm:w-[400px] md:w-[600px] min-h-[400px] max-h-[600px] p-6 shadow-lg' style={{ background: qrData.boxColor }}>
                    <div className='relative bg-white rounded-2xl -mt-14 border-4 shadow-md p-1 transition-shadow hover:shadow-xl' style={{ borderColor: qrData.borderImg }}>
                        <img className='w-20' src={qrData.image} alt="imgBoxBackgroud" />
                    </div>
                    <div className="mt-4 mb-2 w-[90%] text-center">
                        <h1
                            className="text-2xl mb-2 font-bold"
                            style={{ color: qrData.colorTitle }}
                        >
                            {qrData.title}
                        </h1>
                        <div
                            className="break-words overflow-y-auto max-h-[200px] custom-scrollbar text-lg leading-relaxed"
                            style={{ color: qrData.descriptionColor }}
                        >
                            {qrData.description}
                        </div>
                    </div>
                </div>
                <SocialButtonM data={dataBtns} />
            </div>
        </div>
    );
};

//? Como tomar las img
//? Como tomar los iconos
//! Limitar entradas 

export default QRScanPage;
