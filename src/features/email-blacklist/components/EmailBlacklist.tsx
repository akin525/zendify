import { useEmailBlacklistData } from "../api/getEmailBlackList";
import { useEmailBlacklistStore } from "@/stores/email-blacklist";
import { WidthWrapper } from "@/components/Layout";
import List from "@/components/Element/List";
import { Pagination } from "@/components/Element/List/Pagination";
import { useModalStore } from "@/stores/modal";

const header: string[] = ["Email", "Status"];

const selectedKeys: string[] = ["email", "status"];

export function EmailBlacklist() {
  const { data, isPending, isError, isFetching, refetch, error } =
    useEmailBlacklistData();
  const { handlePageChange } = useEmailBlacklistStore();
  const { openModal } = useModalStore();

  // console.log(error?.message);

  const handleRefresh = () => {
    handlePageChange(1);
    refetch();
  };

  const handleAddToBlacklist = () => {
    openModal({ action: "add-email" });
  };

  return (
    <WidthWrapper>
      <div className="flex flex-col gap-4 pb-8">
        <button
          onClick={handleAddToBlacklist}
          className="min-h-12 w-max rounded-lg bg-secondary px-6 font-semibold text-white "
        >
          + Add To Blacklist
        </button>

        <List
          header={header}
          selectedKeys={selectedKeys}
          isPending={isPending}
          isError={isError}
          isFetching={isFetching}
          handleRefresh={handleRefresh}
          data={data?.data?.data}
          refetch={refetch}
          type="email"
          error={error?.message || "An error occurred while getting blacklist!"}
        />

        {data && (
          <Pagination
            isFetching={isFetching}
            handlePageChange={handlePageChange}
            data={data?.data?.links}
          />
        )}
      </div>
    </WidthWrapper>
  );
}
