
import Navbar from './Header';
import { Outlet } from 'react-router-dom';

function LayoutHome() {
    return (
        <div className="flex flex-col min-h-screen">
            <Navbar />
            <main className="flex-grow mt-28">
                <Outlet /> 
            </main>
        </div>
    );
}

export default LayoutHome;
