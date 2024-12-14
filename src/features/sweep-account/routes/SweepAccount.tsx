import { Fragment, useState } from "react";
import { Transition } from "@headlessui/react";
import { Dialog } from "@headlessui/react";
import { BeatLoader } from "react-spinners";
import { sweepAccount } from "../api/sweepAccount";
import { currencyFormatter } from "@/utils";

export function SweepAccount() {
  const [loading, setLoading] = useState(false);
  const [accountNumber, setAccountNumber] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [data, setData] = useState(null);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const requestData = { account_number: accountNumber };

    setLoading(true);
    setData(null);

    sweepAccount(requestData)
      .then((response) => {
        setMessage(response?.message);
        setData(response);
        setIsOpen(true);
        setLoading(false);
        setAccountNumber("");
      })
      .catch((error) => {
        setMessage(`${error?.message}`);
        setIsOpen(true);
        setLoading(false);
      });
  };

  return (
    <>
      <MyModal
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        message={message}
        data={data}
      />
      <div className="mt-20 flex flex-col items-center justify-center">
        <h1 className="text-2xl font-semibold text-primary">Sweep Account</h1>

        <form
          onSubmit={handleSubmit}
          className="mt-10 w-full max-w-[700px] space-y-4"
        >
          <div className="space-y-0.5">
            <label
              htmlFor="accountNumber"
              className="text-xs font-semibold text-neutral-600"
            >
              Account Number <span className="text-red-500">(required)</span>
            </label>

            <input
              id="accountNumber"
              type="text"
              minLength={10}
              value={accountNumber}
              onChange={(e) =>
                setAccountNumber(e.target.value.replace(/[^0-9.]/g, ""))
              }
              className="h-12 w-full rounded-xl border px-4 outline-none focus:border-primary dark:border-neutral-700 dark:bg-transparent"
              placeholder="Enter Account Number"
              autoFocus
              required
            />
          </div>
          <button
            type="submit"
            className="h-10 w-full rounded-xl bg-primary text-white"
          >
            {loading ? <BeatLoader size={10} color="#fff" /> : "Sweep Account"}
          </button>
        </form>
      </div>
    </>
  );
}

export function MyModal({ isOpen, setIsOpen, message, data }) {
  function closeModal() {
    setIsOpen(false);
  }

  return (
    <>
      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-[1000]" onClose={closeModal}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black/50" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                  <Dialog.Title
                    as="h3"
                    className="text-xs font-semibold uppercase leading-6 text-neutral-500"
                  >
                    Response
                  </Dialog.Title>

                  <div className="my-4">
                    <p className="font-medium text-neutral-800">
                      <span className="text-red-500">Message: </span> {message}
                    </p>
                    {data && data.success ? (
                      <div className="mt-4 space-y-1">
                        <p>
                          <span className="text-sm font-bold">
                            Account Number:
                          </span>{" "}
                          {data?.account_number || "N/A"}
                        </p>

                        <p>
                          <span className="text-sm font-bold">
                            Account Name:
                          </span>{" "}
                          {data?.account_name || "N/A"}
                        </p>

                        <p>
                          <span className="font-bold">Balance:</span>{" "}
                          {currencyFormatter(data?.balance) || "N/A"}
                        </p>
                      </div>
                    ) : null}
                  </div>

                  <div className="mt-4 flex justify-end">
                    <button
                      type="button"
                      className="inline-flex justify-center rounded-md border border-transparent bg-primary/15 px-4 py-2 text-sm font-medium text-primary hover:bg-primary/25 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/15 focus-visible:ring-offset-2"
                      onClick={closeModal}
                    >
                      Close
                    </button>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
}
