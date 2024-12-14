import { Navigate, Route, Routes } from "react-router-dom";
import { UnsettledTransactions } from "../components/UnsettledTransaction";
import { AllTransactions } from "../components/AllTransactions";
import { RefundedTransactions } from "../components/RefundedTransactions";
import { ResolveTransaction } from "../components/ResolveTransaction";
import { WalletTransactions } from "..";
import { RoleBasedRoute } from "@/components/Element/RoleBasedRoute";
import { ROLES } from "@/lib/authorization";

export const TransactionsRoutes = () => {
  return (
    <Routes>
      <Route
        path=""
        element={
          <RoleBasedRoute allowedRoles={[ROLES.admin, ROLES.superadmin]}>
            <AllTransactions />
          </RoleBasedRoute>
        }
      />
      <Route
        path="unsettled"
        element={
          <RoleBasedRoute allowedRoles={[ROLES.admin, ROLES.superadmin]}>
            <UnsettledTransactions />
          </RoleBasedRoute>
        }
      />
      <Route
        path="refunded"
        element={
          <RoleBasedRoute allowedRoles={[ROLES.admin, ROLES.superadmin]}>
            <RefundedTransactions />
          </RoleBasedRoute>
        }
      />
      <Route path="resolve" element={<ResolveTransaction />} />
      <Route
        path="wallet"
        element={
          <RoleBasedRoute allowedRoles={[ROLES.admin, ROLES.superadmin]}>
            <WalletTransactions />
          </RoleBasedRoute>
        }
      />
      <Route path="*" element={<Navigate to="." />} />
    </Routes>
  );
};
