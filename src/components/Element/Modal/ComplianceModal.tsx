import {
  approveKYCDocument,
  rejectKYCDocument,
  useKYCDetails,
} from "@/features/complaince";
import { useModalStore } from "@/stores/modal";
import { useState } from "react";

export function ApproveKYCDocument() {
  const { closeModal, data } = useModalStore();
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(null);
  const { refetch } = useKYCDetails(Number(data.id));

  const handleApproveKYCDocument = () => {
    setLoading(true);

    if (import.meta.env.VITE_ENV === "development") {
      // console.log("testing");
      setLoading(false);
      setSuccess("Test: Approved Successfully!");
      return null;
    } else {
      approveKYCDocument(data.id)
        .then((res) => {
          refetch();
          setLoading(false);
          if (res.success) {
            setSuccess(res?.message || "Approved Successfully!");
          } else {
            setSuccess("An error occured while approving KYC Document!");
          }
        })
        .catch((error) => setSuccess(error?.message));
    }
  };
  return (
    <div className="relative">
      <h3 className="text-center text-sm font-semibold uppercase text-neutral-500">
        Approve KYC Document
      </h3>

      <div className="max-h-[350px] overflow-y-auto rounded-xl p-5 scrollbar-thin">
        <div className="mb-4">
          <p className="text-center">
            Are you sure you want to approve{" "}
            <strong>{data?.info} KYC Document</strong> for business{" "}
            <span className="rounded-lg bg-neutral-100 p-1 px-2 text-sm font-semibold text-primary">
              {data?.name}
            </span>
            ?
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
            onClick={handleApproveKYCDocument}
            className="min-h-10 w-full rounded-lg border bg-emerald-500 px-4  py-1 text-sm font-semibold text-white  transition duration-150 md:w-max "
          >
            Approve Document
          </button>
        </div>
      )}
    </div>
  );
}

export function ApproveBusiness() {
  const { closeModal, data } = useModalStore();
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(null);
  const { refetch } = useKYCDetails(Number(data.id));

  const handleApproveKYCDocument = () => {
    setLoading(true);

    if (import.meta.env.VITE_ENV === "development") {
      // console.log("testing");
      setLoading(false);
      setSuccess("Test: Approved Successfully!");
      return null;
    } else {
      approveKYCDocument(data.id)
        .then((res) => {
          refetch();
          setLoading(false);
          if (res.success) {
            setSuccess(res?.message || "Approved Successfully!");
          } else {
            setSuccess("An error occured while approving KYC Document!");
          }
        })
        .catch((error) => setSuccess(error?.message));
    }
  };
  return (
    <div className="relative">
      <h3 className="text-center text-sm font-semibold uppercase text-neutral-500">
        Approve KYC Document
      </h3>

      <div className="max-h-[350px] overflow-y-auto rounded-xl p-5 scrollbar-thin">
        <div className="mb-4">
          <p className="text-center">
            Are you sure you want to approve{" "}
            <strong>{data?.info} KYC Document</strong> for business{" "}
            <span className="rounded-lg bg-neutral-100 p-1 px-2 text-sm font-semibold text-primary">
              {data?.name}
            </span>
            ?
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
            onClick={handleApproveKYCDocument}
            className="min-h-10 w-full rounded-lg border bg-emerald-500 px-4  py-1 text-sm font-semibold text-white  transition duration-150 md:w-max "
          >
            Approve Document
          </button>
        </div>
      )}
    </div>
  );
}

export function RejectKYCDocument() {
  const { closeModal, data } = useModalStore();
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(null);
  const { refetch } = useKYCDetails(Number(data.id));

  //   console.log(data);

  const handleRejectKYCDocument = () => {
    setLoading(true);

    if (import.meta.env.VITE_ENV === "development") {
      // console.log("testing");
      setSuccess("Test: Rejected Successfully!");
      setLoading(false);
      return null;
    } else {
      // console.log("not testing");

      rejectKYCDocument(data.id)
        .then((res) => {
          refetch();
          setLoading(false);

          if (res.success) {
            setSuccess(res?.message || "Rejected Successfully!");
          } else {
            setSuccess("An error occured while rejecting KYC Document!");
          }
        })
        .catch((error) => setSuccess(error?.message));
    }
  };
  return (
    <div className="relative">
      <h3 className="text-center text-sm font-semibold uppercase text-neutral-500">
        Reject KYC Document
      </h3>

      <div className="max-h-[350px] overflow-y-auto rounded-xl p-5 scrollbar-thin">
        <div className="mb-4">
          <p className="text-center">
            Are you sure you want to reject{" "}
            <strong>{data?.info} KYC Document</strong> for business{" "}
            <span className="rounded-lg bg-neutral-100 p-1 px-2 text-sm font-semibold text-primary">
              {data?.name}
            </span>
            ?
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
            onClick={handleRejectKYCDocument}
            className="min-h-10 w-full rounded-lg border bg-red-500 px-4  py-1 text-sm font-semibold text-white  transition duration-150 md:w-max "
          >
            Reject Document
          </button>
        </div>
      )}
    </div>
  );
}
