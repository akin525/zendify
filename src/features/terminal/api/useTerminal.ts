import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { getAllTerminal, getMappedTerminal, getTerminalDashboard, getTerminalSummary, getTerminalTransactions, getUnmappedTerminal } from "./terminals";
import { useAllTerminalStore, useMappedTerminalStore, useTerminalTransactionsStore, useUnmappedTerminalStore } from "@/stores/terminal";

export const useTerminalSummary = () => {
    return useQuery({
        queryKey: ["terminal-suummary"],
        queryFn: getTerminalSummary,
        staleTime: 1000 * 60 * 5,
    });
}

export const useAllTerminal = ({ page, config = {} }) => {
    return useQuery({
        ...config,
        queryKey: ["all-terminal", page],
        queryFn: () => getAllTerminal(page),
        placeholderData: keepPreviousData,
    });
};
export const useMappedTerminal = ({ page, config = {} }) => {
    return useQuery({
        ...config,
        queryKey: ["mapped-terminal", page],
        queryFn: () => getMappedTerminal(page),
        placeholderData: keepPreviousData,
    });
};
export const useUnmappedTerminal = ({ page, config = {} }) => {
    return useQuery({
        ...config,
        queryKey: ["unmapped-terminal", page],
        queryFn: () => getUnmappedTerminal(page),
        placeholderData: keepPreviousData,
    });
};
export const useTerminalTransactions = ({ payload, config = {} }) => {
    return useQuery({
        ...config,
        queryKey: ["terminal-transactions", payload.businessID, payload.page],
        queryFn: () => getTerminalTransactions(payload),
        placeholderData: keepPreviousData,
    });
};
export const useTerminalDashboard = ({ id, config = {} }) => {
    return useQuery({
        ...config,
        queryKey: ["terminal-dashboard", id],
        queryFn: () => getTerminalDashboard(id),
        // placeholderData: keepPreviousData,
    });
};

export const useAllTerminalPageData = () => {
    const { page } = useAllTerminalStore();
    return useAllTerminal({ page });
};

export const useMappedTerminalPageData = () => {
    const { page } = useMappedTerminalStore();
    return useMappedTerminal({ page });
}

export const useUnmappedTerminalPageData = () => {
    const { page } = useUnmappedTerminalStore();
    return useUnmappedTerminal({ page });
}

export const useTerminalTransactionsPageData = (businessId, config = {}) => {
    const { page } = useTerminalTransactionsStore();

    const payload = {
        page,
        businessId
    }
    return useTerminalTransactions({ payload, config });
}