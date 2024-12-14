import { create } from 'zustand';
import { MyStore } from './type';

export const useRefundsStore = create<MyStore>()((set) => ({
    page: 1,
    handlePageChange: (newPage) => set({ page: newPage }),
}));
