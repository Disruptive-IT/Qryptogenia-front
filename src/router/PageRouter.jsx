import { Navigate, Route, Routes } from "react-router-dom";
import Dashboard from "../pages/Admin/Dashboard";
import Profile from "../../src/components/Admin/profile/profilePage";
import LoginForm from "../pages/Auth/LoginForm";
import HomePage from "../pages/HomePage";
import ProtectedRouteAdmin from "./ProtectedRouteAdmin";
import ProtectedRouteClient from "./ProtectedRouteClient";
import ProtectedRoutePublic from "./ProtectedRoutePublic";
import LayoutHome from "../pages/templates/Home/Layout";
import RegisterForm from "../pages/Auth/RegisterForm";
import NotFoundPage from "../pages/NotFoundPage";
import { RecoverPassForm } from "../pages/Auth/RecoverPassPage";
import { ForgotPassForm } from "../pages/Auth/ForgotPassPage";
import LayoutAdmin from "../pages/templates/Admin/Layout";
import UserTable from "../components/tableusers/TableUser"
import LayoutUser from "../pages/templates/User/Layout";
import { useLoader } from '../context/LoaderContext';
import Loader from '../components/UI/loader/Loader';
import AppContent from "../pages/AppContent";
import App from "../components/UI/tables/app";
import { useAuthContext } from "../context/AuthContext";
import WebLinkPhoneStorePage from "../components/Layout/viewsQr/webLinkPhoneStorePage"
import {WebLinkPhoneMusicPage, WebLinkPhoneSocialPage} from "../components/Layout/viewsQr/WebLinkPhoneMusicPage";
import QRScanPage from "../pages/QRScanPage";

export const PageRouter = () => {
    const { isLoading } = useLoader();
    const { user } = useAuthContext();

    return (
        <>
            <Routes>
                {/* Home Routes */}
                <Route path="/" element={<LayoutHome />}>
                    <Route index element={<HomePage />} />
                    <Route path="login" element={user ? <Navigate to="/user/home" replace /> : <LoginForm />} />
                    <Route path="register" element={user ? <Navigate to="/user/home" replace /> : <RegisterForm />} />
                    <Route path="recoverPassword" element={user ? <Navigate to="/user/home" replace /> : <RecoverPassForm />} />
                    <Route path="forgotPassword" element={user ? <Navigate to="/user/home" replace /> : <ForgotPassForm />} />
                    
                </Route>

                <Route path="/qr/:contentName" element={user ? <LayoutUser /> : <LayoutHome />}>
                    <Route index element={<AppContent />} />
                </Route>

                <Route path="/edit/:contentName/:id" element={user ? <LayoutUser /> : <LayoutHome />}>
                    <Route index element={<AppContent />} />
                </Route>

                <Route path="music/:id" element={<WebLinkPhoneMusicPage/>} />
                <Route path="social/:id" element={<WebLinkPhoneSocialPage/>} />
                <Route path="store/:id" element={<WebLinkPhoneStorePage/>} />
                <Route path="qr/scan" element={<QRScanPage />} /> 
                
                {/* Admin Routes */}
                <Route path="/admin" element={<ProtectedRouteAdmin />}>
                    <Route element={<LayoutAdmin />}>
                        <Route path="dashboard" element={<Dashboard />} />
                        <Route path="profile" element={<Profile />} />
                        <Route path="users" element={<UserTable />} />
                    </Route>
                </Route>

                {/* User Routes */}
                <Route path="/user" element={<ProtectedRouteClient />}>
                    <Route element={<LayoutUser />}>
                        <Route index element={<HomePage />} />
                        <Route path="home" element={<HomePage />} />
                        <Route path="profile" element={<Profile />} />
                        <Route path="qr" element={<App />} />      
                    </Route>
                </Route>

                {/* 404 Route */}
                <Route path="*" element={<NotFoundPage />} />
            </Routes>
            {isLoading && <Loader />}
        </>
    )
}