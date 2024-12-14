import List from "@/components/Element/List";
import { WidthWrapper } from "@/components/Layout";
import { Pagination } from "@/components/Element/List/Pagination";
import { SearchBar } from "@/components/Element/SearchBar";
import { useRefundsData } from "../api/refunds";
import { useRefundsStore } from "@/stores/refunds";
// import { RetryFetch } from "@/components/Element/Retry";

const selectedKeys = ["amount", "refundedBy", "status", "createdAt"];

const header = ["Amount", "Refunded By", "status", "Created At"];

export function AllRefunds() {
  const { data, isPending, isError, isFetching, refetch, error } =
    useRefundsData();
  const { handlePageChange, handleSearch } = useRefundsStore();

  const handleRefresh = () => {
    handlePageChange(1);
    refetch();
  };

  return (
    <WidthWrapper>
      <SearchBar
        placeholder="still in development"
        disabled
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
        error={error?.message || "An error occurred while getting refunds!"}
      />

      {/* {isError && !isFetching && (
        <>
          <RetryFetch refetch={refetch} error={error} />
        </>
      )} */}

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
