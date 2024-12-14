import { useUser } from "@/hooks/useUser";
import * as React from "react";

export enum ROLES {
  superadmin = "superadmin",
  admin = "admin",
  staff = "staff",
}

type RoleTypes = keyof typeof ROLES;

type AuthorizationProps = {
  forbiddenFallback?: React.ReactNode;
  children: React.ReactNode;
} & (
  | {
      allowedRoles: RoleTypes[];
      policyCheck?: never;
    }
  | {
      allowedRoles?: never;
      policyCheck: boolean;
    }
);

export const useAuthorization = () => {
  const { user } = useUser();

  const checkAccess = React.useCallback(
    ({ allowedRoles }: { allowedRoles: RoleTypes[] }) => {
      if (allowedRoles && allowedRoles.length > 0) {
        return allowedRoles?.includes(user.role);
      }

      return true;
    },
    [user.role],
  );

  // console.log(checkAccess({ allowedRoles: ["admin"] }));

  const setting = user?.setting === 1 ? true : false;

  const fund_sweep = user?.fund_sweep === 1 ? true : false;

  const manage_staff = user?.manage_staff === 1 ? true : false;

  const view_business = user?.view_business === 1 ? true : false;

  const manage_business = user?.manage_business === 1 ? true : false;

  const compliance = user?.compliance === 1 ? true : false;

  const manage_refund = user?.manage_refund === 1 ? true : false;

  const manage_payout = user?.manage_payout === 1 ? true : false;

  const view_audit_log = user?.view_audit_log === 1 ? true : false;

  const settle_transaction = user?.settle_transaction === 1 ? true : false;
  
  const manage_virtual_account = user?.manage_virtual_account === 1 ? true : false;

  return {
    checkAccess,
    role: user.role,
    setting,
    manage_staff,
    view_business,
    manage_business,
    compliance,
    manage_refund,
    manage_payout,
    view_audit_log,
    settle_transaction,
    fund_sweep,
    manage_virtual_account
  };
};

export const Authorization = ({
  policyCheck,
  allowedRoles,
  forbiddenFallback = null,
  children,
}: AuthorizationProps) => {
  const { checkAccess } = useAuthorization();

  let canAccess = false;

  if (allowedRoles) {
    canAccess = checkAccess({ allowedRoles });
  }

  if (typeof policyCheck !== "undefined") {
    canAccess = policyCheck;
  }

  return <>{canAccess ? children : forbiddenFallback}</>;
};
