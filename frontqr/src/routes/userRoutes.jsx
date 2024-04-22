import { Route, Routes } from "react-router-dom";
import { ProtectedRoute } from '../utils/ProtectedRoute';

import UserHome from '../pages/user/UserHome';
import LayoutUser from "../pages/templates/User/Layout";

export const userRoutes = () => (
 <ProtectedRoute roles={['CLIENT']}>
    <LayoutUser>
      <Routes>
        <Route path="home" element={<UserHome />} />
      </Routes>
    </LayoutUser>
 </ProtectedRoute>
);
