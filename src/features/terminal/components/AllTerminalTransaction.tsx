import List from "@/components/Element/List";
import { WidthWrapper } from "@/components/Layout";
import { Pagination } from "@/components/Element/List/Pagination";
import { useState, useEffect } from "react";
import axios from "axios";
import storage from "@/utils/storage.ts";
const baseUrl = import.meta.env.VITE_API_BASE_URL;
const selectedKeys = ["business_id","trx", "description", "amount", "createdAt", "status"];
const header = ["Business Id","Transaction Number", "Description", "Amount", "Created At", "Status"];

export default function TerminalTransactions() {
    const [page, setPage] = useState(1);
    const [data, setData] = useState(null);
    const [isPending, setIsPending] = useState(true);
    const [isError, setIsError] = useState(false);
    const [isFetching, setIsFetching] = useState(false);

    const getToken = () => {
        const tokenData = storage.getToken();
        return tokenData ? tokenData.token : "";
    };

    const token = getToken();

    const fetchData = async () => {
        setIsPending(true);
        setIsFetching(true);
        setIsError(false);
        try {
            const response = await axios.get(`${baseUrl}/all_terminal_transactions`, {
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

    const handlePageChange = (newPage: number) => {
        setPage(newPage);
    };

    const handleRefresh = () => {
        setPage(1);  // Reset to the first page on refresh
        fetchData();
    };

    return (
        <WidthWrapper>
            <List
                header={header}
                selectedKeys={selectedKeys}
                isPending={isPending}
                isError={isError}
                isFetching={isFetching}
                handleRefresh={handleRefresh}
                data={data?.data?.data} // Ensure response.data has the expected structure
                refetch={fetchData}
                type="terminalTransaction"
            />

            {data && (
                <Pagination
                    isFetching={isFetching}
                    handlePageChange={handlePageChange}
                    data={data?.data?.links} // Ensure pagination links exist here
                    page={page}
                />
            )}
        </WidthWrapper>
    );
}
