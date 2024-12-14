// import { ComingSoon } from "@/components/Element";
import { Navigate, Route, Routes } from "react-router-dom";
import { SendEmail } from "./SendEmail";

export function SendEmailRoutes() {
  return (
    <Routes>
      <Route path="/" element={<SendEmail />} />
      <Route path="*" element={<Navigate to="." />} />
    </Routes>
  );
}
