import { useAuthorization } from "@/lib/authorization";
import { PageError, PermissionError } from "../Error";

export function AccessBasedRoute({ access = [], children, allowedRoles = [] }) {
  const {
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
    manage_virtual_account,
    checkAccess,
  } = useAuthorization();

  const permitted =
    allowedRoles.length > 0
      ? checkAccess({ allowedRoles: allowedRoles })
      : true;

  let hasAccess = true;

  if (access) {
    // Iterate through each access requirement in the array
    for (const req of access) {
      switch (req) {
        case "setting":
          hasAccess = hasAccess && setting;
          break;
        case "fund_sweep":
          hasAccess = hasAccess && fund_sweep;
          break;
        case "manage_staff":
          hasAccess = hasAccess && manage_staff;
          break;
        case "view_business":
          hasAccess = hasAccess && view_business;
          break;
        case "manage_business":
          hasAccess = hasAccess && manage_business;
          break;
        case "compliance":
          hasAccess = hasAccess && compliance;
          break;
        case "manage_refund":
          hasAccess = hasAccess && manage_refund;
          break;
        case "manage_payout":
          hasAccess = hasAccess && manage_payout;
          break;
        case "view_audit_log":
          hasAccess = hasAccess && view_audit_log;
          break;
        case "settle_transaction":
          hasAccess = hasAccess && settle_transaction;
          break;
        case "manage_virtual_account":
          hasAccess = hasAccess && manage_virtual_account;
          break;
        default:
          hasAccess = false;
      }
    }
  } else {
    hasAccess = false;
  }

  if (permitted || hasAccess) {
    return children;
  } else if (!hasAccess) {
    return <PermissionError />;
  } else {
    return <PageError />;
  }
}
