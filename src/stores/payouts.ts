import { create } from 'zustand';
import { MyStore } from './type';



export const usePayoutsStore = create<MyStore>()((set) => ({
    page: 1,
    searchQuery: "",
    handlePageChange: (newPage) => set({ page: newPage }),
    handleSearch: (query) => set({ searchQuery: query || "", page: 1 }),
}));

export const usePendingPayoutStore = create<MyStore>()((set) => ({
    page: 1,
    handlePageChange: (newPage) => set({ page: newPage }),
}));





