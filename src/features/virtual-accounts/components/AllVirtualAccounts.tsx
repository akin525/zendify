import List from "@/components/Element/List";
import { WidthWrapper } from "@/components/Layout";
import { Pagination } from "@/components/Element/List/Pagination";
import { SearchBar } from "@/components/Element/SearchBar";
import { useVirtualAccountsData } from "../api/getVirtualAccounts";
import { useVirtualAccountsStore } from "@/stores/virtual-accounts";

const selectedKeys = ["accountName", "accountNumber", "email", "createdAt"];

const header = ["Account Name", "Account Number", "Email", "Created At"];

export function AllVirtualAccounts() {
  const { data, isPending, isError, isFetching, refetch } =
    useVirtualAccountsData();
  const { handlePageChange, handleSearch } = useVirtualAccountsStore();

  const handleRefresh = () => {
    handlePageChange(1);
    refetch();
  };

  return (
    <WidthWrapper>
      <SearchBar
        placeholder="Search Virtual Account..."
        onSearch={handleSearch}
      />

      <List
        header={header}
        selectedKeys={selectedKeys}
        isPending={isPending}
        isError={isError}
        isFetching={isFetching}
        handleRefresh={handleRefresh}
        data={data?.data?.data}
        refetch={refetch}
        type={"virtual-account"}
      />

      {data && (
        <Pagination
          isFetching={isFetching}
          handlePageChange={handlePageChange}
          data={data?.data?.links}
        />
      )}
    </WidthWrapper>
  );
}
