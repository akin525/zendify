import { useAuthorization } from "@/lib/authorization";
import {
  ArrowDown2,
  ArrowLeft,
  ArrowRight2,
  LogoutCurve,
  MessageProgramming,
  // Moneys,
} from "iconsax-react";
import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { ROLES } from "@/lib/authorization";
import {
  Airdrop,
  Category,
  Chart1,
  Icon,
  Message,
  MoneyRemove,
  MoneySend,
  Profile,
  Shop,
  UserTick,
  WalletMoney,
} from "iconsax-react";

interface SidebarItem {
  id?: number;
  name: string;
  icon?: Icon;
  link: string;
  role?: string[];
  permissions?: string[];
  subMenu?: SidebarItem[];
}

export const Sidebar = ({
  isOpen,
  toggleSidebar,
}: {
  isOpen: boolean;
  toggleSidebar: () => void;
}) => {
  const {
    checkAccess,
    // compliance,
    setting,
    manage_refund,
    // manage_business,
    manage_virtual_account,
    fund_sweep,
  } = useAuthorization();

  const sidebarItems: SidebarItem[] = [
    { id: 1, name: "Dashboard", icon: Category, link: "/" },
    checkAccess({ allowedRoles: [ROLES.admin, ROLES.superadmin] }) && {
      id: 12,
      name: "Analytics",
      icon: Chart1,
      link: "/analytics",
      subMenu: [
        { name: "Virtual Accounts", link: "/virtual-accounts" },
        { name: "System Statistics", link: "/system-stat" },
        { name: "System Calculator", link: "/system-calculators" },
      ],
    },

    {
      name: "Transactions",
      icon: WalletMoney,
      link: "/transactions",
      subMenu: [
        checkAccess({ allowedRoles: [ROLES.admin, ROLES.superadmin] }) && {
          name: "All Transactions",
          link: "",
        },
        checkAccess({ allowedRoles: [ROLES.admin, ROLES.superadmin] }) && {
          name: "Unsettled Transactions",
          link: "/unsettled",
        },
        checkAccess({ allowedRoles: [ROLES.admin, ROLES.superadmin] }) && {
          name: "Refunded Transactions",
          link: "/refunded",
        },
        { name: "Resolve Transaction", link: "/resolve" },
        checkAccess({ allowedRoles: [ROLES.admin, ROLES.superadmin] }) && {
          name: "Wallet Transactions",
          link: "/wallet",
        },
      ],
    },
    checkAccess({ allowedRoles: [ROLES.admin, ROLES.superadmin] }) && {
      id: 2,
      name: "Payouts",
      icon: MoneySend,
      link: "/payouts",
      subMenu: [
        { name: "All Payouts", link: "" },
        { name: "Pending Payouts", link: "/pending" },
      ],
    },

    checkAccess({ allowedRoles: [ROLES.admin, ROLES.superadmin] }) &&
      manage_refund && {
        id: 12,
        name: "Refunds",
        icon: MoneySend,
        link: "/refunds",
      },

    checkAccess({ allowedRoles: [ROLES.admin, ROLES.superadmin] }) && {
      name: "Settlements",
      icon: WalletMoney,
      link: "/settlements",
    },

    { id: 15, name: "My Businesses", icon: Shop, link: "/my-businesses" },
    checkAccess({ allowedRoles: [ROLES.admin, ROLES.superadmin] }) && {
      id: 11,
      name: "Businesses",
      icon: Shop,
      link: "/businesses",
    },

    (checkAccess({ allowedRoles: [ROLES.admin, ROLES.superadmin] }) ||
      manage_virtual_account) && {
      id: 3,
      name: "Virtual Accounts",
      icon: Airdrop,
      link: "/virtual-accounts",
      subMenu: [
        { name: "All Virtual Accounts", link: "" },
        { name: "Unused Assigned Accounts", link: "/unused-assigned" },
        {
          name: "Unused Assigned Providus Accounts",
          link: "/unused-assigned-providus",
        },
        { name: "Unused Unassigned Accounts", link: "/unused-unassigned" },
      ],
    },

    // checkAccess({ allowedRoles: [ROLES.admin, ROLES.superadmin] }) && {
    //   id: 17,
    //   name: "POS",
    //   icon: Moneys,
    //   link: "/terminal",
    //   subMenu: [
    //     { name: "Terminals", link: "" },
    //     { name: "Transactions Cashout", link: "/terminal-transaction" },
    //     {
    //       name: "PayAttitude Deposit",
    //       link: "/daily-report",
    //     },
    //   ],
    // },
    // checkAccess({ allowedRoles: [ROLES.admin, ROLES.superadmin] }) && {
    //   id: 18,
    //   name: "Cashier Process",
    //   icon: Moneys,
    //   link: "",
    //   subMenu: [
    //     { name: "Cashier Deposit", link: "/cashierdeposit" },
    //     { name: "Cashier Payout ", link: "/cashierpayout" },
    //   ],
    // },
    checkAccess({ allowedRoles: [ROLES.admin, ROLES.superadmin] }) && {
      id: 19,
      name: "Staff",
      icon: Profile,
      link: "",
      subMenu: [
        { name: "All Staff", link: "/staff" },
      ],
    },

    checkAccess({ allowedRoles: [ROLES.admin, ROLES.superadmin] }) && {
      id: 17,
      name: "Send Email",
      icon: MessageProgramming,
      link: "/send-email",
    },

    fund_sweep && {
      id: 12,
      name: "Sweep Account",
      icon: MoneyRemove,
      link: "/sweep-account",
    },
    checkAccess({ allowedRoles: [ROLES.admin, ROLES.superadmin] }) && {
      id: 10,
      name: "Compliance",
      icon: UserTick,
      link: "/compliance",
      subMenu: [
        // { name: "KYC", link: "/compliance" },
        { name: "Approved KYC", link: "/approved" },
        { name: "Pending KYC", link: "/business-pending-kyc" },
      ],
    },

    // compliance && {
    //   id: 10,
    //   name: "Compliance",
    //   icon: UserTick,
    //   link: "/compliance",
    // },


    setting && {
      id: 4,
      name: "Email Blacklist",
      icon: Message,
      link: "/email-blacklist",
    },
    { id: 9, name: "Profile", icon: Profile, link: "/profile" },
  ].filter(Boolean) as SidebarItem[];

  const navigate = useNavigate();

  const [showMenuID, setShowMenuID] = useState<null | number>(null);

  const handleShowSubMenu = (event, id) => {
    if (event) {
      event.preventDefault();
      event.stopPropagation();
    }
    if (showMenuID !== id) {
      setShowMenuID(id);
    } else {
      setShowMenuID(null);
    }
  };

  return (
    <>
      {isOpen && (
        <div
          className="fixed z-[100] h-screen w-screen bg-neutral-700/40 lg:hidden"
          onClick={toggleSidebar}
        ></div>
      )}

      <div
        className={`fixed top-0  flex h-full w-[264px] select-none flex-col justify-between overflow-hidden border-r bg-white text-primary transition-all duration-300 dark:border-neutral-700 dark:bg-neutral-900 ${
          isOpen ? "left-0 z-[100]" : "-left-[264px] shadow-lg lg:left-0"
        }`}
      >
        <div className="flex shrink-0 items-center justify-between p-3">
          <div className="h-[40px] w-max">
            <img src="/xendify.jpg" alt="" className="h-full w-auto" />
          </div>

          <div onClick={() => toggleSidebar()}>
            <ArrowLeft
              size="32"
              className="rounded-full py-2 text-neutral-500 hover:bg-primary/20 hover:text-primary dark:text-neutral-100 lg:hidden"
            />
          </div>
        </div>

        <ul className="sidebar-nav flex h-full w-full flex-col gap-3 overflow-hidden overflow-y-auto p-3 text-neutral-700 dark:text-neutral-400">
          {sidebarItems.map((item, index) => (
            <li key={index}>
              <NavLink
                to={item.link}
                onClick={(e) => {
                  // toggleSidebar();
                  item?.subMenu
                    ? handleShowSubMenu(e, item.id)
                    : toggleSidebar();
                }}
                className="flex h-10 w-full items-center justify-between gap-3 rounded-lg pl-2 text-sm hover:bg-neutral-100 hover:font-bold hover:text-primary dark:hover:bg-neutral-800"
              >
                {({ isActive }) => (
                  <>
                    <div className="flex items-center gap-3 ">
                      <item.icon
                        size="24"
                        className={`${isActive ? "text-primary" : ""}`}
                        variant="Outline"
                      />

                      <p
                        className={
                          isActive ? "font-bold text-primary" : "font-medium"
                        }
                      >
                        {item.name}
                      </p>
                    </div>

                    {item?.subMenu && (
                      <div
                        onClick={(e) => {
                          handleShowSubMenu(e, item.id);
                        }}
                        className=""
                      >
                        {showMenuID === item.id ? (
                          <ArrowDown2
                            size="20"
                            variant="Bold"
                            className={`${isActive ? "text-primary" : ""}`}
                          />
                        ) : (
                          <ArrowRight2
                            size="20"
                            variant="Bold"
                            className={`${isActive ? "text-primary" : ""}`}
                          />
                        )}
                      </div>
                    )}
                  </>
                )}
              </NavLink>

              {item?.id === showMenuID &&
                item?.subMenu?.map((subItem, index) => {
                  if (subItem) {
                    return (
                      <ul className="pl-8" key={`${index} + ${subItem.name}`}>
                        <li
                          key={index}
                          className="rounded-lg px-4 py-2 text-sm text-neutral-700 hover:bg-neutral-100  hover:font-bold hover:text-primary dark:text-neutral-400 dark:hover:bg-neutral-800"
                        >
                          <NavLink
                            to={item.link + subItem.link}
                            onClick={toggleSidebar}
                            end
                          >
                            {({ isActive }) => (
                              <p
                                className={
                                  isActive
                                    ? "font-bold text-primary"
                                    : "font-medium"
                                }
                              >
                                {subItem.name}
                              </p>
                            )}
                          </NavLink>
                        </li>
                      </ul>
                    );
                  }
                })}
            </li>
          ))}

          {/* <li
            className="flex h-10 w-full cursor-pointer items-center gap-3 rounded-lg pl-2 text-red-500 hover:bg-red-500/15 hover:font-bold"
            onClick={() => {
              localStorage.clear();
              sessionStorage.clear();
              navigate("/login", { replace: true });
            }}
          >
            <LogoutCurve size="24" />
            <p className={"font-medium"}>Logout</p>
          </li> */}
        </ul>

        <div className="flex w-full flex-col gap-4 border-t p-2  text-neutral-700 dark:border-neutral-800 dark:text-neutral-400">
          <div
            className="flex h-10  w-full shrink-0 cursor-pointer items-center gap-3 rounded-lg px-3 text-sm text-red-500 hover:bg-red-500/15 hover:font-bold"
            onClick={() => {
              sessionStorage.removeItem("paylony_staff_token");
              navigate("/login", { replace: true });
            }}
          >
            <LogoutCurve size="20" />
            <p className={"font-medium"}>Logout</p>
          </div>
        </div>
      </div>
    </>
  );
};
