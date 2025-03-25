import { useState, useEffect } from "react";
import axios from "axios";
import storage from "@/utils/storage.ts";
import {toast} from "react-toastify";
const baseUrl = import.meta.env.VITE_API_BASE_URL;

const BusinessFeeUpdate = ({ data, id }) => {
  const [formData, setFormData] = useState({
    collection_fee: "",
    collection_cent: "",
    collection_cent_cap: "",
    checkout_fee_type: "",
    checkout_flat: "",
    checkout_cent: "",
    checkout_cent_cap: "",
    net_cent: "",
    net_cent_cap: "",
    net_fee_type: "",
    net_flat_fee: "",
    sh_fee_type: "",
    sh_flat_fee: "",
    sh_cent: "",
    sh_min_fee: "",
    sh_cent_cap: "",
    payout_fee: "",
    split_payment_fee: "",
    bvn_fee: "",
  });
  const getToken = () => {
    const data = storage.getToken();
    return data ? data?.token : "";
  };

  const token = getToken();
  const [loading, setLoading] = useState(false); // Loading state

  useEffect(() => {
    if (data?.business) {
      setFormData({
        collection_fee: data.business.collection_fee || "",
        collection_cent: data.business.collection_cent || "",
        collection_cent_cap: data.business.collection_cent_cap || "",
        checkout_fee_type: data.business.checkout_fee_type || "",
        checkout_flat: data.business.checkout_flat || "",
        checkout_cent: data.business.checkout_cent || "",
        checkout_cent_cap: data.business.checkout_cent_cap || "",
        net_cent: data.business.net_cent || "",
        net_cent_cap: data.business.net_cent_cap || "",
        net_fee_type: data.business.net_fee_type || "",
        net_flat_fee: data.business.net_flat_fee || "",
        sh_fee_type: data.business.sh_fee_type || "",
        sh_flat_fee: data.business.sh_flat_fee || "",
        sh_cent: data.business.sh_cent || "",
        sh_min_fee: data.business.sh_min_fee || "",
        sh_cent_cap: data.business.sh_cent_cap || "",
        payout_fee: data.business.payout_fee || "",
        split_payment_fee: data.business.split_payment_fee || "",
        bvn_fee: data.business.bvn_fee || "",
      });
    }
  }, [data]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await axios.post(
          `${baseUrl}/business/fee/update/${id}`,
          formData, // Pass formData as the request body
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: token ? `Bearer ${token}` : "",
            },
          }
      );
      const result = response.data;
      setLoading(false);
      if (result.success){
        toast.success(result.message)
      }else {
        toast.error(result.message)

      }

    } catch (error) {
      console.error("Error updating fees:", error);
      toast.error(error.message)

    }

    setLoading(false);
  };

  return (
      <div className="max-w-6xl mx-auto p-6 bg-white shadow-lg rounded-lg dark:bg-neutral-900 dark:text-white">
        <h1 className="text-2xl font-semibold mb-6 text-center">Update Business Fees</h1>

        <form onSubmit={handleSubmit} className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {Object.keys(formData).map((key) => (
              <div key={key} className="flex flex-col">
                <label className="font-medium text-gray-700 dark:text-gray-300 capitalize">
                  {key.replace(/_/g, " ")}
                </label>
                <input
                    type="text"
                    name={key}
                    value={formData[key]}
                    onChange={handleChange}
                    className="border px-3 py-2 rounded-md focus:ring-2 focus:ring-blue-500 dark:bg-neutral-800 dark:border-gray-600 dark:text-white"
                />
              </div>
          ))}

          {/* Submit Button */}
          <div className="col-span-1 sm:col-span-2 md:col-span-3 lg:col-span-4 flex justify-center mt-4">
            <button
                type="submit"
                disabled={loading}
                className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-2 rounded-md flex items-center gap-2 disabled:opacity-50"
            >
              {loading ? (
                  <>
                    <svg className="animate-spin h-5 w-5 text-white" viewBox="0 0 24 24">
                      <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                          fill="none"
                      ></circle>
                      <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 0116 0h-2a6 6 0 00-12 0H4z"
                      ></path>
                    </svg>
                    Updating...
                  </>
              ) : (
                  "Submit"
              )}
            </button>
          </div>
        </form>
      </div>
  );
};

export default BusinessFeeUpdate;
