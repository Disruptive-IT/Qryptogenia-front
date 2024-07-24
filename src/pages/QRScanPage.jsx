import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import axios from '../libs/axios';
import { SocialLayout } from '../components/Layout/qrContent/LayoutsQr/stylePhoneSocialLayout';
import { SocialButtonM } from '../components/Layout/qrContent/socialMedia/socialButtons';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';

/**
 * @Author : Jobserd Julián Ocampo,   @date 2024-07-19 09:08:16
 * @description : Página de destino del usuario tras la lectura del QR, donde se muestra la vista previa obtenida
 * @Props : Se recibe el qrId desde los parámetros, el cual se utiliza para realizar una petición al backend
 * @return: Retorna los datos obtenidos de la petición, incluyendo posibles errores y resultados exitosos
**/

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
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh' }}>
                <CircularProgress />
            </Box>
        );
    }

    if (error) {
        return (
            <div className='flex items-center justify-center min-h-screen'>
                <p className='text-xl'>{error}</p>
            </div>
        );
    }

    const mapNetworkName = (value) => {
        const formattedValue = value.toLowerCase();
        if (formattedValue.includes('samsung galaxy store')) {
            return 'Galaxy Store';
        } else if (formattedValue.includes('app store')) {
            return 'Apple Store';
        } else if (formattedValue.includes('google play store')) {
            return 'Google Play';
        } else {
            return value.split(' ')[0].charAt(0).toUpperCase() + value.split(' ')[0].slice(1).toLowerCase();
        }
    };

    const dataBtns = Array.isArray(qrData.SelectOptions) ? qrData.SelectOptions.map(option => ({
        name: mapNetworkName(option.value),
        url: option.url
    })) : [];

    return (
        <div className='flex items-center justify-center min-h-screen'>
            <div className='flex flex-col min-h-screen w-full items-center justify-center' style={{ background: qrData.backgroudColor }}>
                <div className='flex flex-col items-center mt-10 md:mt-28 bg-white rounded-2xl w-[90%] sm:w-[400px] md:w-[600px] h-auto max-h-[600px] p-6 shadow-lg' style={{ background: qrData.boxColor }}>
                    <div className='relative bg-white rounded-2xl -mt-14 border-4 shadow-md p-1 transition-shadow hover:shadow-xl' style={{ borderColor: qrData.borderImg }}>
                        <img className='w-20' src={`data:image/png;base64,${qrData.imgBoxBackgroundBase64}`} alt="img" />
                    </div>
                    <div className="mt-4 mb-2 w-[90%] text-center">
                        <h1
                            className="text-2xl mb-2 font-bold"
                            style={{ color: qrData.colorTitle }}
                        >
                            {qrData.title}
                        </h1>
                        <div
                            className="break-words overflow-y-auto max-h-[200px] text-lg leading-relaxed"
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

export default QRScanPage;
