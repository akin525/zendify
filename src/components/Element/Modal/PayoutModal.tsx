import {
  reversePayout,
  usePayoutsData,
  usePendingPayoutsData,
} from "@/features/payouts";
import { useModalStore } from "@/stores/modal";
import { currencyFormatter } from "@/utils";
import { useState } from "react";

export function ReversePayout() {
  const { closeModal, data } = useModalStore();
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(null);
  const { refetch } = usePayoutsData();
  const { refetch: refetchPending } = usePendingPayoutsData();

  const handleReversePayout = () => {
    setLoading(true);

    if (data.status === "success") {
      setSuccess("Payout was successful! Requery action can't be made!");
      return;
    } else {
      reversePayout(data.id)
        .then((res) => {
          setLoading(false);
          if (res.success) {
            refetch();
            refetchPending();
            setSuccess(res?.message || "Payout Requery Successfully!");
          } else {
            setSuccess(res?.message || "Payout was not requeried!.");
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
        Requery Payout
      </h3>

      <div className="max-h-[350px] overflow-y-auto rounded-xl p-5 scrollbar-thin">
        <div className="mb-4">
          <p className="text-center">
            Are you sure you want to reverse this payout of{" "}
            <strong>{currencyFormatter(Number(data?.amount)) || "---"}</strong>{" "}
            made to <strong>{data?.account_name}</strong> by{" "}
            <strong>{data?.biz?.name}</strong>?
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
        <div className="flex flex-wrap gap-2">
          <button
            type="button"
            onClick={handleReversePayout}
            className="mt-4 min-h-10 w-full rounded-lg border border-red-500  px-4 py-1 text-sm font-semibold  text-red-500 transition duration-150 "
          >
            Requery Payout
          </button>
          <button
            type="button"
            onClick={closeModal}
            className="mt-4 min-h-10 w-full rounded-lg bg-red-500  px-4 py-1 text-sm font-semibold  text-white transition duration-150 "
          >
            Cancel
          </button>
        </div>
      )}
    </div>
  );
}
