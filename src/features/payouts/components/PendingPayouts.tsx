import List from "@/components/Element/List";
import { WidthWrapper } from "@/components/Layout";
import { Pagination } from "@/components/Element/List/Pagination";
import { usePendingPayoutsData } from "../api/getPayouts";
import { usePendingPayoutStore } from "@/stores/payouts";

const selectedKeys = ["trx", "amount", "createdAt", "status"];

const header = ["Transaction Number", "Amount", "Created At", "Status"];

export function PendingPayouts() {
  const { data, isPending, isError, isFetching, refetch } =
    usePendingPayoutsData();
  const { handlePageChange } = usePendingPayoutStore();

  const handleRefresh = () => {
    handlePageChange(1);
    refetch();
  };
  return (
    <>
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
