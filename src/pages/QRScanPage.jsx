import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import axios from '../libs/axios';

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
            console.log(res.data)
            setQrData(res.data);
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
        return <div>Cargando...</div>;
    }

    if (error) {
        return (
            <div>
                <p>Error: {error}</p>
            </div>
        );
    }

    return (
        <div>
            <p>Name: {qrData.name_qr}</p>
            <p>QR URL: <a href={qrData.qr} target="_blank" rel="noopener noreferrer">{qrData.qr}</a></p>
            <p>Fecha de Creación: {new Date(qrData.createdAt).toLocaleString()}</p>
            <p>Estado: {qrData.state ? 'Activo' : 'Inactivo'}</p>

            {qrData.user ? (
                <div className='mt-4'>
                    <h2>Usuario Propietario</h2>
                    <p>ID del Usuario: {qrData.user.id}</p>
                    <p>Nombre de Usuario: {qrData.user.username}</p>
                    <p>Email: {qrData.user.email}</p>
                </div>
            ) : (
                <p>No hay usuario propietario</p>
            )}
        </div>
    );
};

export default QRScanPage;
