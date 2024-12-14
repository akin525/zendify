import { create } from 'zustand';
import { MyStore } from './type';

export const useTransactionsStore = create<MyStore>()((set) => ({
    page: 1,
    searchQuery: "",
    handlePageChange: (newPage) => set({ page: newPage }),
    handleSearch: (query) => set({ searchQuery: query || "", page: 1 }),
}));

export const useUnsettledTransactionsStore = create<MyStore>()((set) => ({
    page: 1,
    handlePageChange: (newPage) => set({ page: newPage }),
}));

export const useRefundedTransactionsStore = create<MyStore>()((set) => ({
    page: 1,
    handlePageChange: (newPage) => set({ page: newPage }),
}));

export const useWalletTransactionsStore = create<MyStore>()((set) => ({
    page: 1,
    handlePageChange: (newPage) => set({ page: newPage }),
}));



