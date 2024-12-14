import { ComingSoon } from "@/components/Element";
// import { TextEditor } from "../components/TextEditor";
import { Listbox, Transition } from "@headlessui/react";
import { ChevronUpDownIcon } from "@heroicons/react/20/solid";
import { Fragment } from "react/jsx-runtime";
// import { useState } from "react";
import { CheckIcon } from "@radix-ui/react-icons";

export const sourceData = [
  { id: 1, name: "Settlement", value: "settlement" },
  { id: 2, name: "Payout", value: "payout" },
  { id: 3, name: "BVN", value: "bvn" },
  { id: 4, name: "Bills", value: "bills" },
  { id: 5, name: "Payout Reversal", value: "payout_reversal" },
  { id: 1, name: "Refund", value: "refund" },
  { id: 1, name: "Funding", value: "funding" },
];

export function SendEmail() {
  // const [source, setSource] = useState(sourceData[0]);
  return (
    <>
      {/* <Notice type={"development"} /> */}

      {/* <div className="space-y-4 dark:text-neutral-200">
        <h1 className="text-3xl font-semibold text-[#333] dark:text-neutral-300 ">
          Send Email
        </h1>

        <div className="flex">
          <p className="text-lg">
            Send Email to{" "}
            <span className="rounded bg-neutral-100 p-1 px-2 text-sm font-medium text-primary shadow">
              All Merchants
            </span>
          </p>

          <Select
            // label="Select Source"
            value={source}
            onChange={setSource}
            data={sourceData}
          />
        </div>

        <TextEditor /> 

      </div> */}

      <ComingSoon />
    </>
  );
}

export const Select = ({ value, onChange, data }) => {
  return (
    <>
      {/* <div className="flex w-full flex-col">
        <p className="text-xs font-medium text-neutral-600">{label}</p> */}

      <Listbox value={value} onChange={onChange}>
        <div className="relative mt-1 w-full">
          <Listbox.Button className="relative w-full cursor-default rounded-lg bg-white py-2 pl-3 pr-10 text-left shadow-md focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white/75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 sm:text-sm">
            <span className="block truncate">{value?.name}</span>
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
            <Listbox.Options className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black/5 focus:outline-none sm:text-sm">
              {data.map((provider, providerIdx) => (
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
                          <CheckIcon className="h-5 w-5" aria-hidden="true" />
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
      {/* </div> */}
    </>
  );
};
