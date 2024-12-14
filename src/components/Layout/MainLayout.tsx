import { useUser } from "@/hooks/useUser";
import { HambergerMenu, User } from "iconsax-react";
import { Suspense } from "react";
import { Link, Outlet } from "react-router-dom";
import { BeatLoader } from "react-spinners";
import { ThemeSwitcher } from "../Element";

export const MainLayout = ({
  toggleSidebar,
}: {
  toggleSidebar: () => void;
}) => {
  const { user } = useUser();

  // const { pathname } = useLocation();

  // const headerName = pathname
  //   .split("/")[1]
  //   .toLowerCase()
  //   .replace(/^\w/, (c) => c.toUpperCase());

  return (
    <div className="overflow-hidden lg:ml-[264px]">
      {/* Header */}
      <div className="fixed z-50 flex h-16 w-full items-center justify-between bg-white p-4 shadow dark:border-b dark:border-neutral-700 dark:bg-neutral-900 dark:shadow-none lg:w-[calc(100%-264px)]">
        <div className="hidden lg:flex">
          <p className="text-xl font-semibold tracking-wide text-primary">
            {/* {headerName} */}
          </p>
        </div>

        <div className="flex gap-3">
          <button onClick={toggleSidebar} className="text-gray-800 lg:hidden">
            <HambergerMenu size="24" className="text-slate-700" />
          </button>

          <div className="lg:hidden">
            <img src="/xendify.jpg" alt="" className="h-[40px] w-auto" />
          </div>
        </div>

        <div className="flex items-center gap-5">
          <ThemeSwitcher />

          <div>
            <Link
              to="/profile"
              className="flex items-center gap-2 text-sm font-semibold  text-neutral-700 dark:text-neutral-300"
            >
              <p>{user?.name || user?.username}</p>

              <User size="20" />
            </Link>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div
        className="mt-16 flex-1 overflow-y-auto overflow-x-hidden p-4"
        id="main-content"
      >
        <div>
          <Suspense
            fallback={
              <div className="flex min-h-[calc(100vh-120px)] w-full items-center justify-center py-10">
                <BeatLoader size={12} color="#854FFF" />
              </div>
            }
          >
            <Outlet />
          </Suspense>
        </div>
      </div>
    </div>
  );
};
