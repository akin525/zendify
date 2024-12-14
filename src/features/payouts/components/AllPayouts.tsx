import List from "@/components/Element/List";
import { WidthWrapper } from "@/components/Layout";
import { Pagination } from "@/components/Element/List/Pagination";
import { SearchBar } from "@/components/Element/SearchBar";
import { usePayoutsData, usePendingPayoutsData } from "../api/getPayouts";
import { usePayoutsStore } from "@/stores/payouts";
import { StatCard } from "@/features/home/components/StatCard";

const selectedKeys = ["trx", "amount", "createdAt", "status"];

const header = ["Transaction Number", "Amount", "Created At", "Status"];

export function AllPayouts() {
  const { data, isPending, isError, isFetching, refetch } = usePayoutsData();
  const { handlePageChange, handleSearch } = usePayoutsStore();

  const { data: totalPendingPayouts, isPending: totalPendingPayoutsIsPending } =
    usePendingPayoutsData();

  const handleRefresh = () => {
    handlePageChange(1);
    refetch();
  };
  return (
    <>
      <WidthWrapper>
        <div className="mb-4 grid gap-4 md:grid-cols-2">
          <StatCard
            label="Total Payouts"
            value={data?.data?.total}
            isPending={isPending}
          />

          <StatCard
            label="Pending Payouts*"
            value={totalPendingPayouts?.data?.total}
            isPending={totalPendingPayoutsIsPending}
            route="/payouts/pending"
          />
        </div>

        <SearchBar
          placeholder="Enter keywords to search for payouts"
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
          type="payout"
        />

        {data && (
          <Pagination
            isFetching={isFetching}
            handlePageChange={handlePageChange}
            data={data?.data?.links}
          />
        )}
      </WidthWrapper>
    </>
  );
}
