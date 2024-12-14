import { useModalStore } from "@/stores/modal";
import { CloseCircle } from "iconsax-react";
import { DataView } from "./DataView";
import { AddEmail, EditEmail } from "./EmailModal";
import { ReversePayout } from "./PayoutModal";
import { ResendTransaction, SettleTransaction } from "./TransactionModal";
import { ApproveBusiness, BlockOrUnblockBusiness } from "./BusinessModal";
import { ChangePasswordModal } from "./ChangePasswordModal";
import { ApproveKYCDocument, RejectKYCDocument } from "./ComplianceModal";
import { SendEmailToBusiness } from "./SendEmailToBusiness";
import { PNDModal, RemoveUnusedAccountModal } from "./VirtualAccountsModal";

export function ModalProvider() {
  const { isOpen, closeModal, action } = useModalStore();

  const handleCloseModal = (e) => {
    if (e.target.classList.contains("overlay")) {
      closeModal();
    }
  };

  const renderContent = () => {
    switch (action) {
      case "view-data":
        return <DataView />;
      case "approve-business":
        return <ApproveBusiness />;
      case "approve-kyc-document":
        return <ApproveKYCDocument />;
      case "reject-kyc-document":
        return <RejectKYCDocument />;
      case "block-or-unblock-business":
        return <BlockOrUnblockBusiness />;
      case "edit-email":
        return <EditEmail />;
      case "add-email":
        return <AddEmail />;
      case "send-email-to-business":
        return <SendEmailToBusiness />;
      case "settle-transaction":
        return <SettleTransaction />;
      case "resend-transaction-webhook":
        return <ResendTransaction />;
      case "reverse-payout":
        return <ReversePayout />;
      case "change-password":
        return <ChangePasswordModal />;
      case "handle-pnd":
        return <PNDModal />;
      case "remove-unused-account":
        return <RemoveUnusedAccountModal />;
      default:
        return <DefaultView />;
    }
  };

  return (
    <>
      {isOpen && (
        <div
          onClick={handleCloseModal}
          className="overlay fixed left-0 top-0 z-[1000] flex h-full min-h-screen w-screen flex-col items-center justify-center overflow-y-auto bg-black/50 px-6 py-10 backdrop-blur-sm dark:text-neutral-800"
        >
          <div className="relative flex max-h-full min-h-[200px] w-full max-w-[600px] flex-col gap-2 overflow-hidden rounded-xl border bg-white p-6">
            <div className="flex justify-end">
              <button onClick={closeModal}>
                <CloseCircle
                  size="48"
                  variant="Bulk"
                  className="text-neutral-400"
                />
              </button>
            </div>

            {renderContent()}
          </div>
        </div>
      )}
    </>
  );
}

export function DefaultView() {
  return (
    <div className="flex items-center justify-center py-10 font-semibold text-neutral-500">
      Nothing to see here!
    </div>
  );
}
