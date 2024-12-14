import { DesktopPendingList } from "./Pending";
import { DesktopListView } from "./DesktopView";
import { WidthWrapper } from "@/components/Layout";
import { RetryFetch } from "@/components/Element/Retry";
import { AiOutlineLoading3Quarters } from "react-icons/ai";

export default function List({
  header = [],
  selectedKeys,
  handleRefresh = () => {},
  data = [],
  isPending,
  isFetching,
  isError,
  tableName = "data",
  refetch,
  action = "view-data",
  type = null,
  error = "",
}) {
  return (
    <>
      <WidthWrapper>
        {!isPending && (
          <div className="flex w-full items-center pb-4 pt-2">
            <div>
              <button
                onClick={handleRefresh}
                disabled={isFetching || isPending}
                className="list order-2 flex h-8 w-24 items-center justify-center gap-2 rounded-full bg-gradient-to-tr from-primary to-secondary text-xs font-semibold text-white shadow disabled:cursor-progress"
              >
                <p>Refresh</p>
                {isFetching && (
                  <AiOutlineLoading3Quarters className="h-3 w-3 animate-spin" />
                )}
              </button>
            </div>
          </div>
        )}
        <div
          className={`h-full w-full overflow-x-auto md:block ${
            isFetching ? "cursor-progress" : "cursor-default"
          }`}
        >
          <table className="h-full min-w-full divide-y divide-gray-200 rounded-xl border text-sm text-neutral-700 dark:divide-neutral-700 dark:border-neutral-700 dark:text-neutral-200">
            <thead className="bg-gray-50 dark:bg-neutral-700  ">
              <tr>
                {header?.map((header: string, index: number) => (
                  <th className="truncate text-ellipsis" key={index}>
                    {header}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 bg-white dark:divide-neutral-700 dark:bg-neutral-800">
              {isPending ? (
                <DesktopPendingList fieldLength={header.length} />
              ) : (
                !isError && (
                  <DesktopListView
                    data={data}
                    action={action}
                    type={type}
                    selectedKeys={selectedKeys}
                  />
                )
              )}
            </tbody>
          </table>
        </div>

        {/* <div className="flex flex-col gap-2 lg:hidden">
          {isPending || isFetching ? (
            <MobilePendingList />
          ) : (
            !isError && !isFetching && <MobileListView data={data} />
          )}
        </div> */}

        {data?.length === 0 && !isPending && !isFetching && !isError && (
          <div className="flex w-full items-center justify-center p-8">
            <p className="text-sm font-semibold tracking-wider text-neutral-500">
              No {tableName} found
            </p>
          </div>
        )}

        {isError && !isFetching && (
          <>
            <RetryFetch refetch={refetch} error={error} />
          </>
        )}
      </WidthWrapper>
    </>
  );
}
