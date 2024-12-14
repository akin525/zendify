import { Button } from "@/components/ui/button";
import { Listbox, Transition } from "@headlessui/react";
import { ChevronUpDownIcon } from "@heroicons/react/20/solid";
import { Fragment } from "react/jsx-runtime";
import { CheckIcon } from "@radix-ui/react-icons";
import {
  calculationTypeData,
  currencyData,
  sourceData,
  typeData,
} from "@/constants/calculators";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { currencyFormatter, formatNumber } from "@/utils";
import { getSysCalculation } from "../api/system-calculator";

function getFormatfor(key, value) {
  switch (key) {
    case "vfd":
    case "gtb":
    case "providus":
    case "available_wallet_balance":
    case "system_balance":
    case "payout_sum":
    case "pending_wallet_balance":
    case "safehaven":
    case "collection_sum":
    case "fidelity":
    case "collection_fee":
    case "collection_sys_fee":
    case "total_sum_amount":
    case "total_sum_fee":
    case "total_sum_total":
    case "total_sum_sys_fee":
    case "sum_total_amount":
    case "sum_settled_amount":
      return currencyFormatter(Number(value));
    default:
      return formatNumber(Number(value));
  }
}

export function SystemCalculators() {
  const [calculationType, setCalculationType] = useState(
    calculationTypeData[0],
  );
  const [source, setSource] = useState(sourceData[0]);
  const [type, setType] = useState(typeData[0]);
  const [currency, setCurrency] = useState(currencyData[0]);
  const [businessID, setBusinessID] = useState("");
  const [toDate, setToDate] = useState(null);
  const [fromDate, setFromDate] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [data, setData] = useState("");

  const buttonDisabled =
    !businessID ||
    (calculationType.value == "wallet-transaction-calculator" && !source) ||
    (type.value == "range" && !fromDate && !toDate);

  const handleCalculate = () => {
    setError("");
    setLoading(true);
    const requestData = {
      from_date: undefined,
      to_date: undefined,
      source: undefined,
      business_id: businessID || undefined,
      currency: currency?.value,
      type: type?.value,
    };

    if (calculationType.value === "wallet-transaction-calculator") {
      requestData.source = source?.value;
    }
    if (type.value === "range") {
      requestData.from_date = fromDate;
      requestData.to_date = toDate;
    }

    getSysCalculation(calculationType.value, requestData)
      .then((res) => {
        const data = res?.data;
        setData(data);
        setLoading(false);
      })
      .catch((error) => {
        setError(error?.message || "An error occured");
        setLoading(false);
      });
  };
  return (
    <>
      <div className="my-10 flex justify-center">
        <div className="flex w-full max-w-[800px] flex-col items-center space-y-4">
          <h1 className="pb-5 text-xl font-semibold text-primary">
            System Calculator
          </h1>
          <Select
            label="Select Calculation Type"
            value={calculationType}
            onChange={setCalculationType}
            data={calculationTypeData}
          />

          <div className="w-full">
            <label
              htmlFor="businessId"
              className="text-xs font-medium text-neutral-600"
            >
              Business ID {"  "}
              <span className="text-neutral-60 text-xs text-red-500">
                (required)
              </span>
            </label>
            <input
              type="text"
              id="businessId"
              onChange={(e) => setBusinessID(e.target.value)}
              value={businessID}
              // disabled={}
              className=" h-10 w-full rounded-lg border px-4 outline-none focus:border-secondary disabled:cursor-not-allowed"
            />
          </div>

          <Select
            label="Select Currency"
            value={currency}
            onChange={setCurrency}
            data={currencyData}
          />

          {calculationType?.value === "wallet-transaction-calculator" && (
            <Select
              label="Select Source"
              value={source}
              onChange={setSource}
              data={sourceData}
            />
          )}

          <Select
            label="Select Type"
            value={type}
            onChange={setType}
            data={typeData}
          />

          {type?.value === "range" && (
            <div className="grid w-full gap-4 md:grid-cols-2">
              <Input
                type="date"
                placeholder="From Date"
                onChange={(e) => setFromDate(e.target.value)}
                className="bg-white"
              />
              <Input
                type="date"
                placeholder="To Date"
                onChange={(e) => setToDate(e.target.value)}
                className="bg-white"
              />
            </div>
          )}

          <div className="w-full">
            <Button
              type="submit"
              onClick={handleCalculate}
              disabled={buttonDisabled}
              className=" w-full bg-primary px-10 hover:bg-primary/90 disabled:bg-primary/75"
            >
              {loading ? (
                <AiOutlineLoading3Quarters className="h-4 w-4 animate-spin" />
              ) : (
                "Calculate"
              )}
            </Button>
            <p className="py-2 text-sm text-neutral-500">
              <span className="text-red-500">*</span>
              might take about 15 seconds - 1 minute
            </p>
          </div>

          <p className="py-3 text-neutral-500">
            <span className="text-red-500">{error}</span>
          </p>

          {data && !loading && (
            <div className="mt-10 w-full space-y-2 rounded-xl border-4 border-dashed border-primary/50 p-4">
              <header className=" text-2xl font-semibold text-primary">
                {calculationType?.name} Results
              </header>

              <ul className="space-y-2 rounded-xl bg-white p-4">
                {data &&
                  Object.entries(data)?.map(([key, value], index) => (
                    <li key={index}>
                      <p className="space-x-2 text-wrap">
                        <span className="font-medium uppercase text-neutral-700">
                          {key}
                        </span>
                        :
                        <span className="font-semibold ">
                          {getFormatfor(key, value)}
                        </span>
                      </p>
                    </li>
                  ))}
              </ul>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

const Select = ({ label, value, onChange, data }) => {
  return (
    <div className="flex w-full flex-col">
      <p className="text-xs font-medium text-neutral-600">{label}</p>

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
    </div>
  );
};
