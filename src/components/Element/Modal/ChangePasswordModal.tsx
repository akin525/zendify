import { changePassword } from "@/features/auth";
import { useModalStore } from "@/stores/modal";
import { useState } from "react";

export function ChangePasswordModal() {
  const { data, closeModal } = useModalStore();
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(null);

  const handleChangePassword = () => {
    setLoading(true);
    changePassword(data)
      .then((res) => {
        setLoading(false);

        if (res?.success) {
          setSuccess("Password Changed Successfully!");
        } else {
          setSuccess("An error occured! Contact Admin.");
        }
      })
      .catch((error) => setSuccess(error?.message));
  };

  return (
    <>
      <h3 className="mb-4 text-center text-sm font-semibold uppercase text-neutral-500">
        Change Password
      </h3>

      <div className="mb-2">
        <p className="text-center font-semibold">
          Are you sure you want to change your password?
        </p>
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
        <div className="mt-4 flex flex-wrap justify-center gap-2 md:flex-nowrap md:justify-end">
          <button
            type="button"
            onClick={closeModal}
            className="min-h-10 w-full rounded-lg border border-emerald-500 px-4  py-1 text-sm font-semibold text-emerald-500  transition duration-150 md:w-max "
          >
            Cancel
          </button>
          <button
            type="button"
            className="b-red-500 min-h-10 w-full rounded-lg border bg-red-500 px-4 py-1 text-sm font-semibold text-white  transition duration-150 md:w-max "
            onClick={handleChangePassword}
          >
            Change Password
          </button>
        </div>
      )}
    </>
  );
}
