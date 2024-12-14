import { WidthWrapper } from "@/components/Layout";
// import { useBusinessVirtualAccountsData } from "../api/useVirtualAccounts";
import { useState } from "react";
import axios from "axios";
import storage from "@/utils/storage.ts";
import {SyncLoader} from "react-spinners";
const baseUrl = import.meta.env.VITE_API_BASE_URL;
import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
export function CreateBusinessVirtualAccounts({ businessId }) {
  const [accountName, setAccountName] = useState("");
  // const { data, refetch } = useBusinessVirtualAccountsData({ businessId });
  const [loading, setLoading] = useState(false);

  const getToken = () => {
    const data = storage.getToken();
    return data ? data?.token : "";
  };

  const token = getToken();

  const handleAddAccount = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await axios.post(
          `${baseUrl}/add-additional-business-account/${businessId}`,
          {
            account_name: accountName,
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
      );

      // Accessing the response data
      const data = response.data;

      if (data.success) {
        // Extract wallet account details
        const { accountName, accountNumber, bankName } = data.wallet_acc;
        toast.success(
            `Account successfully added: ${accountName}, ${accountNumber}, ${bankName}`
        );
        setAccountName(""); // Clear the input field
      } else {
        toast.error("Failed to add additional business account");
      }
    } catch (error) {
      console.error("Error adding additional business account:", error);
      toast.error("Failed to add additional business account");
    } finally {
      setLoading(false);
    }
  };


  return (
      <WidthWrapper>
        {loading && (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
              <div className="flex flex-col items-center">
                <SyncLoader size={14} color="#854FFF" />
                <p className="mt-4 text-white">loading...</p>
              </div>
            </div>
        )}
        <form onSubmit={handleAddAccount} style={styles.form}>
          <label style={styles.label}>
            Account Name:
            <input
                type="text"
                value={accountName}
                onChange={(e) => setAccountName(e.target.value)}
                placeholder="Enter account name"
                required
                style={styles.input}
            />
          </label>
          <button type="submit" style={styles.button}>Add Account</button>
        </form>
      </WidthWrapper>
  );
}

const styles = {
  form: {
    display: "flex" as const,
    flexDirection: "column" as const,
    alignItems: "center" as const,
    gap: "1rem",
    padding: "1.5rem",
    maxWidth: "400px",
    margin: "0 auto",
    backgroundColor: "#f9f9f9",
    borderRadius: "8px",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
  },
  label: {
    fontSize: "1rem",
    color: "#333",
    display: "flex" as const,
    flexDirection: "column" as const,
    width: "100%",
  },
  input: {
    padding: "0.75rem",
    fontSize: "1rem",
    border: "1px solid #ddd",
    borderRadius: "4px",
    marginTop: "0.5rem",
    width: "100%",
    boxSizing: "border-box" as const,
  },
  button: {
    padding: "0.75rem 1.5rem",
    fontSize: "1rem",
    color: "#fff",
    backgroundColor: "#007bff",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
    transition: "background-color 0.3s",
  },
};

// Button hover effect for TypeScript compatibility
styles.button["&:hover"] = {
  backgroundColor: "#0056b3",
};
