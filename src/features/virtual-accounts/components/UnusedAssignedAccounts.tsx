import List from "@/components/Element/List";
import { WidthWrapper } from "@/components/Layout";
import { Pagination } from "@/components/Element/List/Pagination";
import { useUnusedAssignedAccountsData } from "../api/getVirtualAccounts";
import { useUnusedAssignedStore } from "@/stores/virtual-accounts";

const selectedKeys = ["accountName", "accountNumber", "email", "createdAt"];

const header = ["Account Name", "Account Number", "Email", "Created At"];

export function UnusedAssignedAccounts() {
  const { data, isPending, isError, isFetching, refetch } =
    useUnusedAssignedAccountsData();
  const { handlePageChange } = useUnusedAssignedStore();

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
