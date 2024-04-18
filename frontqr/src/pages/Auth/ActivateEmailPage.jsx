import { useEffect, useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { CheckCircleIcon, AlertCircleIcon } from 'lucide-react';
import instance from '../../libs/axios';
import Loader from '../../components/UI/loader/Loader';

const ActivateEmailPage = () => {
    const [searchParams] = useSearchParams();
    const token = searchParams.get('token');
    const navigate = useNavigate();
    const [message, setMessage] = useState('');
    const [status, setStatus] = useState(null);
    const [timeLeft, setTimeLeft] = useState(5);
    const [showLoader, setShowLoader] = useState(false);
    const [showContainer, setShowContainer] = useState(false); 

    useEffect(() => {

        const verifyEmail = async () => {
            const timerLoader = setTimeout(() => setShowLoader(true), 500);
            const response = await instance.get(`/activate-email/${token}`);
            clearTimeout(timerLoader);
            setShowLoader(false);
            setMessage(response.data.message);
            setStatus(response.status);
            setShowContainer(true);

            const timer = setInterval(() => {
                setTimeLeft(prevTimeLeft => prevTimeLeft - 1);
            }, 1000);
            setTimeout(() => {
                clearInterval(timer);
                navigate('/login');
            }, 5000);
        };

        verifyEmail();
    }, [token, navigate]);

    const getIconAndColor = () => {
        if (status === 200) {
            return { icon: <CheckCircleIcon className="text-green-500 text-4xl" />, color: 'text-green-500', bgStatus: 'bg-green-500' };
        } else {
            return { icon: <AlertCircleIcon className="text-red-500 text-4xl" />, color: 'text-red-500', bgStatus: 'bg-red-500' };
        }
    };

    const { icon, color, bgStatus } = getIconAndColor();

    return (
        <div className="flex justify-center items-center min-h-screen bg-gray-100">
            {showLoader && <Loader />}
            {showContainer && ( 
                <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-lg relative z-10">
                    <div className="flex justify-center items-center">
                        {icon}
                    </div>
                    <h2 className={`text-center text-2xl font-bold mt-4 ${color}`}>{message}</h2>
                    {status === 200 && (
                        <div>
                            <p className="text-center mt-2">Ya puedes iniciar sesión con tu nueva cuenta.</p>
                        </div>
                    )}
                    <div className={`w-full h-2 ${bgStatus} rounded-full absolute bottom-0 left-0 z-0`}>
                        <div className="h-2 bg-white rounded-full transition-all duration-500 ease-in-out" style={{ width: `${timeLeft * 20}%` }}></div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ActivateEmailPage;
