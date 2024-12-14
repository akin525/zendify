import { businessTabs } from "@/constants";
import { Listbox, Transition } from "@headlessui/react";
import { ChevronUpDownIcon } from "@heroicons/react/20/solid";
import { CheckIcon } from "@radix-ui/react-icons";
import { Fragment } from "react/jsx-runtime";

export const BusinessTabs = ({ activeTab, setActiveTab, setQuery }) => {
  return (
    <div>
      <div className="py-2 xl:hidden">
        <Select
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          setQuery={setQuery}
        />
      </div>

      <div className="hidden w-full flex-wrap items-center gap-2 rounded-lg  py-2 xl:flex">
        {businessTabs.map((tab) => (
          <button
            onClick={() => {
              setActiveTab(tab);
              setQuery(tab?.query);
            }}
            key={tab.id}
            className={`rounded-lg ${
              activeTab.id === tab.id
                ? "bg-primary/10 text-primary"
                : "bg-whit text-primary"
            } px-4 py-2 text-sm font-semibold transition duration-150`}
          >
            {tab.name}
          </button>
        ))}
      </div>

      <hr />
    </div>
  );
};

const Select = ({ activeTab, setActiveTab, setQuery }) => {
  const handleChange = (tab) => {
    // console.log(tab);
    setActiveTab(tab);
    setQuery(tab?.query);
  };
  return (
    <div className="flex w-full flex-col">
      <Listbox value={activeTab} onChange={handleChange}>
        <div className="relative mt-1 w-full">
          <Listbox.Button className="relative w-full cursor-default rounded-lg border  bg-primary/10 py-2 pl-3 pr-10 text-left shadow-md focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white/75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 sm:text-sm">
            <span className="block truncate font-semibold text-primary">
              {activeTab?.name}
            </span>
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
            <Listbox.Options className="absolute z-10 mt-1 max-h-60 w-full  overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black/5 focus:outline-none sm:text-sm">
              {businessTabs.map((tab) => (
                <Listbox.Option
                  key={tab.id}
                  className={({ active }) =>
                    `relative cursor-default select-none py-2 pl-10 pr-4 ${
                      active ? "bg-secondary/15 text-primary" : "text-gray-900"
                    }`
                  }
                  value={tab}
                >
                  {({ selected }) => (
                    <>
                      <span
                        className={`block truncate ${
                          selected ? "font-medium text-primary" : "font-normal"
                        }`}
                      >
                        {tab.name}
                      </span>
                      {selected ? (
                        <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-primary">
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
    </div>
  );
};
