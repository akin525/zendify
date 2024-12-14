import List from "@/components/Element/List";
import { WidthWrapper } from "@/components/Layout";
import { Pagination } from "@/components/Element/List/Pagination";
import { useUnusedAssignedProvidusAccountsData } from "../api/getVirtualAccounts";
import { useUnusedAssignedProvidusStore } from "@/stores/virtual-accounts";

const selectedKeys = ["accountName", "accountNumber", "email", "createdAt"];

const header = ["Account Name", "Account Number", "Email", "Created At"];

export function UnusedAssignedProvidusAccounts() {
  const { data, isPending, isError, isFetching, refetch } =
    useUnusedAssignedProvidusAccountsData();
  const { handlePageChange } = useUnusedAssignedProvidusStore();

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
        />
      )}
    </WidthWrapper>
  );
}
