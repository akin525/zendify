import { Navigate, Route, Routes } from "react-router-dom";
import { Settlements } from "../components/Settlements";
import { RoleBasedRoute } from "@/components/Element/RoleBasedRoute";
import { ROLES } from "@/lib/authorization";

export function SettlementsRoute() {
  return (
    <Routes>
      <Route
        path=""
        element={
          <RoleBasedRoute allowedRoles={[ROLES.admin, ROLES.superadmin]}>
            <Settlements />
          </RoleBasedRoute>
        }
      />
      <Route path="*" element={<Navigate to="." />} />
    </Routes>
  );
}
