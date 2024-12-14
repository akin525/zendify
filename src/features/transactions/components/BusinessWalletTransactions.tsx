import List from "@/components/Element/List";
import { Pagination } from "@/components/Element/List/Pagination";
import { WidthWrapper } from "@/components/Layout";
import { useBusinessWalletTransactions } from "../api/useTransactions";
// import { Notice } from "@/components/Element";
import { useState } from "react";

const selectedKeys = ["source", "amount", "balanceBefore", "balanceAfter", "type", "createdAt", "status"];

const header = ["Source", "Amount", "Bal Before", "Bal After", "Type", "Created At", "Status"];

export function BusinessWalletTransactions({ businessId }) {
  const [page, setPage] = useState(1);

  const { data, isPending, isError, isFetching, error, refetch } =
    useBusinessWalletTransactions({ businessId, page });

  const handlePageChange = (page: number) => {
    setPage(page);
  };

  const handleRefresh = () => {
    handlePageChange(1);
    refetch();
  };

  return (
    <WidthWrapper>
      {/* <Notice type="development" /> */}

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
        error={error?.message}
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
