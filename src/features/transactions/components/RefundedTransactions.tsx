import List from "@/components/Element/List";
import { Pagination } from "@/components/Element/List/Pagination";
import { WidthWrapper } from "@/components/Layout";
import { useRefundedTransactionsStore } from "@/stores/transactions";
import { useRefundedTransactionData } from "../api/useTransactions";

const selectedKeys = ["trx", "amount", "created_at", "status"];

const header = ["Transaction Number", "Amount", "Created At", "Status"];

export function RefundedTransactions() {
  const { data, isPending, isError, isFetching, refetch } =
    useRefundedTransactionData();
  const { handlePageChange } = useRefundedTransactionsStore();

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
