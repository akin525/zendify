import List from "@/components/Element/List";
import { Pagination } from "@/components/Element/List/Pagination";
import { WidthWrapper } from "@/components/Layout";
import { useWalletTransactionsData } from "../api/useTransactions";
import { useWalletTransactionsStore } from "@/stores/transactions";
import { Notice } from "@/components/Element";

const selectedKeys = ["source", "amount", "balanceBefore", "balanceAfter", "type", "createdAt", "status"];

const header = ["Source", "Amount", "Bal Before", "Bal After", "Type", "Created At", "Status"];

export function WalletTransactions() {
  const { data, isPending, isError, isFetching, refetch } =
    useWalletTransactionsData();

  const { handlePageChange } = useWalletTransactionsStore();

  const handleRefresh = () => {
    handlePageChange(1);
    refetch();
  };

  return (
    <WidthWrapper>
      <Notice type="development" />

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
        />
      )}
    </WidthWrapper>
  );
}
