import { create } from 'zustand';
import { MyStore } from './type';

export const useVirtualAccountsStore = create<MyStore>()((set) => ({
    page: 1,
    searchQuery: "",
    handlePageChange: (newPage) => set({ page: newPage }),
    handleSearch: (query) => set({ searchQuery: query || "", page: 1 }),
}));
export const useUnusedAssignedStore = create<MyStore>()((set) => ({
    page: 1,
    handlePageChange: (newPage) => set({ page: newPage }),
}));
export const useUnusedAssignedProvidusStore = create<MyStore>()((set) => ({
    page: 1,
    handlePageChange: (newPage) => set({ page: newPage }),
}));
export const useUnusedUnassignedStore = create<MyStore>()((set) => ({
    page: 1,
    handlePageChange: (newPage) => set({ page: newPage }),
}));