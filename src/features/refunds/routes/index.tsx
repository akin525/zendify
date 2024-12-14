import { Route, Routes } from "react-router-dom";
import { AllRefunds } from "../components/AllRefunds";

export function RefundsRoutes() {
  return (
    <Routes>
      <Route path="" element={<AllRefunds />} />
    </Routes>
  );
}
