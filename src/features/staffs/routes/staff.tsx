import List from "@/components/Element/List";
import { WidthWrapper } from "@/components/Layout";
import { Pagination } from "@/components/Element/List/Pagination";
import { useEffect, useState } from "react";
import storage from "@/utils/storage.ts";
import axios from "axios";
import {toast} from "react-toastify";

const selectedKeys = ["name", "username", "email", "role", "updated_at"];
const header = ["Name", "Username", "Email", "Role", "Updated At"];

// Permissions list for checkboxes
const permissions = [
    "manage_staff",
    "manage_user",
    "manage_business",
    "view_business",
    "compliance",
    "manage_virtual_account",
    "view_transactions",
    "settle_transaction",
    "view_payouts",
    "manage_payout",
    "manage_refund",
    "cashier_payout",
    "cashier_deposit",
    "fund_sweep",
    "view_audit_log",
    "setting",
];

export const Staff: React.FC = () => {
    const [page, setPage] = useState<number>(1);
    const [data, setData] = useState<any>(null);
    const [isPending, setIsPending] = useState<boolean>(true);
    const [isError, setIsError] = useState<boolean>(false);
    const [isFetching, setIsFetching] = useState<boolean>(false);
    const [isCreateModalOpen, setIsCreateModalOpen] = useState<boolean>(false);
    // const [isEditModalOpen, setIsEditModalOpen] = useState<boolean>(false);
    // const [editData, setEditData] = useState<any>(null);
    const [isSubmitting, setIsSubmitting] = useState<boolean>(false); // Loading state

    const [formData, setFormData] = useState<Record<string, any>>({
        name: "",
        username: "",
        email: "",
        password: "",
        role: "",
        ...Object.fromEntries(permissions.map((p) => [p, 0])), // Initialize all permissions as 0
    });

    const getToken = (): string => {
        const data = storage.getToken();
        return data?.token || "";
    };

    const token = getToken();
    const baseUrl = import.meta.env.VITE_API_BASE_URL;

    const fetchData = async (): Promise<void> => {
        setIsPending(true);
        setIsFetching(true);
        setIsError(false);
        try {
            const response = await axios.get(`${baseUrl}/staffs`, {
                params: { page },
                headers: {
                    "Content-Type": "application/json",
                    Authorization: token ? `Bearer ${token}` : "",
                },
            });
            setData(response.data);
        } catch (error) {
            setIsError(true);
        } finally {
            setIsPending(false);
            setIsFetching(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, [page]);

    const handlePageChange = (newPage: number): void => {
        setPage(newPage);
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, type, checked, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: type === "checkbox" ? (checked ? 1 : 0) : value,
        }));
    };

    const handleRefresh = (): void => {
        setPage(1);
        fetchData();
    };

    const handleOpenCreateModal = (): void => {
        setFormData({
            name: "",
            username: "",
            email: "",
            password: "",
            role: "",
            ...Object.fromEntries(permissions.map((p) => [p, 0])), // Reset permissions
        });
        setIsCreateModalOpen(true);
    };

    const handleCloseModal = (): void => {
        setIsCreateModalOpen(false);
        // setIsEditModalOpen(false);
        // setEditData(null);
    };

    const handleCreateStaff = async (): Promise<void> => {
        setIsSubmitting(true);
        try {
            await axios.post(`${baseUrl}/create-staff`, formData, {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: token ? `Bearer ${token}` : "",
                },
            });
            toast.success("Staff created successfully!", { position: "top-right" });
            handleCloseModal();
            fetchData();
        } catch (error) {
            toast.error(error.response?.data?.message || "Failed to create staff!", {
                position: "top-right",
            });
        }finally {
            setIsSubmitting(false);
        }
    };

    return (
        <WidthWrapper>
            {/* Create Staff Button */}
            <div className="flex justify-end mb-4">
                <button
                    onClick={handleOpenCreateModal}
                    className="bg-purple-700 rounded-full text-white px-6 py-3 shadow-md hover:bg-purple-800 transition duration-300"
                >
                    + Create Staff
                </button>
            </div>
            <List
                header={header}
                selectedKeys={selectedKeys}
                isPending={isPending}
                isError={isError}
                isFetching={isFetching}
                handleRefresh={handleRefresh}
                data={data?.data}
                refetch={fetchData}
                type={"staff"}
            />

            {data && (
                <Pagination
                    isFetching={isFetching}
                    handlePageChange={handlePageChange}
                    data={data?.data?.links}
                />
            )}

            {/* Create Staff Modal */}
            {isCreateModalOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center p-4">
                    <div className="bg-white p-6 rounded-lg shadow-lg w-[800px] max-w-[90%] mt-10 mb-10">
                        <h2 className="text-2xl font-semibold mb-4">Create Staff</h2>

                        {/* Grid Layout for Inputs */}
                        <div className="grid grid-cols-2 gap-4">
                            <input
                                className="w-full p-2 border rounded"
                                type="text"
                                name="name"
                                value={formData.name}
                                onChange={handleInputChange}
                                placeholder="Name"
                            />
                            <input
                                className="w-full p-2 border rounded"
                                type="text"
                                name="username"
                                value={formData.username}
                                onChange={handleInputChange}
                                placeholder="Username"
                            />
                            <input
                                className="w-full p-2 border rounded"
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleInputChange}
                                placeholder="Email"
                            />
                            <input
                                className="w-full p-2 border rounded"
                                type="text"
                                name="password"
                                value={formData.password}
                                onChange={handleInputChange}
                                placeholder="Password"
                            />
                            <input
                                className="w-full p-2 border rounded"
                                type="text"
                                name="role"
                                value={formData.role}
                                onChange={handleInputChange}
                                placeholder="Role"
                            />
                        </div>

                        {/* Permissions (Checkboxes) */}
                        <div className="grid grid-cols-2 gap-2 mt-4 max-h-[300px] overflow-y-auto">
                            {permissions.map((permission) => (
                                <label key={permission} className="flex items-center space-x-2 p-2 border rounded">
                                    <input
                                        type="checkbox"
                                        name={permission}
                                        checked={!!formData[permission]}
                                        onChange={handleInputChange}
                                        className="w-5 h-5"
                                    />
                                    <span className="text-gray-700 capitalize">{permission.replace(/_/g, " ")}</span>
                                </label>
                            ))}
                        </div>

                        {/* Buttons */}
                        <div className="flex justify-end space-x-2 mt-4">
                            <button
                                onClick={handleCloseModal}
                                className="px-4 py-2 bg-gray-300 rounded-md hover:bg-gray-400"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleCreateStaff}
                                className="px-4 py-2 bg-purple-500 text-white rounded-md hover:bg-purple-700 flex items-center"
                                disabled={isSubmitting}
                            >
                                {isSubmitting && (
                                    <svg
                                        className="animate-spin h-5 w-5 mr-2 text-white"
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                    >
                                        <circle
                                            className="opacity-25"
                                            cx="12"
                                            cy="12"
                                            r="10"
                                            stroke="currentColor"
                                            strokeWidth="4"
                                        ></circle>
                                        <path
                                            className="opacity-75"
                                            fill="currentColor"
                                            d="M4 12a8 8 0 018-8v8H4z"
                                        ></path>
                                    </svg>
                                )}
                                {isSubmitting ? "Creating..." : "Create"}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </WidthWrapper>
    );
};
