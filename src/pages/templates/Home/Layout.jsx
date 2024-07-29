import { Footer } from '../../../components/UI/footer';
import StepperQr from '../../../components/UI/utils/stepper';
import Navbar from './Header';
import { Outlet, useLocation } from 'react-router-dom';

function LayoutHome() {
    const location = useLocation();

    return (
        <div className="flex flex-col min-h-screen relative ">
            <Navbar />
            {location.pathname !== '/login' && location.pathname !== '/register'  && location.pathname !== '/forgotPassword'  && (
                <div className='mt-32'>
                    <StepperQr />
                </div>
            )}
            <main className="flex-grow mt-8">
                <Outlet />
            </main>
            <Footer/>
        </div>
    );
}

export default LayoutHome;
