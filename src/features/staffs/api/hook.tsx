import create from "zustand";

export const useStaffStore = create((set) => ({
  search: "",
  page: 1,
  handleSearch: (query) => set({ search: query }),
  handlePageChange: (page) => set({ page }),
}));
