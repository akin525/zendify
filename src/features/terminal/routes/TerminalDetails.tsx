import { useTerminalDashboard } from "../api/useTerminal";
import { useEffect, useState } from "react";
import { Outlet, useLocation, useNavigate, useParams } from "react-router-dom";
import { SyncLoader } from "react-spinners";

const terminalTabs = [
  {
    id: 1,
    name: "Dashboard",
    path: "dashboard",
  },
  {
    id: 2,
    name: "Transactions",
    path: "transactions",
  },
  {
    id: 3,
    name: "Daily Report",
    path: "daily-report",
  },
  {
    id: 4,
    name: "Configure",
    path: "configure",
  },
];

export default function TerminalDetails() {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const { id } = useParams();
  const { data, isPending, isError } = useTerminalDashboard({
    id,
    config: { enabled: !!id },
  });

  const [activeTab, setActiveTab] = useState(pathname.split("/")[3] || "");

  // Automatically navigate to the dashboard if no tab is active
  useEffect(() => {
    if (!activeTab) {
      navigate("dashboard");
    }
  }, [activeTab, navigate]);

  useEffect(() => {
    setActiveTab(pathname.split("/")[3] || "");
  }, [pathname]);

  return (
      <>
        {isPending ? (
            <div className="container flex min-h-[calc(100vh-150px)] items-center justify-center py-20">
              <SyncLoader size={14} color="#854FFF" />
            </div>
        ) : (
            !isError &&
            data && (
                <>
                  <h1 className="py-4 text-3xl font-bold uppercase text-primary">
                    {data?.data?.name}
                  </h1>

                  <div className="container flex flex-wrap items-center gap-4 py-2 dark:border-neutral-700">
                    {terminalTabs.map((tab) => (
                        <div
                            onClick={() => navigate(tab?.path)}
                            key={tab.name}
                            className={`${
                                activeTab === tab.path ? "bg-primary/10" : " "
                            } flex min-h-8 min-w-[120px] cursor-pointer select-none items-center justify-center rounded-lg px-4 text-xs transition-all duration-300 hover:text-primary`}
                        >
                          <p
                              className={`${
                                  activeTab === tab.path
                                      ? " font-semibold text-primary"
                                      : "font-medium text-neutral-500 dark:text-neutral-300"
                              }`}
                          >
                            {tab.name}
                          </p>
                        </div>
                    ))}
                  </div>

                  {/* Outlet renders the selected tab's content */}
                  <Outlet />
                </>
            )
        )}
      </>
  );
}
