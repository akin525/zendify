import { create } from 'zustand';
import { MyStore } from './type';

// export const useTransactionsStore = create<MyStore>()((set) => ({
//     page: 1,
//     searchQuery: "",
//     handlePageChange: (newPage) => set({ page: newPage }),
//     handleSearch: (query) => set({ searchQuery: query || "", page: 1 }),
// }));

export const useAllTerminalStore = create<MyStore>()((set) => ({
    page: 1,
    handlePageChange: (newPage) => set({ page: newPage }),
}));
export const useMappedTerminalStore = create<MyStore>()((set) => ({
    page: 1,
    handlePageChange: (newPage) => set({ page: newPage }),
}));
export const useUnmappedTerminalStore = create<MyStore>()((set) => ({
    page: 1,
    handlePageChange: (newPage) => set({ page: newPage }),
}));
export const useTerminalTransactionsStore = create<MyStore>()((set) => ({
    page: 1,
    handlePageChange: (newPage) => set({ page: newPage }),
}));
