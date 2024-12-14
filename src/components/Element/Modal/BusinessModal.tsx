import {
  approveBusiness,
  blockBusiness,
} from "@/features/businesses/api/businessActions";
import { useModalStore } from "@/stores/modal";
import { useState } from "react";

export function ApproveBusiness() {
  const { closeModal, data } = useModalStore();
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(null);

  // console.log(data)

  const handleApproveBusiness = () => {
    setLoading(true);

    if (import.meta.env.VITE_ENV === "development") {
      // console.log("testing");
      setLoading(false);
      setSuccess("Test: Approved Successfully!");
      return null;
    } else {
      approveBusiness(data.id)
        .then((res) => {
          // refetch();
          setLoading(false);
          if (res.success) {
            setSuccess(res?.message || "Approved Successfully!");
          } else {
            setSuccess("An error occured while approving Business!");
          }
        })
        .catch((error) => setSuccess(error?.message));
    }
  };
  return (
    <div className="relative">
      <h3 className="text-center text-sm font-semibold uppercase text-neutral-500">
        Approve Business
      </h3>

      <div className="max-h-[350px] overflow-y-auto rounded-xl p-5 scrollbar-thin">
        <div className="mb-4">
          <p className="text-center">
            Are you sure you want to approve/activate business{" "}
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
            onClick={handleApproveBusiness}
            className="min-h-10 w-full rounded-lg border bg-emerald-500 px-4  py-1 text-sm font-semibold text-white  transition duration-150 md:w-max "
          >
            Approve / Activate
          </button>
        </div>
      )}
    </div>
  );
}

export function BlockOrUnblockBusiness() {
  const { closeModal, data } = useModalStore();
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(null);

  // console.log(data);

  const handleApproveBusiness = () => {
    setLoading(true);

    if (import.meta.env.VITE_ENV === "development") {
      // console.log("testing");
      setLoading(false);
      setSuccess("Test: Blocked Successfully!");
      return null;
    } else {
      blockBusiness(data.id)
        .then((res) => {
          // refetch();
          setLoading(false);
          if (res.success) {
            setSuccess(res.data.message || "Blocked Successfully!");
          } else {
            setSuccess("An error occured while blocking Business!");
          }
        })
        .catch((error) => setSuccess(error?.message));
    }
  };
  return (
    <div className="relative">
      <h3 className="text-center text-sm font-semibold uppercase text-neutral-500">
        Block / Unblock Business
      </h3>

      <div className="max-h-[350px] overflow-y-auto rounded-xl p-5 scrollbar-thin">
        <div className="mb-4">
          <p className="text-center">
            Are you sure you want to block business{" "}
            <span className="rounded-lg bg-neutral-100 p-1 px-2 text-sm font-semibold text-primary">
              {data?.name}
            </span>
            ?
          </p>
        </div>
      </div>

      <p className="text-center text-sm text-red-400">
        still in development...
      </p>

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
            onClick={handleApproveBusiness}
            className="min-h-10 w-full rounded-lg border bg-emerald-500 px-4  py-1 text-sm font-semibold text-white  transition duration-150 md:w-max "
          >
            Approve / Activate
          </button>
        </div>
      )}
    </div>
  );
}
