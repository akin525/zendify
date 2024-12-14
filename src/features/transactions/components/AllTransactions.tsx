import List from "@/components/Element/List";
import {
  useRefundedTransactionData,
  useTransactionData,
  useUnsettledTransactionData,
} from "../api/useTransactions";
import { useTransactionsStore } from "@/stores/transactions";
import { WidthWrapper } from "@/components/Layout";
import { Pagination } from "@/components/Element/List/Pagination";
import { SearchBar } from "@/components/Element/SearchBar";
import { StatCard } from "@/features/home/components/StatCard";

const selectedKeys = ["trx", "amount", "createdAt", "status"];

const header = ["Transaction Number", "Amount", "Created At", "Status"];

export function AllTransactions() {
  const { data, isPending, isError, isFetching, refetch } =
    useTransactionData();
  const { handlePageChange, handleSearch } = useTransactionsStore();

  const { data: totalRefunded, isPending: totalRefundedIsPending } =
    useRefundedTransactionData();
  const { data: totalUnsettled, isPending: totalUnsettledIsPending } =
    useUnsettledTransactionData();

  const handleRefresh = () => {
    handlePageChange(1);
    refetch();
  };

  return (
    <WidthWrapper>
      <div className="mb-4 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <StatCard
          label="Total Transactions"
          value={data?.data?.total}
          isPending={isPending}
        />

        <StatCard
          label="Unsettled Transactions"
          value={totalUnsettled?.data?.total}
          isPending={totalUnsettledIsPending}
          route="/transactions/unsettled"
        />

        <StatCard
          label="Refunded Transactions"
          value={totalRefunded?.data?.total}
          isPending={totalRefundedIsPending}
          route="/transactions/refunded"
        />
      </div>

      <SearchBar
        placeholder="Enter keywords to search for transactions"
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
