import { Navigate, Route, Routes } from "react-router-dom";
import { ForgotPassword } from "../components/ForgotPassword";
import { Login } from "../components/Login";

export const AuthRoutes = () => {
  return (
    <Routes>
      <Route path="forgot-password" element={<ForgotPassword />} />
      <Route path="login" element={<Login />} />
      <Route path="*" element={<Navigate to="/login" />} />
    </Routes>
  );
};
