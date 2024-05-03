import { Navigate, Route, Router, Routes } from "react-router-dom";
import Dashboard from "../pages/Admin/Dashboard";
import Profile from "../pages/Admin/profile/profilePage";
import LoginForm from "../pages/Auth/LoginForm";
import HomePage from "../pages/HomePage";
import UserHome from "../pages/user/UserHome";
import ProtectedRouteAdmin from "./ProtectedRouteAdmin";
import ProtectedRouteClient from "./ProtectedRouteClient";
import ProtectedRoutePublic from "./ProtectedRoutePublic";
import LayoutHome from "../pages/templates/Home/Layout";
import RegisterForm from "../pages/Auth/RegisterForm";
import NotFoundPage from "../pages/NotFoundPage";
import { RecoverPassForm } from "../pages/Auth/RecoverPassPage";
import { ForgotPassForm } from "../pages/Auth/ForgotPassPage";
import LayoutAdmin from "../pages/templates/Admin/Layout";
import App2 from "../pages/tableusers/TableUser";
import LayoutUser from "../pages/templates/User/Layout";
import { useLoader } from '../context/LoaderContext';
import Loader from '../components/UI/loader/Loader';

export const PageRouter = () => {
    const { isLoading } = useLoader();

    return (
        <>
            <Routes>
                {/* Home Routes */}

                <Route path="/" element={<ProtectedRoutePublic />}>
                    <Route element={<LayoutHome />}>
                        <Route index element={<Navigate to="/home" replace />} />
                        <Route path="home" element={<HomePage />} />
                        <Route path="login" element={<LoginForm />} />
                        <Route path="register" element={<RegisterForm />} />
                        <Route path="recoverPassword" element={<RecoverPassForm />} />
                        <Route path="forgotPassword" element={<ForgotPassForm />} />
                    </Route>
                </Route>

                {/* Admin Routes */}
                <Route path="/admin" element={<ProtectedRouteAdmin />}>
                    <Route element={<LayoutAdmin />}>
                        <Route path="dashboard" element={<Dashboard />} />
                        <Route path="profile" element={<Profile />} />
                        <Route path="app2" element={<App2 />} />
                    </Route>
                </Route>

                {/* User Routes */}
                <Route path="/user" element={<ProtectedRouteClient />}>
                    <Route element={<LayoutUser />}>
                        <Route index element={<Navigate to="/home" replace />} />
                        <Route path="home" element={<UserHome />} />
                    </Route>
                </Route>

                <Route path="*" element={<NotFoundPage />} />
            </Routes>
            {isLoading && <Loader />}
        </>
    )
}