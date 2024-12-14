import {
  useUnusedAssignedProvidusAccountsData,
  useVirtualAccountsData,
} from "@/features/virtual-accounts/api/getVirtualAccounts";
import { placeOrRemovePND } from "@/features/virtual-accounts/api/pnd";
import { removeUnusedAccountFromBusiness } from "@/features/virtual-accounts/api/remove-unused";
import { useBusinessVirtualAccountsData } from "@/features/virtual-accounts/api/useVirtualAccounts";
import { useModalStore } from "@/stores/modal";
import { useState } from "react";

export function PNDModal() {
  const { closeModal, data } = useModalStore();
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(null);
  const { refetch } = useVirtualAccountsData();
  const businessId = data?.business_id;
  const { refetch: refetchBusiness } = useBusinessVirtualAccountsData({
    businessId: businessId,
  });

  // console.log(data);

  const handlePND = () => {
    setLoading(true);

    if (import.meta.env.VITE_ENV === "development") {
      // console.log("testing");
      setLoading(false);
      setSuccess("Test: Approved Successfully!");
      return null;
    } else {
      const payload = {
        status: data?.pnd === "yes" ? "yes" : "no",
        id: data.id,
      };
      placeOrRemovePND(payload)
        .then((res) => {
          setLoading(false);
          if (res.success) {
            refetch();
            refetchBusiness();
            setSuccess(res?.message || "message: successful!");
          } else {
            setSuccess(res?.message || "message: successful!");
          }
        })
        .catch((error) =>
          setSuccess(
            error?.message || "An error occurred while requering payout!",
          ),
        );
    }
  };
  return (
    <div className="relative">
      <h3 className="text-center text-sm font-semibold uppercase text-neutral-500">
        PLACE OR REMOVE PND ON ACCOUNT
      </h3>

      <div className="max-h-[350px] overflow-y-auto rounded-xl p-5 scrollbar-thin">
        <div className="mb-4">
          <p className="text-center">
            Are you sure you want to{" "}
            <strong>
              {data?.pnd === "yes"
                ? "Remove PND on account"
                : "Place PND on account"}{" "}
              on
            </strong>
            <br />
            <br />
            <span className="text-sm">
              <strong> Account Name: </strong> {data?.accountName} <br />
              <strong>Account number: </strong> {data?.accountNumber} <br />
              <strong>Associated Busines: </strong> {data?.biz?.name}
            </span>
          </p>
        </div>
      </div>

      {success ? (
        <>
          <p className="py-4 text-center font-semibold text-red-500">
            {success}
          </p>
        </>
      ) : loading ? (
        <p className="animate-pulse py-4 text-center text-sm font-semibold text-red-500">
          Please wait...
        </p>
      ) : (
        <div className="flex justify-end gap-2 *:w-max">
          <button
            type="button"
            onClick={handlePND}
            className="mt-4 min-h-10 w-full rounded-lg border border-red-500 px-4 py-1  text-sm font-semibold text-red-500 hover:bg-red-500  hover:text-white "
          >
            {data?.pnd === "yes"
              ? "Remove PND on Account"
              : "Place PND on Account"}
          </button>
          <button
            type="button"
            onClick={closeModal}
            className="mt-4 min-h-10 w-full rounded-lg bg-neutral-700 px-4  py-1 text-sm font-semibold text-white  transition duration-150 hover:bg-neutral-800 "
          >
            Cancel
          </button>
        </div>
      )}
    </div>
  );
}

export function RemoveUnusedAccountModal() {
  const { closeModal, data } = useModalStore();
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(null);
  const { refetch } = useVirtualAccountsData();
  const { refetch: refetchUnusedProvidus } =
    useUnusedAssignedProvidusAccountsData();

  const businessId = data?.business_id;
  const { refetch: refetchBusiness } = useBusinessVirtualAccountsData({
    businessId: businessId,
  });

  // console.log(data);

  const handleRemove = () => {
    setLoading(true);

    if (import.meta.env.VITE_ENV === "development") {
      // console.log("testing");
      setLoading(false);
      setSuccess("Test: Approved Successfully!");
      refetch();
      refetchBusiness();
      refetchUnusedProvidus();
      return null;
    } else {
      removeUnusedAccountFromBusiness(data.id)
        .then((res) => {
          setLoading(false);
          if (res.success) {
            setSuccess(res?.message || "message: successful!");
            refetch();
            refetchBusiness();
            refetchUnusedProvidus();
          } else {
            setSuccess(res?.message || "message: successful!");
          }
        })
        .catch((error) =>
          setSuccess(
            error?.message ||
              "An error occurred while removing unused account!",
          ),
        );
    }
  };
  return (
    <div className="relative">
      <h3 className="text-center text-sm font-semibold uppercase text-neutral-500">
        REMOVE UNUSED ACCOUNT
      </h3>

      <div className="max-h-[350px] overflow-y-auto rounded-xl p-5 scrollbar-thin">
        <div className="mb-4">
          <p className="text-center">
            Are you sure you want to remove unused account with account name:{" "}
            <strong>{data?.name}?</strong>
          </p>
        </div>
      </div>

      {success ? (
        <>
          <p className="py-4 text-center font-semibold text-red-500">
            {success}
          </p>
        </>
      ) : loading ? (
        <p className="animate-pulse py-4 text-center text-sm font-semibold text-red-500">
          Please wait...
        </p>
      ) : (
        <div className="flex justify-end gap-2 *:w-max">
          <button
            type="button"
            onClick={handleRemove}
            className="mt-4 min-h-10 w-full rounded-lg border border-red-500 px-4 py-1  text-sm font-semibold text-red-500 hover:bg-red-500  hover:text-white "
          >
            Remove
          </button>
          <button
            type="button"
            onClick={closeModal}
            className="mt-4 min-h-10 w-full rounded-lg bg-neutral-700 px-4  py-1 text-sm font-semibold text-white  transition duration-150 hover:bg-neutral-800 "
          >
            Cancel
          </button>
        </div>
      )}
    </div>
  );
}
