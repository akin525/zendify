import axios_instance from "@/lib/axios";
import { useQuery } from "@tanstack/react-query";

export async function getDashboard() {
    try {
        const response = await axios_instance.get(`/dashboard`);
        if (!response.data.success) {
            const errorMessage = response.data.message || "An error occurred!";
            throw new Error(errorMessage);
        }
        return response.data;
    } catch (error) {
        throw new Error("An error occured while getting dashboard stat!");
    }
}

export const useDashboard = () => {
    const { data, error, isPending } = useQuery({
        queryKey: ["dashboard"],
        queryFn: getDashboard,
        staleTime: 1000 * 60 * 5,
    });
    return { data, error, isPending };
}



export async function getDashboardChartSum() {
    try {
        const response = await axios_instance.get(`/chart-sum`);
        if (!response.data.success) {
            const errorMessage = response.data.message || "An error occurred!";
            throw new Error(errorMessage);
        }
        return response.data;
    } catch (error) {
        throw new Error("An error occured while getting dashboard stat!");
    }
}

export const useDashboardChartSum = () => {
    const { data, error, isPending } = useQuery({
        queryKey: ["dashboard-chart-sum"],
        queryFn: getDashboardChartSum,
        staleTime: 1000 * 60 * 20,
    });
    return { data, error, isPending };
}

export async function getDashboardChartCount() {
    try {
        const response = await axios_instance.get(`/chart-count`);
        if (!response.data.success) {
            const errorMessage = response.data.message || "An error occurred!";
            throw new Error(errorMessage);
        }
        return response.data;
    } catch (error) {
        throw new Error("An error occured while getting dashboard stat!");
    }
}

export const useDashboardChartCount = () => {
    const { data, error, isPending } = useQuery({
        queryKey: ["dashboard-chart-count"],
        queryFn: getDashboardChartCount,
        staleTime: 1000 * 60 * 20,
    });
    return { data, error, isPending };
}