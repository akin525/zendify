import {
  resendTransactionWebhook,
  settleTransaction,
} from "@/features/transactions";
import { useModalStore } from "@/stores/modal";
import { currencyFormatter } from "@/utils";
import { useState } from "react";

export function SettleTransaction() {
  const { closeModal, data } = useModalStore();
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(null);

  const handleSettleTransaction = () => {
    setLoading(true);

    if (data.settledAt) {
      setSuccess("Transaction settled already! Action can't be made!");
      return;
    } else {
      settleTransaction(data.id)
        .then((res) => {
          setLoading(false);

          if (res.success) {
            setSuccess("Settled Successfully!");
          } else {
            setSuccess("Transaction was not settled!.");
          }
        })
        .catch((error) => setSuccess(error?.message));
    }
  };
  return (
    <div className="relative">
      <h3 className="text-center text-sm font-semibold uppercase text-neutral-500">
        Settled Transaction
      </h3>

      <div className="max-h-[350px] overflow-y-auto rounded-xl p-5 scrollbar-thin">
        <div className="mb-4">
          <p className="text-center">
            Are you sure you want to settle this transaction of{" "}
            <strong>{currencyFormatter(Number(data?.amount)) || "---"}</strong>{" "}
            with transaction number <strong>{data?.trx}</strong>?
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
        <div className="mt-4 flex flex-wrap gap-2 md:flex-nowrap md:justify-end">
          <button
            type="button"
            onClick={closeModal}
            className="b-red-500 min-h-10 w-full rounded-lg border border-red-500 px-4 py-1 text-sm font-semibold text-red-500  transition duration-150 md:w-max "
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={handleSettleTransaction}
            className="min-h-10 w-full rounded-lg border bg-emerald-500 px-4  py-1 text-sm font-semibold text-white  transition duration-150 md:w-max "
          >
            Settle Transaction
          </button>
        </div>
      )}
    </div>
  );
}

export function ResendTransaction() {
  const { closeModal, data } = useModalStore();
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(null);

  const handleResendTransaction = () => {
    setLoading(true);

    resendTransactionWebhook(data.id)
      .then((res) => {
        setLoading(false);
        if (res.success) {
          setSuccess(
            res?.message || "Transaction webhook resent successfully!",
          );
        } else {
          setSuccess(res?.message || "Transaction webhook was not resent!");
        }
      })
      .catch((error) => setSuccess(error?.message || "An error occurred!"));
  };

  return (
    <div className="relative">
      <h3 className="text-center text-sm font-semibold uppercase text-neutral-500">
        Resend Transaction Webhook
      </h3>

      <div className="max-h-[350px] overflow-y-auto rounded-xl p-5 scrollbar-thin">
        <div className="mb-4">
          <p className="text-center">
            Are you sure you want to settle this transaction of{" "}
            <strong>{currencyFormatter(Number(data?.amount)) || "---"}</strong>{" "}
            with transaction number <strong>{data?.trx}</strong>?
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
        <div className="mt-4 flex flex-wrap gap-2 md:flex-nowrap md:justify-end">
          <button
            type="button"
            onClick={closeModal}
            className="min-h-10 w-full rounded-lg border border-red-500 px-4  py-1 text-sm font-semibold text-red-500  transition duration-150 md:w-max "
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={handleResendTransaction}
            className="min-h-10 w-full rounded-lg border bg-red-500 px-4  py-1 text-sm font-semibold text-white  transition duration-150 md:w-max "
          >
            Resend Transaction Webhook
          </button>
        </div>
      )}
    </div>
  );
}
