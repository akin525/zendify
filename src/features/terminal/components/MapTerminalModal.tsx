// import React, { useState, useEffect } from "react";
import { useState, useEffect } from "react";
import Modal from "react-modal"; // Ensure you have react-modal installed
import storage from "@/utils/storage.ts"; // Adjust path if needed

// Custom styles for the modal
const customStyles = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
        width: '400px',
        padding: '20px',
        borderRadius: '10px',
    },
};

const MapTerminalModal = ({ isOpen, onClose, terminalId, onMapTerminal }) => {
    const [searchQuery, setSearchQuery] = useState("");
    // const [businesses, setBusinesses] = useState([]);
    // const [setBusinesses] = useState([]);
    const [selectedBusinessId, setSelectedBusinessId] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [result, setResult] = useState(null);

    const baseUrl = import.meta.env.VITE_API_BASE_URL; // Ensure environment variable is set
    const debounceTime = 500; // Delay before search is triggered (500ms)

    // Get token from storage
    const getToken = () => {
        const data = storage.getToken();
        return data ? data.token : "";
    };

    const token = getToken();

    // useEffect to handle search with debounce
    useEffect(() => {
        // if (searchQuery.trim() === "") {
        //     setBusinesses([]); // Clear results if search is empty
        //     return;
        // }

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
                    body: JSON.stringify({ search: searchQuery }), // Send search query in body
                });

                const result = await response.json();
                if (!response.ok || !result.success) {
                    throw new Error(result.message || "Failed to find businesses");
                }

                setResult(result); // Update with fetched businesses
            } catch (error) {
                setError(error.message);
            } finally {
                setLoading(false);
            }
        }, debounceTime);

        return () => clearTimeout(timeoutId); // Clear timeout if user types again
    }, [searchQuery, baseUrl, token]);

    const handleMap = () => {
        if (selectedBusinessId) {
            onMapTerminal(terminalId, selectedBusinessId);
        } else {
            alert("Please select a business before mapping.");
        }
    };

    return (
        <Modal isOpen={isOpen} onRequestClose={onClose} style={customStyles}>
            <div>
                <h2>Map Terminal to Business</h2>

                {/* Close Button */}
                <button onClick={onClose} style={{ float: "right", cursor: "pointer" }}>X</button>

                {/* Search Bar */}
                <div style={{ marginBottom: "10px" }}>
                    <input
                        type="text"
                        placeholder="Search Business Name"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        style={{ width: "100%", padding: "8px", marginBottom: "10px" }}
                    />
                </div>

                {/* Loading indicator */}
                {loading && <p>Loading...</p>}

                {/* Error message */}
                {error && <p style={{ color: "red" }}>{error}</p>}

                {/* Display search results */}
                <div style={{ maxHeight: "200px", overflowY: "auto" }}>
                    {result && result.data?.length > 0 ? (
                        <div>
                            <h3 className="text-lg font-bold">Search Results</h3>
                            <ul>
                                {result.data.map((business) => (
                                    <li key={business.id} className="p-2 border border-gray-300 rounded-md mt-2">
                                        <label>
                                            <input
                                                type="radio"
                                                name="business"
                                                value={business.id}
                                                onChange={() => setSelectedBusinessId(business.id)}
                                                style={{ marginRight: "10px" }}
                                            />
                                            {business.name}
                                        </label>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ) : (
                        !loading && <p>No businesses found for the search query.</p>
                    )}
                </div>

                {/* Map and Close Buttons */}
                <div style={{ marginTop: "20px", display: "flex", justifyContent: "space-between" }}>
                    <button onClick={handleMap} style={{ padding: "8px 12px", cursor: "pointer" }}>
                        Map Terminal
                    </button>
                    <button onClick={onClose} style={{ padding: "8px 12px", cursor: "pointer" }}>
                        Close
                    </button>
                </div>
            </div>
        </Modal>
    );
};

export default MapTerminalModal;
