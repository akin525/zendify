import { WidthWrapper } from "@/components/Layout";
import { ViewfinderCircleIcon } from "@heroicons/react/20/solid";
import { Link } from "react-router-dom";
import { SyncLoader } from "react-spinners";
import { makeDashCase } from "@/utils";
import { RetryFetch } from "@/components/Element/Retry";
import { SearchNormal1 } from "iconsax-react";
import * as React from "react";
import { useBusinesses } from "../api/useBusinesses";

export default function Businesses() {
    const {
        data,
        error,
        fetchNextPage,
        hasNextPage,
        isFetchingNextPage,
        status,
        refetch,
    } = useBusinesses();

    const [searchQuery, setSearchQuery] = React.useState<string>("");

    const content = searchQuery
        ? data?.pages?.flatMap((group) =>
            group?.data?.data?.filter((item) =>
                item?.name?.toLowerCase().includes(searchQuery.toLowerCase()),
            ),
        )
        : data?.pages?.flatMap((group) => group?.data?.data);

    return (
        <>
            {content && (
                <MyBusinessSearch
                    searchQuery={searchQuery}
                    setSearchQuery={setSearchQuery}
                />
            )}

            <WidthWrapper>
                {status === "pending" ? (
                    <>
                        <div className="flex min-h-[calc(100vh-150px)] items-center justify-center py-20">
                            <SyncLoader size={14} color="#854FFF" />
                        </div>
                    </>
                ) : status !== "error" && data && data?.pages?.length === 0 ? (
                    <>
                        <div className="flex h-[calc(100vh-70px)] w-full items-center justify-center p-8">
                            <p className="text-center text-base font-semibold tracking-wider text-neutral-600">
                                You are not assigned to business yet. <br />{" "}
                                <span className="text-primary"> Contact Admin! </span>
                            </p>
                        </div>
                    </>
                ) : (
                    <>
                        {/* <MyBusinessSearch
              searchQuery={searchQuery}
              setSearchQuery={setSearchQuery}
            /> */}

                        {content?.length === 0 && (
                            <div className="flex h-[200px] w-full items-center justify-center p-8">
                                <p className="text-center text-base font-semibold tracking-wider text-neutral-600">
                                    No business found
                                </p>
                            </div>
                        )}

                        <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-3">
                            {content?.map((item, index) => (
                                <div
                                    key={index}
                                    className="flex min-h-[350px] flex-col justify-between space-y-3 rounded-xl bg-white px-6 py-4 dark:bg-neutral-800"
                                >
                                    <div className="flex flex-wrap items-center justify-between gap-x-2">
                                        <h3 className="inline-flex text-wrap break-words text-xl font-semibold text-primary">
                                            {item?.name}
                                        </h3>

                                        <div
                                            className={`${item?.status === "active" ? "bg-emerald-500" : item?.status === "pending" ? "bg-yellow-400" : "bg-red-400"} inline-flex h-max w-max items-center justify-center gap-1 rounded-full px-3 py-0.5`}
                                        >
                                            <div className="aspect-square h-1.5 rounded-full bg-white"></div>

                                            <p className={`text-[11px] font-semibold text-white`}>
                                                {item?.status}
                                            </p>
                                        </div>
                                    </div>

                                    {item?.description && (
                                        <p className="text-sm text-neutral-700 dark:text-neutral-200">
                                            {item.description.length > 120
                                                ? `${item.description.substring(0, 120)}...`
                                                : item?.description}
                                        </p>
                                    )}

                                    {!item?.biz_address &&
                                        !item?.biz_state &&
                                        !item?.biz_city &&
                                        !item?.biz_country &&
                                        !item?.biz_phone &&
                                        !item?.biz_email &&
                                        !item?.biz_url &&
                                        !item?.biz_address && (
                                            <div className="flex justify-center py-2 text-neutral-400">
                                                <p className="text-center">No data</p>
                                            </div>
                                        )}

                                    <div className="text-sm">
                                        {item?.biz_url && (
                                            <p className="text-">
                                                <strong>URL: </strong> {item?.biz_url}
                                            </p>
                                        )}
                                        {item?.biz_email && (
                                            <p className="text-">
                                                <strong>Email: </strong>
                                                {item?.biz_email}
                                            </p>
                                        )}

                                        {item?.biz_phone && (
                                            <p className="text-">
                                                <strong>Phone: </strong>
                                                {item?.biz_phone}
                                            </p>
                                        )}

                                        {item?.biz_country && (
                                            <p className="text-">
                                                <strong>Country: </strong>
                                                {item?.biz_country}
                                            </p>
                                        )}

                                        {item?.biz_city && (
                                            <p className="text-">
                                                <strong>City: </strong>
                                                {item?.biz_city}
                                            </p>
                                        )}

                                        {item?.biz_state && (
                                            <p className="text-">
                                                <strong>State: </strong>
                                                {item?.biz_state}
                                            </p>
                                        )}

                                        {item?.biz_address && (
                                            <p className="text-">
                                                <strong>Address: </strong>
                                                {item?.biz_address}
                                            </p>
                                        )}
                                    </div>

                                    <Link
                                        to={`/business/${makeDashCase(item?.name).toLocaleLowerCase()}-${item?.id}`}
                                    >
                                        <button className="relative flex h-8 w-full items-center justify-center gap-2 rounded-full border border-primary px-6 text-sm font-semibold text-primary">
                                            <ViewfinderCircleIcon width={16} height={16} />
                                            <p>View more</p>
                                        </button>
                                    </Link>

                                    {/* <div>
                      {isFetching && !isFetchingNextPage ? "Fetching..." : null}
                    </div> */}
                                </div>
                            ))}
                        </div>

                        <div className="mt-10 flex justify-center">
                            <button
                                onClick={() => fetchNextPage()}
                                disabled={!hasNextPage || isFetchingNextPage}
                                className="h-10 rounded-lg bg-primary px-6 text-sm font-bold text-white disabled:bg-primary/50"
                            >
                                {isFetchingNextPage
                                    ? "Loading more..."
                                    : hasNextPage
                                        ? "Load More"
                                        : "Nothing more to load"}
                            </button>
                        </div>
                    </>
                )}

                {error && <RetryFetch refetch={refetch} error={error?.message} />}
            </WidthWrapper>
        </>
    );
}

const MyBusinessSearch = ({ searchQuery, setSearchQuery }) => {
    return (
        <>
            <div className="sticky top-0 z-40 my-2 flex w-full flex-col gap-6">
                <div className="flex flex-col gap-1">
                    <div className="relative">
                        <input
                            type="name"
                            id="search_transactions"
                            defaultValue={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            // onKeyDown={handleKeyPress}
                            className="h-12 w-full rounded-xl border bg-white px-12 pr-20 text-sm outline-none focus:border-primary disabled:cursor-not-allowed dark:border-neutral-700 dark:bg-neutral-800"
                            placeholder={"Search for businesss..."}
                            // disabled={disabled}
                        />

                        {/* Search Icon */}
                        <div className="absolute left-3 top-3 text-neutral-400">
                            <SearchNormal1 size="20" />
                        </div>

                        {/* Clear Icon */}
                        {/* {searchQuery && (
              <button
                className="absolute right-4 top-3 cursor-pointer select-none font-bold text-neutral-400"
                onClick={handleClear}
              >
                <FaTimes size={24} />
              </button>
            )} */}
                    </div>
                </div>
            </div>
        </>
    );
};
