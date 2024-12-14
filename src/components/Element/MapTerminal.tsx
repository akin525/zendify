import { useState, useEffect } from "react";
import storage from "@/utils/storage.ts";
const baseUrl = import.meta.env.VITE_API_BASE_URL;

const MapTerminal = () => {
    const [search, setSearch] = useState("");
    const [result, setResult] = useState(null); // For storing the search results
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const getToken = () => {
        const data = storage.getToken();
        return data ? data?.token : "";
    }

    const token = getToken()
    const debounceTime = 500; // Debounce time (500ms)

    useEffect(() => {
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

                setResult(result);  // Store the result in state
            } catch (error) {
                setError(error.message);
            } finally {
                setLoading(false);
            }
        }, debounceTime);

        return () => clearTimeout(timeoutId);  // Clear timeout if user types again

    }, [search]);  // Effect runs when the search input changes

    return (
        <div>
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

            {/* Display results */}
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
            </div>
        );
        };

        export default MapTerminal;
