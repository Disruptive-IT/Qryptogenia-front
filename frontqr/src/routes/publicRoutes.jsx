import { Route, Navigate } from "react-router-dom";
import HomePage from '../pages/HomePage';
import LoginForm from "../pages/Auth/LoginForm";
import RegisterForm from '../pages/Auth/RegisterForm';
import ActivateEmailPage from '../pages/Auth/ActivateEmailPage';
import LayoutHome from '../pages/templates/Home/Layout';
import NotFoundPage from '../pages/NotFoundPage';
import { RecoverPassForm } from '../pages/Auth/RecoverPassPage';
import { ForgotPassForm } from "../pages/Auth/ForgotPassPage";

export const publicRoutes = () => (
    <Route path="/" element={<LayoutHome />}>
        <Route index element={<Navigate to="/home" replace />} />
        <Route path="home" element={<HomePage />} />
        <Route path="login" element={<LoginForm />} />
        <Route path="register" element={<RegisterForm />} />
        <Route path="verification" element={<ActivateEmailPage />} />
        <Route path="not" element={<NotFoundPage />} />
        <Route path="recoverPassword/:id/:token" element={<RecoverPassForm />} />
        <Route path="forgotPassword" element={<ForgotPassForm />} />   
    </Route>
);
