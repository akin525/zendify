import { AccessBasedRoute } from "@/components/Element/AccessBasedRoute";
import { ErrorBoundary, PageError } from "@/components/Element/Error";
import { RoleBasedRoute } from "@/components/Element/RoleBasedRoute";
import { ContentLayout } from "@/components/Layout";
// import { SendEmailRoutes } from "@/features/send-email";
// import { SweepAccount } from "@/features/sweep-account";
// import { Profile } from "@/features/profile";
import { ROLES } from "@/lib/authorization";
import { lazyImport } from "@/utils/lazyImport";

const { Profile } = lazyImport(() => import("@/features/profile"), "Profile");
const {Cashier} = lazyImport(()=> import("@/features/cashier"), "Cashier",);
const {Cashierpayout}=lazyImport(()=> import("@/features/cashierpayout"), "Cashierpayout",);
const {Staff}=lazyImport(()=> import("@/features/staffs"), "Staff",);
const { SweepAccount } = lazyImport(
    () => import("@/features/sweep-account"),
    "SweepAccount",
);
const { TerminalRoutes } = lazyImport(
    () => import("@/features/terminal"),
    "TerminalRoutes",
);

const { Business } = lazyImport(
    () => import("@/features/businesses"),
    "Business",
);
const { AnalyticsRoutes } = lazyImport(
    () => import("@/features/analytics"),
    "AnalyticsRoutes",
);
const { SendEmailRoutes } = lazyImport(
    () => import("@/features/send-email"),
    "SendEmailRoutes",
);

const { VirtualAccountsRoute } = lazyImport(
    () => import("@/features/virtual-accounts"),
    "VirtualAccountsRoute",
);
const { SettlementsRoute } = lazyImport(
    () => import("@/features/settlements"),
    "SettlementsRoute",
);

const { PayoutsRoutes } = lazyImport(
    () => import("@/features/payouts"),
    "PayoutsRoutes",
);

const { MyBusinessRoutes } = lazyImport(
    () => import("@/features/my-business"),
    "MyBusinessRoutes",
);

const { BusinessesRoutes } = lazyImport(
    () => import("@/features/businesses"),
    "BusinessesRoutes",
);

const { ComplianceRoutes } = lazyImport(
    () => import("@/features/complaince"),
    "ComplianceRoutes",
);

const { Home } = lazyImport(() => import("@/features/home"), "Home");

const { TransactionsRoutes } = lazyImport(
    () => import("@/features/transactions"),
    "TransactionsRoutes",
);

const { RefundsRoutes } = lazyImport(
    () => import("@/features/refunds"),
    "RefundsRoutes",
);

const { EmailBlacklist } = lazyImport(
    () => import("@/features/email-blacklist"),
    "EmailBlacklist",
);

export const protectedRoutes = [
  {
    path: "/",
    element: <ContentLayout />,
    ErrorBoundary: ErrorBoundary,
    children: [
      { path: "/", element: <Home /> },
      { path: "profile", element: <Profile /> },
      { path: "staff", element: <Staff /> },
      { path: "cashierdeposit", element: <Cashier /> },
      { path: "cashierpayout", element: <Cashierpayout /> },
      { path: "transactions/*", element: <TransactionsRoutes /> },
      { path: "settlements/*", element: <SettlementsRoute /> },
      { path: "my-businesses/*", element: <MyBusinessRoutes /> },

      {
        path: "sweep-account",
        element: (
            <AccessBasedRoute access={["fund_sweep"]}>
              <SweepAccount />
            </AccessBasedRoute>
        ),
      },

      {
        path: "payouts/*",
        element: (
            <RoleBasedRoute allowedRoles={[ROLES.admin, ROLES.superadmin]}>
              <PayoutsRoutes />
            </RoleBasedRoute>
        ),
      },

      {
        path: "compliance/*",
        element: (
            <AccessBasedRoute access={["compliance"]}>
              <ComplianceRoutes />
            </AccessBasedRoute>
        ),
      },
      {
        path: "virtual-accounts/*",
        element: (
            <>
              <AccessBasedRoute
                  access={["manage_virtual_account"]}
                  allowedRoles={[ROLES.admin, ROLES.superadmin]}
              >
                <VirtualAccountsRoute />
              </AccessBasedRoute>
            </>
        ),
      },
      {
        path: "terminal/*",
        element: (
            <>
              <AccessBasedRoute
                  // access={["manage_virtual_account"]}
                  allowedRoles={[ROLES.admin, ROLES.superadmin]}
              >
                <TerminalRoutes />
              </AccessBasedRoute>
            </>
        ),
      },

      {
        path: "email-blacklist",
        element: (
            <AccessBasedRoute access={["setting"]}>
              <EmailBlacklist />
            </AccessBasedRoute>
        ),
      },

      {
        path: "business/:nameId",
        element: <Business />,
      },
      {
        path: "send-email/*",
        element: (
            <RoleBasedRoute allowedRoles={[ROLES.admin, ROLES.superadmin]}>
              <SendEmailRoutes />
            </RoleBasedRoute>
        ),
      },

      {
        path: "businesses/*",
        element: (
            <RoleBasedRoute allowedRoles={[ROLES.admin, ROLES.superadmin]}>
              <BusinessesRoutes />
            </RoleBasedRoute>
        ),
      },

      {
        path: "refunds/*",
        element: (
            <RoleBasedRoute allowedRoles={[ROLES.admin, ROLES.superadmin]} />
        ),
        children: [
          {
            path: "*",
            element: (
                <AccessBasedRoute access={["manage_refund"]}>
                  <RefundsRoutes />
                </AccessBasedRoute>
            ),
          },
        ],
      },

      {
        path: "analytics/*",
        element: (
            <RoleBasedRoute allowedRoles={[ROLES.admin, ROLES.superadmin]} />
        ),
        children: [{ path: "*", element: <AnalyticsRoutes /> }],
      },
      { path: "*", element: <PageError /> },
    ],
  },
];
