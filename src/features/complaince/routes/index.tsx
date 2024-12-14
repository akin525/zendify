// import { ComingSoon } from "@/components/Element";
import { Route, Routes } from "react-router-dom";
import { BusinessKYCRequests } from "./BusinessKYCRequests";
import { BusinessKYCDetails } from "./BusinessKYCDetails";
import { BusinessKYC } from "./BusinessKYC";
// import { BusinessKYCDetails } from "./BusinessKYCDetails";

export function ComplianceRoutes() {
  return (
    <Routes>
      <Route path="*" element={<BusinessKYCRequests />} />
      <Route path="/approved" element={<BusinessKYC />} />
      <Route path="/business-pending-kyc" element={<BusinessKYCRequests />} />
      <Route
        path="/business-kyc-details/:id"
        element={<BusinessKYCDetails />}
      />
    </Routes>
  );
}
