import List from "@/components/Element/List";
import { WidthWrapper } from "@/components/Layout";
import { Pagination } from "@/components/Element/List/Pagination";
import { useSettlementsData } from "../api/useVirtualAccounts";
import { Notice } from "@/components/Element";
import { useSettlementsStore } from "@/stores/settlements";

const selectedKeys = ["totalAmount", "status", "createdAt"];

const header = ["Amount", "Status", "Created At"];

export function Settlements() {
  const { data, isPending, isError, isFetching, refetch } =
    useSettlementsData();
  const { handlePageChange } = useSettlementsStore();

  const handleRefresh = () => {
    handlePageChange(1);
    refetch();
  };

  return (
    <WidthWrapper>
      <Notice type={"development"} />

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
        />
      )}
    </WidthWrapper>
  );
}
