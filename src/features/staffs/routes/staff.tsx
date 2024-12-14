import List from "@/components/Element/List";
import { WidthWrapper } from "@/components/Layout";
import { Pagination } from "@/components/Element/List/Pagination";
import {useEffect, useState} from "react";
import storage from "@/utils/storage.ts";
import axios from "axios";

const selectedKeys = ["name", "username", "email", "role", "created_at", "updated_at"];
const header = ["Name", "Username", "Email", "Role", "Created At", "Updated At"];

export function Staff() {
    const [page, setPage] = useState(1);
    const [data, setData] = useState(null);
    const [isPending, setIsPending] = useState(true);
    const [isError, setIsError] = useState(false);
    const [isFetching, setIsFetching] = useState(false);

    const getToken = () => {
        const data = storage.getToken();
        return data ? data?.token : "";
    }

    const token = getToken()

    const baseUrl = import.meta.env.VITE_API_BASE_URL;

    const fetchData = async () => {
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
    const handlePageChange = (newPage: number) => {
        setPage(newPage);
    };

    const handleRefresh = () => {
        setPage(1);
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
        </WidthWrapper>
    );
}
