import { Route, Routes } from "react-router-dom";
import { AllVirtualAccounts } from "../components/AllVirtualAccounts";
import { UnusedAssignedAccounts } from "../components/UnusedAssignedAccounts";
import { UnusedUnassignedAccounts } from "../components/UnusedUnassignedAccounts";
import { UnusedAssignedProvidusAccounts } from "../components/UnusedAssignedProvidusAccounts";

export function VirtualAccountsRoute() {
  return (
    <Routes>
      <Route path="" element={<AllVirtualAccounts />} />
      <Route path="unused-assigned" element={<UnusedAssignedAccounts />} />
      <Route
        path="unused-assigned-providus"
        element={<UnusedAssignedProvidusAccounts />}
      />
      <Route path="unused-unassigned" element={<UnusedUnassignedAccounts />} />
    </Routes>
  );
}
