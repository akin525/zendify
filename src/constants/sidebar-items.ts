import { ROLES } from "@/lib/authorization";
import { Airdrop, Category, Chart1, Icon, Message, MoneyRemove, MoneySend, Profile, Shop, UserTick, WalletMoney } from "iconsax-react";

interface SidebarItem {
    id?: number;
    name: string;
    icon?: Icon;
    link: string;
    role?: string[];
    permissions?: string[];
    subMenu?: SidebarItem[];
}

export const sidebarItems: SidebarItem[] = [
    { id: 1, name: "Dashboard", icon: Category, link: "/" },
    {
        id: 12, name: "Analytics", icon: Chart1, link: "/analytics", role: [ROLES.admin, ROLES.superadmin],
        subMenu: [
            { name: "Virtual Accounts", link: "/virtual-accounts" },
            { name: "System Statistics", link: "/system-stat" },
            { name: "System Calculator", link: "/system-calculators" },
        ]

    },
    {
        id: 11,
        name: "Businesses",
        icon: Shop,
        link: "/businesses",
        role: [ROLES.admin, ROLES.superadmin],
        // subMenu: [
        //     { name: "Overview", link: "" },
        //     { name: "Business Virtual Accounts", link: "/virtual-accounts" },
        //     { name: "Business Refunds", link: "/refunds" },
        //     { name: "Business Settlements", link: "/settlements" },
        //     { name: "Business Wallet Transactions", link: "/wallet-transactions" },
        // ]
    },
    {
        name: "Transactions",
        icon: WalletMoney,
        link: "/transactions",
        subMenu: [
            { name: "All Transactions", link: "" },
            { name: "Unsettled Transactions", link: "/unsettled" },
            { name: "Refunded Transactions", link: "/refunded" },
            { name: "Resolve Transaction", link: "/resolve" },
        ]
    },
    {
        id: 2,
        name: "Payouts",
        icon: MoneySend,
        link: "/payouts",
        subMenu: [
            { name: "All Payouts", link: "" },
            { name: "Pending Payouts", link: "/pending" },
        ]
    },


    {
        id: 12,
        name: "Refunds", icon: MoneyRemove, link: "/refunds",

    },

    {
        id: 3,
        name: "Virtual Accounts",
        icon: Airdrop,
        link: "/virtual-accounts",
        subMenu: [
            { name: "All Virtual Accounts", link: "" },
            { name: "Unused Assigned Accounts", link: "/unused-assigned" },
            { name: "Unused Unassigned Accounts", link: "/unused-unassigned" },
        ]
    },
   

    {
        id: 10,
        name: "KYC", icon: UserTick, link: "/kyc", permissions: ["compliance"]
    },

    {
        id: 4,
        name: "Email Blacklist", icon: Message, link: "/email-blacklist",
    },

    { id: 9, name: "Profile", icon: Profile, link: "/profile" },
];