import { usePayoutsData, usePendingPayoutsData } from "@/features/payouts";
import { ROLES, useAuthorization } from "@/lib/authorization";
import { useModalStore } from "@/stores/modal";
import { useNavigate } from "react-router-dom";

const renderKeyValue = ([key, value]): JSX.Element => {
  if (typeof value === "object" && value !== null) {
    return (
      <li key={key} className="text-sm">
        <span className="font-semibold uppercase text-neutral-600">{key}:</span>
        <span className="ml-4 text-wrap break-words ">
          {Object.entries(value).map(renderKeyValue)}
        </span>
      </li>
    );
  } else {
    return (
      <div key={key} className="pb-2 text-sm">
        <span className="pr-1 font-semibold uppercase text-neutral-600">
          {key}:
        </span>
        <span className="text-wrap break-words">{value ? value : "N/A"}</span>
      </div>
    );
  }
};

export function DataView() {
  const navigate = useNavigate();
  const { data, type, openModal, closeModal } = useModalStore();
  const {
    checkAccess,
    settle_transaction,
    manage_payout,
    manage_business,
    manage_virtual_account,
  } = useAuthorization();
  const { isFetching: payoutsIsFecthing } = usePayoutsData();
  const { isFetching: payoutsPendingIsFetching } = usePendingPayoutsData();

  // console.log(data)

  const isNotSuccessfulOrRefunded =
    data.status != "success" && data.reversed != "Yes";
  const isNotSettled = data?.settledAt === null;

  const isEmail = type === "email";
  const isTransaction = type === "transaction";
  const isPayout = type === "payout";
  const isVirtualAccount = type === "virtual-account";

  const handleEditEmail = () => {
    openModal({ action: "edit-email", type: "email", id: data.id, data: data });
  };

  const handleSettleTransaction = () => {
    openModal({
      action: "settle-transaction",
      type: "transaction",
      id: data.id,
      data: data,
    });
  };

  const handleResendTransactionWebhook = () => {
    openModal({
      action: "resend-transaction-webhook",
      type: "transaction",
      id: data.id,
      data: data,
    });
  };

  const handleReversePayout = () => {
    openModal({
      action: "reverse-payout",
      type: "payout",
      id: data.id,
      data: data,
    });
  };

  const handlePND = () => {
    openModal({
      action: "handle-pnd",
      type: "virtual-account",
      id: data.id,
      data: data,
    });
  };

  const handleRemoveUnusedAccounts = () => {
    openModal({
      action: "remove-unused-account",
      type: "business",
      id: data.id,
      data: data,
    });
  };

  return (
    <div className="relative">
      <h3 className="mb-4 text-center text-sm font-semibold uppercase text-neutral-500">
        {isPayout && "Payout Details"}
        {isTransaction && "Transaction Details"}
        {isEmail && "Email Details"}
        {isVirtualAccount && "Virtual Account Details"}
      </h3>

      <div className="my-4 flex flex-wrap justify-end gap-2">
        {!isEmail && data?.biz && (
          <button
            onClick={() => {
              closeModal();
              // window.location.href = `/business/${data?.biz?.id}`;
              navigate(`/business/${data?.biz?.id}`);
            }}
            className="h-10 rounded-md border border-primary px-4 py-1 text-sm font-semibold text-primary transition duration-150  "
          >
            Go to business
          </button>
        )}

        {isTransaction && (
          <>
            {isNotSettled &&
              checkAccess({
                allowedRoles: [ROLES.admin, ROLES.superadmin],
              }) &&
              settle_transaction && (
                <button
                  onClick={handleSettleTransaction}
                  className="rounded-full border border-emerald-500 px-4  py-1 text-sm font-semibold text-emerald-500 transition duration-150 hover:bg-emerald-500 hover:text-white"
                >
                  Settle
                </button>
              )}

            <button
              onClick={handleResendTransactionWebhook}
              className="rounded-full border border-red-500 px-4 py-1 text-sm font-semibold text-red-500 transition duration-150 hover:bg-red-500 hover:text-white"
            >
              Resend Webhook
            </button>
          </>
        )}

        {isPayout && isNotSuccessfulOrRefunded && manage_payout && (
          <>
            {payoutsIsFecthing || payoutsPendingIsFetching ? (
              <>
                <div className="h-8 w-24 animate-pulse rounded-full bg-gray-300"></div>
              </>
            ) : (
              <button
                onClick={handleReversePayout}
                className="rounded-full border border-red-500 px-4 py-1 text-sm font-semibold text-red-500 transition duration-150 hover:bg-red-500 hover:text-white"
              >
                {/* Name changed to Requery Payout */}
                Requery Payout
              </button>
            )}
          </>
        )}

        {/*  checkAccess({ allowedRoles: [ROLES.admin, ROLES.superadmin] }) */}

        {isVirtualAccount &&
          (manage_business ||
            manage_virtual_account ||
            checkAccess({ allowedRoles: [ROLES.admin, ROLES.superadmin] })) && (
            <>
              <button
                onClick={handleRemoveUnusedAccounts}
                className="h-10 rounded-md border border-red-500 px-2 py-1 text-xs font-semibold  text-red-500 "
              >
                Remove Account
              </button>
            </>
          )}

        {isVirtualAccount &&
          (manage_business ||
            manage_virtual_account ||
            checkAccess({ allowedRoles: [ROLES.admin, ROLES.superadmin] })) && (
            <button
              onClick={handlePND}
              className="h-10 rounded-md border border-red-500 px-2 py-1 text-xs font-semibold  text-red-500 "
            >
              {data?.pnd == "yes"
                ? "Remove PND on Account"
                : "Place PND on Account"}
            </button>
          )}
      </div>

      <div className="max-h-[350px] overflow-y-auto rounded-xl border border-dashed p-5 scrollbar-thin">
        <ul>{Object.entries(data).map(renderKeyValue)}</ul>
      </div>

      {isEmail && (
        <button
          onClick={handleEditEmail}
          className="mt-4 min-h-10 w-full rounded-lg  bg-secondary px-4 py-1 text-sm  font-semibold text-white transition duration-150 hover:scale-105"
        >
          Edit Email
        </button>
      )}
    </div>
  );
}
