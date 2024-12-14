import List from "@/components/Element/List";
import { WidthWrapper } from "@/components/Layout";
import { Pagination } from "@/components/Element/List/Pagination";
import { useBusinessTransactionsData } from "../api/useTransactions";
import { useState } from "react";

const selectedKeys = ["trx", "amount", "createdAt", "status"];

const header = ["Transaction Number", "Amount", "Created At", "Status"];

export function BusinessTransactions({ businessId }) {
  const [page, setPage] = useState(1);

  const { data, isPending, isError, isFetching, refetch } =
    useBusinessTransactionsData({ businessId, page });

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
        type="transaction"
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
