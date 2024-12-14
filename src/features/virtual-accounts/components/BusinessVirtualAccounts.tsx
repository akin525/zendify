import List from "@/components/Element/List";
import { WidthWrapper } from "@/components/Layout";
import { Pagination } from "@/components/Element/List/Pagination";
import { useBusinessVirtualAccountsData } from "../api/useVirtualAccounts";
import { useState } from "react";

const selectedKeys = ["accountName", "accountNumber", "email", "createdAt"];

const header = ["Account Name", "Account Number", "Email", "Created At"];

export function BusinessVirtualAccounts({ businessId }) {
  const [page, setPage] = useState(1);

  const { data, isPending, isError, isFetching, refetch } =
      useBusinessVirtualAccountsData({ businessId, page });

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
            type={"virtual-account"}
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
