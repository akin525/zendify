import List from "@/components/Element/List";
import { Pagination } from "@/components/Element/List/Pagination";
import { WidthWrapper } from "@/components/Layout";
import { useUnsettledTransactionData } from "../api/useTransactions";
import { useUnsettledTransactionsStore } from "@/stores/transactions";

const selectedKeys = ["trx", "amount", "createdAt", "status"];

const header = ["Transaction Number", "Amount", "Created At", "Status"];

export function UnsettledTransactions() {
  const { data, isPending, isError, isFetching, refetch } =
    useUnsettledTransactionData();

  const { handlePageChange } = useUnsettledTransactionsStore();

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
        />
      )}
    </WidthWrapper>
  );
}
