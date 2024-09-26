import { Footer } from '../../../components/UI/footer';
import StepperQr from '../../../components/UI/utils/stepper';
import Navbar from './Header';
import { Outlet, useLocation } from 'react-router-dom';

function LayoutHome() {
    const location = useLocation();

    return (
        <div className="flex flex-col h-sreen  w-full bg-slate-200 ">
            {location.pathname !== '/login' && location.pathname !== '/register'  && location.pathname !== '/forgotPassword' && location.pathname !== '/pricings' && location.pathname !== '/recoverPassword' && (
                <Navbar />
            )}
            {location.pathname !== '/user/qr' && location.pathname !== '/user/profile' &&  location.pathname !== '/login' && location.pathname !== '/register'  && location.pathname !== '/forgotPassword' && location.pathname !== '/pricings' && location.pathname !== '/recoverPassword' && (
                <div className='mt-10'>
                    <StepperQr />
                </div>
            )}
            <main className=" ">
                <Outlet />
            </main>
            {location.pathname !== '/login' && location.pathname !== '/register'  && location.pathname !== '/forgotPassword' && location.pathname !== '/pricings' && location.pathname !== '/recoverPassword' &&(
                <Footer/>

            )}
        </div>
    );
}

export default LayoutHome;
