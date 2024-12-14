import { keepPreviousData, useQuery } from "@tanstack/react-query";
import {getBusinessKYC, getBusinessPendingKYC, getKYCDetails} from "./complianceApi";
import { useBusinessKYCRequestStore } from "@/stores/compliance";

export const useBusinessPendingKYC = (config = {}) => {
    const { page } = useBusinessKYCRequestStore();
    return useQuery({
        ...config,
        queryKey: ["business-pending-kyc", page],
        queryFn: () => getBusinessPendingKYC(page),
        placeholderData: keepPreviousData,
    });
};
export const useBusinessKYC = (config = {}) => {
    const { page } = useBusinessKYCRequestStore();
    return useQuery({
        ...config,
        queryKey: ["business-kyc", page],
        queryFn: () => getBusinessKYC(page),
        placeholderData: keepPreviousData,
    });
};

export const useKYCDetails = (id: number, config = {}) => {
    return useQuery({
        ...config,
        queryKey: ["kyc-details", id],
        queryFn: () => getKYCDetails(id),
        placeholderData: keepPreviousData,
        staleTime: Infinity,
    });
};