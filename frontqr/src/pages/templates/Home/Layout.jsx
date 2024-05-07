import MenuDrawer from '../../../components/UI/menu/menuDrawer';
import Navbar from './Header';
import { Outlet } from 'react-router-dom';

function LayoutHome() {
    return (
        <div className="flex flex-col min-h-screen relative">
            <Navbar />
            <main className="flex-grow mt-28">
                <Outlet /> 
            </main>
            <MenuDrawer />
        </div>
    );
}

export default LayoutHome;
