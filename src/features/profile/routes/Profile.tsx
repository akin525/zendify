import { WidthWrapper } from "@/components/Layout";
import { InfoContainer } from "../components/InfoContainer";
import storage from "@/utils/storage";
import { LogoutCurve } from "iconsax-react";
import { useNavigate } from "react-router-dom";
import { ChangePassword } from "@/features/auth";

export function Profile() {
  const userData = storage.getToken().staff;
  const navigate = useNavigate();

  return (
    <>
      <WidthWrapper>
        <div className="flex justify-end pb-4">
          <button
            onClick={() => {
              sessionStorage.removeItem("paylony_staff_token");
              // sessionStorage.clear();
              navigate("/login", { replace: true });
            }}
            className=" flex h-12 w-max items-center justify-center gap-2 rounded-full border border-red-500 bg-red-500 px-6 font-semibold text-white lg:hidden "
          >
            <LogoutCurve size="24" />
            <p>Logout</p>
          </button>
        </div>

        {/* <hr /> */}
        <h3 className="border-b py-2 text-lg font-semibold dark:text-neutral-200">
          Profile Information
        </h3>

        <div className="mt-5 grid grid-cols-1 gap-4 md:grid-cols-2">
          <InfoContainer value={userData?.name} label="Name" />
          <InfoContainer value={userData?.email} label="Email" />
          <InfoContainer value={userData?.phone} label="Phone" />
          <InfoContainer value={userData?.state} label="State" />
          <InfoContainer value={userData?.city} label="City" />
          <InfoContainer value={userData?.address} label="Address" />
        </div>

        <ChangePassword />
      </WidthWrapper>
    </>
  );
}
