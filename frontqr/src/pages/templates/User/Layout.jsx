import { Outlet } from 'react-router-dom';
import Navbar from './Header';

export default function LayoutUser() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow">
        <Outlet/>
      </main>
    </div>
  );
}
