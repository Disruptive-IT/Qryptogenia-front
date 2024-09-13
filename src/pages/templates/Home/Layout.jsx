import { Footer } from '../../../components/UI/footer';
import StepperQr from '../../../components/UI/utils/stepper';
import Navbar from './Header';
import { Outlet, useLocation } from 'react-router-dom';

function LayoutHome() {
    const location = useLocation();

    return (
        <div className="flex flex-col h-sreen  w-full bg-slate-200 ">
            {location.pathname !== '/login' && location.pathname !== '/register'  && location.pathname !== '/forgotPassword' && location.pathname !== '/pricings' && (
                <Navbar />
            )}
            {location.pathname !== '/login' && location.pathname !== '/register'  && location.pathname !== '/forgotPassword' && location.pathname !== '/pricings'  && (
                <div className='mt-10'>
                    <StepperQr />
                </div>
            )}
            <main className=" ">
                <Outlet />
            </main>
            {location.pathname !== '/login' && location.pathname !== '/register'  && location.pathname !== '/forgotPassword' && location.pathname !== '/pricings' && (
                <Footer/>

            )}
        </div>
    );
}

export default LayoutHome;
