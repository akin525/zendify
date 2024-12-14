export interface MyStore {
    page: string | number;
    searchQuery?: string;
    handlePageChange: (newPage: string | number) => void;
    handleSearch?: (query: string | null) => void;
}