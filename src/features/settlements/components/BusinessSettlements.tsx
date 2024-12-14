import List from "@/components/Element/List";
import { WidthWrapper } from "@/components/Layout";
import { Pagination } from "@/components/Element/List/Pagination";
import { useState } from "react";
import { useBusinessSettlementsData } from "../api/useVirtualAccounts";

const selectedKeys = ["totalAmount", "status", "createdAt"];

const header = ["Amount", "Status", "Created At"];

export function BusinessSettlements({ businessId }) {
  const [page, setPage] = useState(1);

  const { data, isPending, isError, isFetching, refetch } =
    useBusinessSettlementsData({ businessId, page });

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
