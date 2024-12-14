import { Route, Routes } from "react-router-dom";
import { AllPayouts } from "../components/AllPayouts";
import { PendingPayouts } from "../components/PendingPayouts";

export function PayoutsRoutes() {
  return (
    <Routes>
      <Route path="" element={<AllPayouts />} />
      <Route path="pending" element={<PendingPayouts />} />
    </Routes>
  );
}
