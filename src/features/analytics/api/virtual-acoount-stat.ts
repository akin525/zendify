import axios_instance from "@/lib/axios";
import { useQuery } from "@tanstack/react-query";

export async function getVirtualAccountStat() {
    try {
        const response = await axios_instance.get(`/account-stats`);
        if (!response.data.success) {
            const errorMessage = response.data.message || "An error occurred!";
            throw new Error(errorMessage);
        }
        return response.data;
    } catch (error) {
        throw new Error("An error occured while getting dashboard stat!");
    }
}

export const useVirtualAccountStat = () => {
    const { data, error, isPending } = useQuery({
        queryKey: ["virtual-account-stat"],
        queryFn: getVirtualAccountStat,
        staleTime: 1000 * 60 * 5,
    });
    return { data, error, isPending };
}