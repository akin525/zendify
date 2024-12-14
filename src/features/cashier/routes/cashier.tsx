import {useEffect, useState} from "react";
import { WidthWrapper } from "@/components/Layout";
import storage from "@/utils/storage.ts";
import {SyncLoader} from "react-spinners";
import {toast} from "react-toastify";
const baseUrl = import.meta.env.VITE_API_BASE_URL;

export function Cashier() {



  const [formData, setFormData] = useState({
    sender_name: "",
    sender_account: "",
    amount: "",
    narration: "",
    pin: ""
  });
  const [search, setSearch] = useState("");
  const [businesses, setBusinesses] = useState([]);
  const [selectedBizId, setSelectedBizId] = useState("");
  const [loading, setLoading] = useState(false);
  const [loading1, setLoading1] = useState(false);
  const [error, setError] = useState(null);

  const debounceTime = 500;

  const getToken = () => {
    const data = storage.getToken();
    return data ? data?.token : "";
  }

  const token = getToken();

  // Use useEffect to handle the debounce
  useEffect(() => {
    const fetchBusinesses = async () => {
      if (search.trim()) {
        setLoading(true);
        setError(null);
        try {
          const response = await fetch(`${baseUrl}/find-business`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: token ? `Bearer ${token}` : "",
            },
            body: JSON.stringify({ search }),
          });

          const result = await response.json();
          if (!response.ok || !result.success) {
            throw new Error(result.message || "Failed to find business");
          }
          setBusinesses(result.data || []);
        } catch (error) {
          setError(error.message);
        } finally {
          setLoading(false);
        }
      } else {
        setBusinesses([]);
      }
    };

    const timeoutId = setTimeout(fetchBusinesses, debounceTime);
    return () => clearTimeout(timeoutId);
  }, [search, token]);

  const handleSearchChange = (e) => {
    setSearch(e.target.value);
  };

  const handleBusinessSelect = (e) => {
    setSelectedBizId(e.target.value);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };


  const handleSubmit = async (e) => {
    setLoading1(true);

    e.preventDefault();

    try {
      const response = await fetch(`${baseUrl}/business-cashier-deposit/${selectedBizId}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: token ? `Bearer ${token}` : "",
        },
        body: JSON.stringify(formData)
      });

      const result = await response.json();
      setLoading1(false);

      if (result.success == true) {
        toast.success( result.message);
      } else {
        toast.error( result.message);
      }
    } catch (error) {
      setLoading1(false);
      toast.error( "error");
    }
  };

  return (
      <WidthWrapper>
        {loading1 && (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
              <div className="flex flex-col items-center">
                <SyncLoader size={14} color="#854FFF" />
                <p className="mt-4 text-white">loading...</p>
              </div>
            </div>
        )}
        <h3 className="border-b py-2 text-lg font-semibold dark:text-neutral-200">
          Cashier Deposit
        </h3>
        <div className="mt-5 max-w-lg mx-auto p-6 bg-white dark:bg-neutral-800 rounded-lg shadow-md">
          <div className="flex flex-col mb-4">
            <label className="mb-1 font-medium text-gray-700 dark:text-neutral-200">
              Search Business
            </label>
            <input
                type="text"
                value={search}
                onChange={handleSearchChange}
                className="h-12 w-full rounded-lg border border-gray-300 bg-white p-3 outline-none dark:border-neutral-700 dark:bg-neutral-800 dark:text-neutral-200"
                placeholder="Type to search business"
            />
            {loading && <p>Loading...</p>}
            {error && <p className="text-red-500">{error}</p>}
            {businesses.length > 0 && (
                <select
                    onChange={handleBusinessSelect}
                    value={selectedBizId}
                    className="mt-2 h-12 w-full rounded-lg border border-gray-300 bg-white p-3 outline-none dark:border-neutral-700 dark:bg-neutral-800 dark:text-neutral-200"
                >
                  <option value="">Select a business</option>
                  {businesses.map((biz) => (
                      <option key={biz.id} value={biz.id}>
                        {biz.name} {/* Adjust if the business name property is different */}
                      </option>
                  ))}
                </select>
            )}
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Sender Name */}
            <div className="flex flex-col">
              <label className="mb-1 font-medium text-gray-700 dark:text-neutral-200" htmlFor="sender_name">
                Sender Name
              </label>
              <input
                  type="text"
                  name="sender_name"
                  value={formData.sender_name}
                  onChange={handleChange}
                  id="sender_name"
                  className="h-12 w-full rounded-lg border border-gray-300 bg-white p-3 outline-none dark:border-neutral-700 dark:bg-neutral-800 dark:text-neutral-200"
                  placeholder="Enter sender name"
              />
            </div>

            {/* Sender Account */}
            <div className="flex flex-col">
              <label className="mb-1 font-medium text-gray-700 dark:text-neutral-200" htmlFor="sender_account">
                Sender Account
              </label>
              <input
                  type="text"
                  name="sender_account"
                  value={formData.sender_account}
                  onChange={handleChange}
                  id="sender_account"
                  className="h-12 w-full rounded-lg border border-gray-300 bg-white p-3 outline-none dark:border-neutral-700 dark:bg-neutral-800 dark:text-neutral-200"
                  placeholder="Enter sender account"
              />
            </div>

            {/* Amount */}
            <div className="flex flex-col">
              <label className="mb-1 font-medium text-gray-700 dark:text-neutral-200" htmlFor="amount">
                Amount
              </label>
              <input
                  type="number"
                  name="amount"
                  value={formData.amount}
                  onChange={handleChange}
                  id="amount"
                  className="h-12 w-full rounded-lg border border-gray-300 bg-white p-3 outline-none dark:border-neutral-700 dark:bg-neutral-800 dark:text-neutral-200"
                  placeholder="Enter amount"
              />
            </div>

            {/* Narration */}
            <div className="flex flex-col">
              <label className="mb-1 font-medium text-gray-700 dark:text-neutral-200" htmlFor="narration">
                Narration
              </label>
              <input
                  type="text"
                  name="narration"
                  value={formData.narration}
                  onChange={handleChange}
                  id="narration"
                  className="h-12 w-full rounded-lg border border-gray-300 bg-white p-3 outline-none dark:border-neutral-700 dark:bg-neutral-800 dark:text-neutral-200"
                  placeholder="Enter narration"
              />
            </div>

            {/* PIN */}
            <div className="flex flex-col">
              <label className="mb-1 font-medium text-gray-700 dark:text-neutral-200" htmlFor="pin">
                PIN
              </label>
              <input
                  type="password"
                  name="pin"
                  value={formData.pin}
                  onChange={handleChange}
                  id="pin"
                  className="h-12 w-full rounded-lg border border-gray-300 bg-white p-3 outline-none dark:border-neutral-700 dark:bg-neutral-800 dark:text-neutral-200"
                  placeholder="Enter PIN"
              />
            </div>

            {/* Submit Button */}
            <div className="flex justify-center mt-4">
              <button
                  type="submit"
                  className="h-12 w-full md:w-1/2 rounded-full bg-primary px-6 font-semibold text-white hover:bg-primary-dark"
              >
                Submit Deposit
              </button>
            </div>
          </form>
        </div>
      </WidthWrapper>
  );
}
