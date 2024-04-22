import { Route, Routes, Navigate } from "react-router-dom";
import { ProtectedRoute } from '../utils/ProtectedRoute';

import Dashboard from '../pages/Admin/Dashboard';
import Profile from '../pages/Admin/profile/profilePage';
import App2 from '../pages/tableusers/TableUser';
import LayoutAdmin from "../pages/templates/Admin/Layout";

export const adminRoutes = () => (
 <ProtectedRoute roles={['ADMIN']}>
    <LayoutAdmin>
      <Routes>
        <Route path="/" element={<Navigate to="dashboard" replace />} />
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="profile" element={<Profile />} />
        <Route path="app2" element={<App2 />} />
      </Routes>
    </LayoutAdmin>
 </ProtectedRoute>
);
