import { Route, Routes } from "react-router-dom";
import { VirtualAccountAnalytics } from "../components/VirtualAccountsAnalytics";
import { SystemStatistics } from "../components/SystemStatistics";
import { SystemCalculators } from "../components/SystemCalculators";
import { PageError } from "@/components/Element/Error";

export function AnalyticsRoutes() {
  return (
    <Routes>
      <Route index={true} element={<VirtualAccountAnalytics />} />
      <Route path="/virtual-accounts" element={<VirtualAccountAnalytics />} />
      <Route path="/system-stat" element={<SystemStatistics />} />
      <Route path="/system-calculators" element={<SystemCalculators />} />
      <Route path="*" element={<PageError />} />
    </Routes>
  );
}
