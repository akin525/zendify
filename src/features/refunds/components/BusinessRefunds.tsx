import List from "@/components/Element/List";
import { WidthWrapper } from "@/components/Layout";
import { Pagination } from "@/components/Element/List/Pagination";
import { useBusinessRefundsData } from "../api/useRefunds";
import { useState } from "react";

const selectedKeys = ["amount", "refundedBy", "status", "createdAt"];

const header = ["Amount", "Refunded By", "status", "Created At"];

export function BusinessRefunds({ businessId }) {
  const [page, setPage] = useState(1);

  const { data, isPending, isError, isFetching, refetch, error } =
    useBusinessRefundsData({ businessId, page });

  const handlePageChange = (page: number) => {
    setPage(page);
  };

  const handleRefresh = () => {
    handlePageChange(1);
    refetch();
  };

  return (
    <WidthWrapper>
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

      {data && (
        <Pagination
          isFetching={isFetching}
          handlePageChange={handlePageChange}
          data={data?.data?.links}
          page={page}
        />
      )}
    </WidthWrapper>
  );
}
