import { Routes, Route } from "react-router-dom";
import { ProtectedRoute } from '../utils/ProtectedRoute'; // Import the enhanced component
import { publicRoutes } from './publicRoutes';
import { userRoutes } from './userRoutes';
import { adminRoutes } from './adminRoutes'; // Import the admin routes function
import NotFoundPage from "../pages/NotFoundPage";
import { useLoader } from '../context/LoaderContext';
import Loader from '../components/UI/loader/Loader';

const AppRoutes = () => {
    const { isLoading } = useLoader();
    return (
        <>
            <Routes>
                {/* Render admin routes using the adminRoutes function */}
                <Route path="/admin/*" element={adminRoutes()} />
                <Route path="/user/*" element={userRoutes()} />
                {publicRoutes()}
                <Route path="*" element={<NotFoundPage />} />
            </Routes>
            {isLoading && <Loader />}
        </>
    );
};

export default AppRoutes;
