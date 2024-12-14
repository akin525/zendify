import { WidthWrapper } from "@/components/Layout";
import { Fragment, useState } from "react";
import { Listbox, Transition } from "@headlessui/react";
import { CheckIcon, ChevronUpDownIcon } from "@heroicons/react/20/solid";
import { Dialog } from "@headlessui/react";
import { resolveTransaction } from "../api";
import { BeatLoader } from "react-spinners";
import { providers } from "@/constants/providers";

export function ResolveTransaction() {
  const [selected, setSelected] = useState(providers[0]);
  const [loading, setLoading] = useState(false);
  const [sessionId, setSessionId] = useState("");
  const [settlementId, setSettlementId] = useState("");
  const [accountNumber, setAccountNumber] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState("");

  const handleResolveTransaction = () => {
    setLoading(true);

    const requestData = {
      sessionId,
      settlementId: undefined,
      accountNumber: undefined,
      provider: selected.value,
    };

    if (selected.value === "providus") {
      requestData.settlementId = settlementId;
    }

    if (selected.value === "netbank") {
      requestData.accountNumber = accountNumber;
    }

    resolveTransaction(requestData)
      .then((res) => {
        setIsOpen(true);
        setMessage(res.message);
        setSettlementId("");
        setAccountNumber("");
        setSessionId("");
        setLoading(false);
      })
      .catch((error) => {
        setIsOpen(true);
        setMessage(error.message);
        setLoading(false);
      });
  };

  return (
    <WidthWrapper>
      <div className="flex min-h-[calc(100vh-120px)] w-full justify-center">
        <MyModal isOpen={isOpen} setIsOpen={setIsOpen} message={message} />
        <div className="mt-10 flex h-max w-full max-w-[600px] flex-col items-center justify-center gap-2 rounded-xl bg-white px-4 py-5 dark:bg-neutral-700 md:px-8">
          <h1 className="mb-4 text-sm uppercase text-neutral-500 dark:text-neutral-200">
            Resolve Transaction
          </h1>

          <div className="flex w-full flex-col">
            <p className="text-xs text-neutral-400 dark:text-neutral-200">
              Select a provider<span className="text-red-500">*</span>
            </p>

            <Listbox value={selected} onChange={setSelected}>
              <div className="relative mt-1 w-full">
                <Listbox.Button className="relative w-full cursor-default rounded-lg bg-white py-2 pl-3 pr-10 text-left shadow-md focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white/75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 dark:border-neutral-500 dark:bg-transparent dark:text-neutral-200 sm:text-sm">
                  <span className="block truncate">{selected.name}</span>
                  <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                    <ChevronUpDownIcon
                      className="h-5 w-5 text-gray-400"
                      aria-hidden="true"
                    />
                  </span>
                </Listbox.Button>
                <Transition
                  as={Fragment}
                  leave="transition ease-in duration-100"
                  leaveFrom="opacity-100"
                  leaveTo="opacity-0"
                >
                  <Listbox.Options className="absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black/5 focus:outline-none sm:text-sm">
                    {providers.map((provider, providerIdx) => (
                      <Listbox.Option
                        key={providerIdx}
                        className={({ active }) =>
                          `relative cursor-default select-none py-2 pl-10 pr-4 ${
                            active
                              ? "bg-secondary/15 text-secondary"
                              : "text-gray-900"
                          }`
                        }
                        value={provider}
                      >
                        {({ selected }) => (
                          <>
                            <span
                              className={`block truncate ${
                                selected ? "font-medium" : "font-normal"
                              }`}
                            >
                              {provider.name}
                            </span>
                            {selected ? (
                              <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-secondary">
                                <CheckIcon
                                  className="h-5 w-5"
                                  aria-hidden="true"
                                />
                              </span>
                            ) : null}
                          </>
                        )}
                      </Listbox.Option>
                    ))}
                  </Listbox.Options>
                </Transition>
              </div>
            </Listbox>
          </div>

          <div className="w-full">
            <label
              htmlFor="sessionId"
              className="text-xs text-neutral-400 dark:text-neutral-200"
            >
              SessionId<span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              id="sessionId"
              onChange={(e) => setSessionId(e.target.value)}
              value={sessionId}
              // disabled={}
              className=" h-10 w-full rounded-lg border px-4 outline-none focus:border-secondary disabled:cursor-not-allowed dark:border-neutral-500 dark:bg-transparent dark:text-neutral-200"
            />
          </div>

          {selected.value === "providus" && (
            <div className="w-full">
              <label
                htmlFor="settlementId"
                className="text-xs text-neutral-400"
              >
                SettlementId<span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                id="settlementId"
                onChange={(e) => setSettlementId(e.target.value)}
                value={settlementId}
                // disabled={!!success}
                className=" h-10 w-full rounded-lg border px-4 outline-none focus:border-secondary disabled:cursor-not-allowed dark:border-neutral-500 dark:bg-transparent dark:text-neutral-200"
              />
            </div>
          )}

          {selected.value === "netbank" && (
            <div className="w-full">
              <label
                htmlFor="accountNumber"
                className="text-xs text-neutral-400"
              >
                AccountNumber<span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                id="accountNumber"
                onChange={(e) => setAccountNumber(e.target.value)}
                value={accountNumber}
                // disabled={!!success}
                className=" h-10 w-full rounded-lg border px-4 outline-none focus:border-secondary disabled:cursor-not-allowed dark:border-neutral-500 dark:bg-transparent dark:text-neutral-200"
              />
            </div>
          )}

          <button
            onClick={handleResolveTransaction}
            type="button"
            disabled={
              loading ||
              !sessionId ||
              (selected?.value === "providus" && !settlementId) ||
              (selected?.value === "netbank" && !accountNumber)
            }
            className={`mt-4 min-h-10 w-full rounded-lg bg-primary px-2 font-semibold text-white disabled:hover:scale-100 ${loading ? "animate-pulse disabled:cursor-progress" : "disabled:cursor-not-allowed"} select-none disabled:bg-primary/80 `}
          >
            {loading ? (
              <BeatLoader size={10} color="#fff" />
            ) : (
              "Resolve Transaction"
            )}
          </button>
        </div>
      </div>
    </WidthWrapper>
  );
}

export function MyModal({ isOpen, setIsOpen, message }) {
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
            <div className="fixed inset-0 bg-black/25" />
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
                    className="text-xs font-medium uppercase leading-6 text-neutral-400"
                  >
                    Response
                  </Dialog.Title>
                  <div className="mt-2">
                    <p className="text-sm text-gray-500">{message}</p>
                  </div>

                  <div className="mt-4">
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
