import {
  blackListEmail,
  updateBlackListedEmail,
  useEmailBlacklistData,
} from "@/features/email-blacklist";
import { useModalStore } from "@/stores/modal";
import { useEffect, useState } from "react";
import { Switch } from "@headlessui/react";

export function EditEmail() {
  const { data } = useModalStore();
  const initialEmail = data?.email || "";
  const initialStatus = data?.status == 1;
  const [enabled, setEnabled] = useState(initialStatus);
  const [email, setEmail] = useState(initialEmail);
  const [success, setSucccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [isChanged, setIsChanged] = useState(false);
  const { refetch } = useEmailBlacklistData();

  useEffect(() => {
    const hasEmailChanged = email !== initialEmail;
    const hasStatusChanged = enabled !== initialStatus;

    setIsChanged(hasEmailChanged || hasStatusChanged);
  }, [email, enabled, initialEmail, initialStatus]);

  const handleUpdateEmail = () => {
    setLoading(true);
    const requestData = { email: email, status: enabled ? 1 : 0 };

    updateBlackListedEmail(data?.id, requestData)
      .then(() => {
        setSucccess(true);
        setLoading(false);
        refetch();
      })
      .catch((error) => {
        setSucccess(false);
        setLoading(false);
        setError(error?.message || "An error occurred while updating email.");
      });
  };

  return (
    <div className="relative">
      <h3 className="mb-4 text-center text-sm font-semibold uppercase text-neutral-500">
        Edit Email
      </h3>

      <div className="max-h-[350px] overflow-y-auto rounded-xl border border-dashed p-5 scrollbar-thin">
        <div className="flex flex-col gap-4">
          <div>
            <label htmlFor="email" className="mb-1 block text-xs font-semibold">
              Email
            </label>
            <input
              type="text"
              id="email"
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              disabled={!!success}
              className=" h-12 w-full rounded-lg border px-4 outline-none focus:border-secondary disabled:cursor-not-allowed"
            />
          </div>
          <div className="flex items-center gap-3">
            <label htmlFor="email" className="">
              Status:
            </label>

            <MyToggle
              disabled={!!success}
              setEnabled={setEnabled}
              enabled={enabled}
            />
          </div>

          <p className="text-center">{error}</p>

          {success ? (
            <p className="text-center text-emerald-500">
              Email has been updated successfully.
            </p>
          ) : (
            <button
              onClick={handleUpdateEmail}
              type="button"
              disabled={loading || !isChanged}
              className={`mt-4 min-h-10 rounded-lg bg-secondary px-2 font-semibold text-white hover:scale-105 disabled:hover:scale-100 ${loading ? "animate-pulse" : ""} select-none disabled:bg-secondary/80 `}
            >
              {loading ? "Updating" : "Update Email"}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export function AddEmail() {
  const [emailList, setEmailList] = useState("");
  const [error, setError] = useState("");
  const [success, setSucccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const { refetch } = useEmailBlacklistData();

  const handleAddEmail = () => {
    if (!emailList) return setError("Please enter an email address.");

    setLoading(true);

    setError("");

    const emailsArray = emailList
      .split(",")
      .map((email) => email.trim())
      .filter((email) => email !== "");

    blackListEmail(emailsArray)
      .then(() => {
        setEmailList("");
        setSucccess(true);
        setLoading(false);
        refetch();
      })
      .catch((error) => {
        setError(
          error?.message ||
            "An error occurred while adding email(s) to blacklist.",
        );
      });
  };

  return (
    <div className="relative">
      <h3 className="mb-4 text-center text-sm font-semibold uppercase text-neutral-500">
        Add New Email(s)
      </h3>

      <div className="max-h-[350px] overflow-y-auto rounded-xl border border-dashed p-5 scrollbar-thin">
        <div className={` mt-2 flex flex-col gap-2 pb-8 duration-300`}>
          <label
            htmlFor="add-email-to-blacklist"
            className="text-sm font-medium text-neutral-600"
          >
            Enter email address to blacklist{" "}
            <span className="text-red-500">
              (separate multiple emails with a comma)*
            </span>
          </label>
          <input
            type="text"
            id="add-email-to-blacklist"
            value={emailList}
            onChange={(e) => setEmailList(e.target.value)}
            className="h-12 w-full rounded-xl border px-4 outline-none focus:border-primary"
          />
          <p className="text-xs text-neutral-500">
            *Note: This action is irreversible. Please be sure before adding an
            email to the blacklist.
          </p>

          <div className="pb-2">
            {error && <p className="text-sm text-red-500">{error}</p>}
          </div>

          {success && (
            <p className="pb-2 text-center text-emerald-500">
              Email Blacklist has been updated successfully.
            </p>
          )}

          <button
            onClick={handleAddEmail}
            type="button"
            disabled={loading || !emailList}
            className={`mt-4 min-h-10 rounded-lg bg-secondary px-2 font-semibold text-white hover:scale-105 disabled:hover:scale-100 ${loading ? "animate-pulse" : ""} select-none disabled:bg-secondary/80 `}
          >
            {loading ? "loading" : "Add Email(s)"}
          </button>
        </div>
      </div>
    </div>
  );
}

function MyToggle({ enabled, setEnabled, disabled = false }) {
  return (
    <Switch
      disabled={disabled}
      checked={enabled}
      onChange={setEnabled}
      className={`${
        enabled ? "bg-secondary" : "bg-gray-200"
      } relative inline-flex h-6 w-11 items-center rounded-full disabled:cursor-not-allowed`}
    >
      <span className="sr-only">Toggle Email Status</span>
      <span
        className={`${
          enabled ? "translate-x-6" : "translate-x-1"
        } inline-block h-4 w-4 transform rounded-full bg-white transition`}
      />
    </Switch>
  );
}
