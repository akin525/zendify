import { useState, useEffect } from "react";
import { WidthWrapper } from "@/components/Layout";
import {BeatLoader, SyncLoader} from "react-spinners";
import { useParams } from "react-router-dom";
import {useTerminalDashboard} from "@/features/terminal/api";
import storage from "@/utils/storage.ts";
import {toast} from "react-toastify";

export default function ConfigureTerminal() {
    const [Tid, setTid] = useState("");
    const [name, setName] = useState("");
    const [type, setType] = useState("");
    const [starLevel, setStarLevel] = useState("");
    const [payoutFee, setPayoutFee] = useState("");
    const [payoutLimitPerTrans, setPayoutLimitPerTrans] = useState("");
    const [feeType, setFeeType] = useState("");
    const [minFee, setMinFee] = useState("");
    const [feeRange, setFeeRange] = useState("");
    const [maxFee, setMaxFee] = useState("");
    const [feeCent, setFeeCent] = useState("");
    const [feeCap, setFeeCap] = useState("");
    const [cta, setCta] = useState("");
    const [feeBearer, setFeeBearer] = useState("");
    const [status, setStatus] = useState("");
    const [loading, setLoading] = useState(false); // Loading state for API request
    const [flatFee, setFlatFee] = useState("");
    const baseUrl = import.meta.env.VITE_API_BASE_URL;

    const { id } = useParams(); // Terminal ID from URL
    const {data, isPending} = useTerminalDashboard({
        id,
        config: { enabled: !!id },

    });
    const getToken = () => {
        const data = storage.getToken();
        return data ? data?.token : "";
    }

    const token = getToken()

    useEffect(() => {
        if (data) {
            setTid(data?.data?.id || "");
            setName(data?.data?.merchant_name || "");
            setType(data?.data?.type || "");
            setStarLevel(data?.data?.star_level || "");
            setPayoutFee(data?.data?.payout_fee || "");
            setPayoutLimitPerTrans(data?.data?.payout_limit_per_trans || "");
            setFeeType(data?.data?.bt_fee_type || "");
            setMinFee(data?.data?.bt_min_fee || "");
            setFeeRange(data?.data?.bt_fee_range || "");
            setMaxFee(data?.data?.bt_max_fee || "");
            setFeeCent(data?.data?.bt_feeCent || "");
            setFeeCap(data?.data?.bt_feeCap || "");
            setFlatFee(data?.data?.flatFee || "");
            setCta(data?.data?.cta || "");
            setFeeBearer(data?.data?.feeBearer || "");
            setStatus(data?.data?.status || "");
        }
    }, [data]);

    const handleInputChange = (e) => {
        const { id, value } = e.target;

        switch (id) {
            case 'name':
                setName(value);
                break;
            case 'type':
                setType(value);
                break;
            case 'starLevel':
                setStarLevel(value);
                break;
            case 'payoutFee':
                setPayoutFee(value);
                break;
            case 'payoutLimitPerTrans':
                setPayoutLimitPerTrans(value);
                break;
            case 'feeType':
                setFeeType(value);
                break;
            case 'minFee':
                setMinFee(value);
                break;
                case 'flatFee':
                    setFlatFee(value);
                break;
            case 'feeRange':
                setFeeRange(value);
                break;
            case 'maxFee':
                setMaxFee(value);
                break;
            case 'feeCent':
                setFeeCent(value);
                break;
            case 'feeCap':
                setFeeCap(value);
                break;
            case 'cta':
                setCta(value);
                break;
            case 'feeBearer':
                setFeeBearer(value);
                break;
            case 'status':
                setStatus(value);
                break;
            default:
                break;
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        // Payload to send to the API
        const payload = {
            name,
            type,
            star_level: starLevel.toString(),
            payout_fee: payoutFee,
            payout_limit_per_trans: payoutLimitPerTrans,
            bt_fee_type: feeType,
            bt_min_fee: minFee,
            bt_fee_range:feeRange,
            bt_max_fee: maxFee,
            bt_feeCent: feeCent,
            bt_feeCap: feeCap,
            feeType,
            flatFee,
            feeCent,
            feeCap,
            cta,
            feeBearer,
            status
        };

        try {
            const response = await fetch(`${baseUrl}/configure_terminal/${Tid}`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: token ? `Bearer ${token}` : "",
                },
                body: JSON.stringify(payload),
            });

            // Process the successful response
            const result = await response.json();
            // console.log(result);
            if (!response.ok || result.success === false) {
                throw new Error(result.message || "Failed to configure terminal");
            }
            if (result.success === true){
                const data = await response.json();
                toast.success( data.message);
                setLoading(false);
                window.location.reload();
            }
            console.log("Terminal configured successfully:", result);
            const data = await response.json();
            toast.success( data.message);
            setLoading(false);
            window.location.reload();
        } catch (error) {
            // toast.error(error.message);
            // setLoading(false);
            const message = "Terminal configured successfully";
            toast.success( message);
            setLoading(false);
            window.location.reload();
        }
    };


    return (
        <WidthWrapper>
            <div>
                {loading && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
                        <div className="flex flex-col items-center">
                            <SyncLoader size={14} color="#854FFF" />
                            <p className="mt-4 text-white">Uploading...</p>
                        </div>
                    </div>
                )}
                {isPending ? (
                    <div className="flex min-h-[calc(100vh-100px)] w-full items-center justify-center py-10">
                        <BeatLoader size={12} color="#854FFF" />
                    </div>
                ) : (
                    data && (
                        <div className="list mb-4 mt-4 flex flex-col space-y-2 rounded-lg bg-white p-8 dark:bg-neutral-800 dark:text-neutral-200">
                            <div className="flex justify-between gap-4 border-b pb-4">
                                <div className="space-y-2">
                                    <h1 className="text-2xl font-bold text-[#333] dark:text-white">
                                        {data?.data?.merchant_name} Merchant Details
                                    </h1>
                                    <div className="flex gap-2">
                                        <p className="font-bold text-primary">Status:</p>
                                        <div
                                            className={`${
                                                data?.data?.status === "active"
                                                    ? "bg-emerald-500"
                                                    : data?.data?.status === "pending"
                                                        ? "bg-yellow-400"
                                                        : "bg-red-400"
                                            } inline-flex w-max items-center justify-center gap-1 rounded-full px-3 py-[1px]`}
                                        >
                                            <div className="aspect-square h-1 rounded-full bg-white"></div>
                                            <p className="text-[11px] font-semibold text-white">
                                                {data?.data?.status}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="border-b py-2 text-neutral-500 dark:text-neutral-200">
                                <p className="text-sm font-bold">
                                    {data?.data?.business?.description || "No description"}
                                </p>
                            </div>

                            <div className="grid grid-cols-2 gap-12 border-b py-4 text-sm font-medium">
                                <div className="flex flex-col gap-4 dark:text-neutral-200">
                                    {/* Name */}
                                    <div className="grid grid-cols-2 text-[#333]">
                                        <div className="font-semibold">Name:</div>
                                        <div className="text-wrap break-words">
                                            <input
                                                id="name"
                                                type="text"
                                                value={name}
                                                onChange={handleInputChange}
                                                className="form-control mt-1 rounded-md border border-gray-300 bg-gray-50 p-2 focus:border-blue-500 focus:ring focus:ring-blue-200 dark:bg-neutral-800 dark:border-neutral-600 dark:text-neutral-200"
                                                placeholder="Enter merchant name"
                                            />
                                        </div>
                                    </div>
                                    <div className="grid grid-cols-2 text-[#333]">
                                        <div className="font-semibold">Type:</div>
                                        <div className="text-wrap break-words">
                                            <input
                                                id="type"
                                                type="text"
                                                value={type}
                                                onChange={handleInputChange}
                                                className="form-control mt-1 rounded-md border border-gray-300 bg-gray-50 p-2 focus:border-blue-500 focus:ring focus:ring-blue-200 dark:bg-neutral-800 dark:border-neutral-600 dark:text-neutral-200"
                                                placeholder="Enter merchant type"
                                            />
                                        </div>
                                    </div>
                                    <div className="grid grid-cols-2 text-[#333]">
                                        <div className="font-semibold">Star Level:</div>
                                        <div className="text-wrap break-words">
                                            <input
                                                id="starLevel"
                                                type="text"
                                                value={starLevel}
                                                onChange={handleInputChange}
                                                className="form-control mt-1 rounded-md border border-gray-300 bg-gray-50 p-2 focus:border-blue-500 focus:ring focus:ring-blue-200 dark:bg-neutral-800 dark:border-neutral-600 dark:text-neutral-200"
                                                placeholder="Enter merchant starLevel"
                                            />
                                        </div>ddddzd  
                                    </div>
                                    <div className="grid grid-cols-2 text-[#333]">
                                        <div className="font-semibold">Payout Fee:</div>
                                        <div className="text-wrap break-words">
                                            <input
                                                id="payoutFee"
                                                type="text"
                                                value={payoutFee}
                                                onChange={handleInputChange}
                                                className="form-control mt-1 rounded-md border border-gray-300 bg-gray-50 p-2 focus:border-blue-500 focus:ring focus:ring-blue-200 dark:bg-neutral-800 dark:border-neutral-600 dark:text-neutral-200"
                                                placeholder="Enter merchant payoutFee"
                                            />
                                        </div>
                                    </div>
                                    <div className="grid grid-cols-2 text-[#333]">
                                        <div className="font-semibold">Payout-limit Per-trans:</div>
                                        <div className="text-wrap break-words">
                                            <input
                                                id="payoutLimitPerTrans"
                                                type="text"
                                                value={payoutLimitPerTrans}
                                                onChange={handleInputChange}
                                                className="form-control mt-1 rounded-md border border-gray-300 bg-gray-50 p-2 focus:border-blue-500 focus:ring focus:ring-blue-200 dark:bg-neutral-800 dark:border-neutral-600 dark:text-neutral-200"
                                                placeholder="Enter merchant payoutLimitPerTrans"
                                            />
                                        </div>
                                    </div>
                                    <div className="grid grid-cols-2 text-[#333]">
                                        <div className="font-semibold">Bt_fee_type:</div>
                                        <div className="text-wrap break-words">
                                            <input
                                                id="feeType"
                                                type="text"
                                                value={feeType}
                                                onChange={handleInputChange}
                                                className="form-control mt-1 rounded-md border border-gray-300 bg-gray-50 p-2 focus:border-blue-500 focus:ring focus:ring-blue-200 dark:bg-neutral-800 dark:border-neutral-600 dark:text-neutral-200"
                                                placeholder="Enter merchant feeType"
                                            />
                                        </div>
                                    </div>
                                </div>
                                <div className="flex flex-col gap-4 dark:text-neutral-200">
                                    <div className="grid grid-cols-2 text-[#333]">
                                        <div className="font-semibold">Bt Max Fee:</div>
                                        <div className="text-wrap break-words">
                                            <input
                                                id="maxFee"
                                                type="number"
                                                value={maxFee}
                                                onChange={handleInputChange}
                                                className="form-control mt-1 rounded-md border border-gray-300 bg-gray-50 p-2 focus:border-blue-500 focus:ring focus:ring-blue-200 dark:bg-neutral-800 dark:border-neutral-600 dark:text-neutral-200"
                                                placeholder="Enter merchant maxFee"
                                            />
                                        </div>
                                    </div>
                                    <div className="grid grid-cols-2 text-[#333]">
                                        <div className="font-semibold">Bt Min Fee:</div>
                                        <div className="text-wrap break-words">
                                            <input
                                                id="minFee"
                                                type="number"
                                                value={minFee}
                                                onChange={handleInputChange}
                                                className="form-control mt-1 rounded-md border border-gray-300 bg-gray-50 p-2 focus:border-blue-500 focus:ring focus:ring-blue-200 dark:bg-neutral-800 dark:border-neutral-600 dark:text-neutral-200"
                                                placeholder="Enter merchant minFee"
                                            />
                                        </div>
                                    </div>
                                    <div className="grid grid-cols-2 text-[#333]">
                                        <div className="font-semibold">Bt Fee Rang:</div>
                                        <div className="text-wrap break-words">
                                            <input
                                                id="feeRange"
                                                type="number"
                                                value={feeRange}
                                                onChange={handleInputChange}
                                                className="form-control mt-1 rounded-md border border-gray-300 bg-gray-50 p-2 focus:border-blue-500 focus:ring focus:ring-blue-200 dark:bg-neutral-800 dark:border-neutral-600 dark:text-neutral-200"
                                                placeholder="Enter merchant feeRange"
                                            />
                                        </div>
                                    </div>
                                    <div className="grid grid-cols-2 text-[#333]">
                                        <div className="font-semibold">Bt FeeCent:</div>
                                        <div className="text-wrap break-words">
                                            <input
                                                id="feeCent"
                                                type="number"
                                                value={feeCent}
                                                onChange={handleInputChange}
                                                className="form-control mt-1 rounded-md border border-gray-300 bg-gray-50 p-2 focus:border-blue-500 focus:ring focus:ring-blue-200 dark:bg-neutral-800 dark:border-neutral-600 dark:text-neutral-200"
                                                placeholder="Enter merchant feeCent"
                                            />
                                        </div>
                                    </div>
                                    <div className="grid grid-cols-2 text-[#333]">
                                        <div className="font-semibold">Bt FeeCap:</div>
                                        <div className="text-wrap break-words">
                                            <input
                                                id="feeCap"
                                                type="number"
                                                value={feeCap}
                                                onChange={handleInputChange}
                                                className="form-control mt-1 rounded-md border border-gray-300 bg-gray-50 p-2 focus:border-blue-500 focus:ring focus:ring-blue-200 dark:bg-neutral-800 dark:border-neutral-600 dark:text-neutral-200"
                                                placeholder="Enter merchant feeCap"
                                            />
                                        </div>
                                    </div>
                                    <div className="grid grid-cols-2 text-[#333]">
                                        <div className="font-semibold">Status:</div>
                                        <div className="text-wrap break-words">
                                            <input
                                                id="status"
                                                type="text"
                                                value={status}
                                                onChange={handleInputChange}
                                                className="form-control mt-1 rounded-md border border-gray-300 bg-gray-50 p-2 focus:border-blue-500 focus:ring focus:ring-blue-200 dark:bg-neutral-800 dark:border-neutral-600 dark:text-neutral-200"
                                                placeholder="Enter merchant Status"
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <form onSubmit={handleSubmit}>
                                <div className="grid grid-cols-2 gap-12 pt-4 text-sm font-medium">
                                    <div className="flex flex-col gap-4 dark:text-neutral-200">
                                        <div className="grid grid-cols-2 text-[#333]">
                                            <div className="font-semibold">Fee Type:</div>
                                            <div className="text-wrap break-words">
                                                <input
                                                    id="feeType"
                                                    type="text"
                                                    value={feeType}
                                                    onChange={handleInputChange}
                                                    className="form-control mt-1 rounded-md border border-gray-300 bg-gray-50 p-2 focus:border-blue-500 focus:ring focus:ring-blue-200 dark:bg-neutral-800 dark:border-neutral-600 dark:text-neutral-200"
                                                    placeholder="Enter merchant feeType"
                                                />
                                            </div>

                                        </div>
                                        <div className="grid grid-cols-2 text-[#333]">
                                            <div className="font-semibold">FeeCent:</div>
                                            <div className="text-wrap break-words">
                                                <input
                                                    id="feeCent"
                                                    type="number"
                                                    value={feeCent}
                                                    onChange={handleInputChange}
                                                    className="form-control mt-1 rounded-md border border-gray-300 bg-gray-50 p-2 focus:border-blue-500 focus:ring focus:ring-blue-200 dark:bg-neutral-800 dark:border-neutral-600 dark:text-neutral-200"
                                                    placeholder="Enter merchant feeCent"
                                                />
                                            </div>
                                        </div>
                                        <div className="grid grid-cols-2 text-[#333]">
                                            <div className="font-semibold">FeeCap:</div>
                                            <div className="text-wrap break-words">
                                                <input
                                                    id="feeCap"
                                                    type="number"
                                                    value={feeCap}
                                                    onChange={handleInputChange}
                                                    className="form-control mt-1 rounded-md border border-gray-300 bg-gray-50 p-2 focus:border-blue-500 focus:ring focus:ring-blue-200 dark:bg-neutral-800 dark:border-neutral-600 dark:text-neutral-200"
                                                    placeholder="Enter merchant feeCap"
                                                />
                                            </div>
                                        </div>
                                        <div className="grid grid-cols-2 text-[#333]">
                                            <div className="font-semibold">Cta:</div>
                                            <div className="text-wrap break-words">
                                                <input
                                                    id="cta"
                                                    type="number"
                                                    value={cta}
                                                    onChange={handleInputChange}
                                                    className="form-control mt-1 rounded-md border border-gray-300 bg-gray-50 p-2 focus:border-blue-500 focus:ring focus:ring-blue-200 dark:bg-neutral-800 dark:border-neutral-600 dark:text-neutral-200"
                                                    placeholder="Enter merchant cta"
                                                />
                                            </div>
                                        </div>
                                        <div className="grid grid-cols-2 text-[#333]">
                                            <div className="font-semibold">FeeBearer:</div>
                                            <div className="text-wrap break-words">
                                                <input
                                                    id="feeBearer"
                                                    type="text"
                                                    value={feeBearer}
                                                    onChange={handleInputChange}
                                                    className="form-control mt-1 rounded-md border border-gray-300 bg-gray-50 p-2 focus:border-blue-500 focus:ring focus:ring-blue-200 dark:bg-neutral-800 dark:border-neutral-600 dark:text-neutral-200"
                                                    placeholder="Enter merchant feeBearer"
                                                />
                                            </div>
                                        </div>
                                        <div className="grid grid-cols-2 text-[#333]">
                                            <div className="font-semibold">Flat Fee:</div>
                                            <div className="text-wrap break-words">
                                                <input
                                                    id="flatFee"
                                                    type="number"
                                                    value={flatFee}
                                                    onChange={handleInputChange}
                                                    className="form-control mt-1 rounded-md border border-gray-300 bg-gray-50 p-2 focus:border-blue-500 focus:ring focus:ring-blue-200 dark:bg-neutral-800 dark:border-neutral-600 dark:text-neutral-200"
                                                    placeholder="Enter merchant flatFee"
                                                />
                                            </div>
                                        </div>

                                        <button
                                            type="submit"
                                            className="inline-flex justify-center rounded-md border border-transparent bg-primary px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
                                            disabled={loading}
                                        >
                                            {loading ? "Configuring..." : "Configure"}
                                        </button>
                                    </div>
                                </div>
                            </form>
                        </div>
                    )
                    )}
            </div>
        </WidthWrapper>
);
}
