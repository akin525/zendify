import { StatCard } from "@/features/home/components/StatCard";
import { useTerminalSummary } from "../api/useTerminal";
import { useEffect, useState } from "react";
import { Add } from "iconsax-react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import Modal from "react-modal";
import storage from "@/utils/storage.ts";  // import react-modal

// Terminal tabs
const terminalTabs = [
  {
    id: 1,
    name: "All Terminal",
    path: "/terminal",
  },
  {
    id: 2,
    name: "Mapped Terminal",
    path: "/terminal/mapped",
  },
  {
    id: 3,
    name: "Unmapped Terminal",
    path: "/terminal/unmapped",
  },

];

// Modal Styles (you can customize this)
const modalStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    width: '400px',
  },
};

export default function Terminal() {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const { data, isPending } = useTerminalSummary();
  const [activeTab, setActiveTab] = useState(pathname);
  const [isModalOpen, setIsModalOpen] = useState(false); // Modal state
  const [isModalmap, setIsModalmap] = useState(false); // Modal state
  const [tid, setTid] = useState(""); // Terminal ID
  const [search, setSearch] = useState("");
  const [result, setResult] = useState(null);
  const [serialNumber, setSerialNumber] = useState(""); // Serial number
  const [posType, setPosType] = useState("MP35P"); // POS type (default to MP35P)
  const [loading, setLoading] = useState(false); // Loading state for API request
  const [error, setError] = useState(null); // Error state
  const baseUrl = import.meta.env.VITE_API_BASE_URL;

  useEffect(() => {
    setActiveTab(pathname);
  }, [pathname]);

  // Handle opening the modal
  const handleAddToBlacklist = () => {
    setIsModalOpen(true);
  };
  // const handleAddToMappped = () => {
  //   setIsModalmap(true);
  // };

  // Handle closing the modal
  const closeModal = () => {
    setIsModalOpen(false);
  };
  const closeModalmap = () => {
    setIsModalmap(false);
  };
  const getToken = () => {
    const data = storage.getToken();
    return data ? data?.token : "";
  }

  const token = getToken()
  // Handle form submission and API call
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    // Payload to send to the API
    const payload = {
      tid: tid,  // Terminal ID
      serial_number: serialNumber,  // Serial Number
      pos_type: posType,  // POS Type
    };

    try {
      const response = await fetch(`${baseUrl}/create_paylony_terminal`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: token ? `Bearer ${token}` : "", // Add your auth token here if needed
        },
        body: JSON.stringify(payload),
      });






      // Process the successful response
      const result = await response.json();
      if (!response.ok || result.success === false) {
        // If the request was not successful, capture the error message and form-specific errors
        throw new Error(result.message || "Failed to create terminal");
      }
      console.log("Terminal created successfully:", result);

      // Close modal and reset form after success
      setIsModalOpen(false);
      setTid("");
      setSerialNumber("");
      setPosType("MP35P");
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const debounceTime = 500;

  useEffect(() => {
    // Only search when the search query is not empty
    if (search.trim() === "") {
      setResult(null);
      return;
    }

    const timeoutId = setTimeout(async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await fetch(`${baseUrl}/find-business`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: token ? `Bearer ${token}` : "",
          },
          body: JSON.stringify({ search }),  // Send search term as payload
        });

        const result = await response.json();
        if (!response.ok || !result.success) {
          throw new Error(result.message || "Failed to find terminal");
        }

        // Store the result in state
        setResult(result);

      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    }, debounceTime);

    // Clear timeout if user types again before the debounce time
    return () => clearTimeout(timeoutId);

  }, [search]);

  return (
      <>
        <div className="container flex items-center justify-between pb-4">
          <h2 className="text-3xl font-bold text-neutral-700 dark:text-neutral-200 ">
            Terminal
          </h2>

          <button
              onClick={handleAddToBlacklist}
              className="flex min-h-10 items-center gap-1 rounded-lg bg-primary px-4 text-sm font-medium text-white disabled:bg-primary/80 dark:text-neutral-200"
          >
            <Add size={20} /> Create New
          </button>
          {/*<button*/}
          {/*    onClick={handleAddToMappped}*/}
          {/*    className="flex min-h-10 items-center gap-1 rounded-lg bg-primary px-4 text-sm font-medium text-white disabled:bg-primary/80 dark:text-neutral-200"*/}
          {/*>*/}
          {/*  <Add size={20} /> Map Terminal*/}
          {/*</button>*/}
        </div>

        {/* Modal for creating a new terminal */}
        <Modal
            isOpen={isModalOpen}
            onRequestClose={closeModal}
            style={modalStyles}
            contentLabel="Create New Terminal Modal"
            ariaHideApp={false}  // Disable accessibility warning
        >
          <h2 className="text-lg font-bold mb-4">Create New Terminal</h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label htmlFor="tid" className="block text-sm font-medium text-gray-700">
                Terminal ID (TID)
              </label>
              <input
                  id="tid"
                  type="text"
                  value={tid}
                  onChange={(e) => setTid(e.target.value)}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm"
                  placeholder="Enter terminal ID (e.g., 001)"
                  required
              />
            </div>

            <div className="mb-4">
              <label htmlFor="serialNumber" className="block text-sm font-medium text-gray-700">
                Serial Number
              </label>
              <input
                  id="serialNumber"
                  type="text"
                  value={serialNumber}
                  onChange={(e) => setSerialNumber(e.target.value)}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm"
                  placeholder="Enter serial number"
                  required
              />
            </div>

            <div className="mb-4">
              <label htmlFor="posType" className="block text-sm font-medium text-gray-700">
                POS Type
              </label>
              <select
                  id="posType"
                  value={posType}
                  onChange={(e) => setPosType(e.target.value)}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm"
              >
                <option value="MP35P">MP35P</option>
                <option value="T3">T3</option>
              </select>
            </div>

            {error && <p className="text-red-500">{error}</p>}

            <div className="flex justify-end">
              <button
                  type="button"
                  onClick={closeModal}
                  className="mr-2 inline-flex justify-center rounded-md border border-transparent bg-gray-500 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
              >
                Cancel
              </button>
              <button
                  type="submit"
                  className="inline-flex justify-center rounded-md border border-transparent bg-primary px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
                  disabled={loading}
              >
                {loading ? "Creating..." : "Create"}
              </button>
            </div>
          </form>
        </Modal>
        <Modal
            isOpen={isModalmap}
            onRequestClose={closeModalmap}
            style={modalStyles}
            contentLabel="Map Terminal"
            ariaHideApp={false}
        >
          <h2 className="text-lg font-bold mb-4">Search Terminal</h2>

          {/* Search Input */}
          <div className="mb-4">
            <label htmlFor="search" className="block text-sm font-medium text-gray-700">
              Search Terminal
            </label>
            <input
                id="search"
                type="search"
                value={search}
                onChange={(e) => setSearch(e.target.value)}  // Update search state on typing
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm"
                placeholder="Enter terminal ID or keyword"
                required
            />
          </div>

          {error && <p className="text-red-500">{error}</p>}

          {/* Display loading spinner while searching */}
          {loading && <p>Searching...</p>}

          {/* Display results and map button */}
          {result && result.data?.length > 0 && (
              <div className="mt-4">
                <h3 className="text-lg font-bold">Search Results</h3>
                {result.data.map((terminal) => (
                    <div key={terminal.id} className="p-2 border border-gray-300 rounded-md mt-2">
                      <p>Terminal ID: {terminal.tid}</p>
                      <p>Serial Number: {terminal.serial_number}</p>
                      <p>POS Type: {terminal.pos_type}</p>
                      <button
                          onClick={() => console.log("Display map for", terminal.tid)}
                          className="mt-2 inline-flex justify-center rounded-md border border-transparent bg-primary px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
                      >
                        View on Map
                      </button>
                    </div>
                ))}
              </div>
          )}

          {result && result.data?.length === 0 && (
              <p>No terminals found for the search query.</p>
          )}
        </Modal>


        <div className="container grid gap-4 pb-2 md:grid-cols-2 lg:grid-cols-2 ">
          <StatCard
              label="Mapped Terminals"
              isPending={isPending}
              value={data?.mapped}
          />
          <StatCard
              label="Unmapped Terminals"
              isPending={isPending}
              value={data?.unmapped}
          />
        </div>

        <div className="container flex flex-wrap items-center gap-4 border-b py-2 dark:border-neutral-700">
          {terminalTabs.map((tab) => (
              <div
                  onClick={() => navigate(tab?.path)}
                  key={tab.name}
                  className={`${activeTab === tab.path ? "bg-primary/10" : " "} flex min-h-8 min-w-[120px] cursor-pointer select-none items-center justify-center rounded-lg px-4 text-xs transition-all duration-300 hover:text-primary`}
              >
                <p
                    className={`${activeTab === tab.path ? " font-semibold text-primary" : "font-medium text-neutral-500 dark:text-neutral-300"}`}
                >
                  {tab.name}
                </p>
              </div>
          ))}
        </div>

        <Outlet />
      </>
  );
}
