import { Outlet } from "react-router-dom";
import { PageError } from "../Error";
import { ROLES, useAuthorization } from "@/lib/authorization";

export function RoleBasedRoute({
  allowedRoles,
  children,
}: {
  allowedRoles: ROLES[];
  children?: React.ReactNode;
}) {
  const { checkAccess } = useAuthorization();

  if (checkAccess({ allowedRoles: allowedRoles })) {
    if (children) return children;

    return <Outlet />;
  }

  return <PageError />;
}
