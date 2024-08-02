import { Outlet, useLocation } from 'react-router-dom';
import Navbar from './Header';
import StepperQr from '../../../components/UI/utils/stepper';

export default function LayoutUser() {
  const location = useLocation();

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      {location.pathname !== '/user/qr' && location.pathname !== '/user/profile' && location.pathname !== '/pricings' && (
        <div className='mt-10'>
          <StepperQr />
        </div>
      )}
      <main className="flex-grow">
        <Outlet />
      </main>
    </div>
  );
}
