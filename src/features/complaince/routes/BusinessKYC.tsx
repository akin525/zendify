import { formatDate } from "@/utils";
import {useBusinessKYC} from "../api/useComplianceApi";
import { ArrowDown } from "iconsax-react";
import { Pagination } from "@/components/Element/List/Pagination";
import { useBusinessKYCRequestStore } from "@/stores/compliance";
import { useNavigate } from "react-router-dom";
import { RetryFetch } from "@/components/Element/Retry";
import { WidthWrapper } from "@/components/Layout";
// import { Notice } from "@/components/Element";
import businessInfo from "@/constants/business_info.json";

const header: string[] = [
  "Business Name and Details",
  "Business Type",
  "Business Industry",
  "Registration Date",
];

const getBusinessType = (id: number) => {
  return businessInfo.business_type.find((item) => item.id === id)?.name;
};

const getBusinessIndustry = (id: number) => {
  return businessInfo.business_industry.find((item) => item.id === id)?.name;
};

export function BusinessKYC() {
  const { data, error, isFetching, isPending, isError, refetch } =
      useBusinessKYC();

  const { handlePageChange, page } = useBusinessKYCRequestStore();

  const navigate = useNavigate();

  // const handleRefresh = () => {
  //   handlePageChange(1);
  //   refetch();
  // };

  // console.log(data, error);
  return (
    <>
      <WidthWrapper>
        {/* <Notice type={"development"} /> */}

        <h1 className="text-3xl font-bold text-[#333] dark:text-neutral-300">
          Approved KYC Request(s)
        </h1>

        <div
          className={`${isFetching || isPending ? "cursor-progress" : ""} mb-10 mt-4 flex flex-col gap-10 rounded-lg bg-white px-8 py-2 dark:border dark:border-neutral-700 dark:bg-neutral-800`}
        >
          {/* <h1 className="text-xl font-semibold text-[#333]">
          Pending KYC Request For Business to Go Live
        </h1> */}

          <div>
            <div className="grid grid-cols-5 gap-10 border-b py-4 dark:border-neutral-700">
              {header.map((item, index) => (
                <div
                  key={index}
                  className={`${index === 0 ? "col-span-2" : index !== header?.length - 1 ? "justify-self-center" : "justify-self-end"}  flex gap-2  text-xs font-bold text-primary`}
                >
                  <p className="">{item}</p>

                  <ArrowDown size={16} className="shrink-0" />
                </div>
              ))}
            </div>

            {isPending ? (
              <>
                {[1, 2, 3, 4, 5, 6, 7, 8]?.map((_) => (
                  <div
                    key={_}
                    className="grid grid-cols-5 items-center gap-10 border-b px-4 py-4"
                  >
                    <div className=" col-span-2 flex flex-col gap-2 ">
                      <div className="h-6 w-full animate-pulse rounded-3xl bg-neutral-200 font-bold text-primary"></div>
                      <div className="space-y-1">
                        <div className="h-4 w-3/4 animate-pulse rounded-3xl bg-neutral-200 font-bold text-primary"></div>
                        <div className="h-4 w-2/4 animate-pulse rounded-3xl bg-neutral-200 font-bold text-primary"></div>
                        <div className="h-4 w-1/4 animate-pulse rounded-3xl bg-neutral-200 font-bold text-primary"></div>
                      </div>
                    </div>

                    <div className="h-6 w-full animate-pulse justify-self-center rounded-3xl bg-neutral-200 font-bold text-primary"></div>
                    <div className="h-6 w-full animate-pulse justify-self-center rounded-3xl bg-neutral-200 font-bold text-primary"></div>
                    <div className="h-6 w-full animate-pulse justify-self-end rounded-3xl bg-neutral-200 font-bold text-primary"></div>
                  </div>
                ))}
              </>
            ) : (
              data &&
              data?.data?.kycs?.data?.map((item, index) => (
                <div
                  key={index}
                  className="border-b py-2 dark:border-neutral-700"
                >
                  <div
                    onClick={() =>
                      navigate(`/compliance/business-kyc-details/${item.id}`)
                    }
                    className="grid cursor-pointer grid-cols-5 items-center gap-10 rounded-xl px-4 py-4 text-[#333] hover:bg-neutral-100  dark:hover:bg-neutral-700"
                  >
                    <div className=" col-span-2 text-[#333] dark:text-neutral-200">
                      <p className="font-bold text-primary">
                        {item?.business?.name}
                      </p>

                      <p className="mt-2 text-sm">
                        {item?.business?.description?.length > 120
                          ? `${item?.business?.description.substring(0, 120)}...`
                          : item?.business?.description}
                      </p>
                    </div>
                    <div className="justify-self-center text-center font-medium text-primary">
                      {item?.business?.type
                        ? getBusinessType(item?.business?.type)
                        : ""}
                    </div>
                    <div className=" justify-self-center text-center font-medium text-primary">
                      {item?.business?.industry_id
                        ? getBusinessIndustry(item?.business?.industry_id)
                        : ""}
                    </div>
                    <div className=" justify-self-end text-center dark:text-neutral-200">
                      {formatDate(item?.business?.created_at)}
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {data && (
            <Pagination
              isFetching={isFetching}
              handlePageChange={handlePageChange}
              data={data?.data?.kycs?.links}
              page={page}
            />
          )}

          {data?.length === 0 && !isPending && !isFetching && !isError && (
            <div className="flex w-full items-center justify-center p-8">
              <p className="text-sm font-semibold tracking-wider text-neutral-500">
                No data found
              </p>
            </div>
          )}

          {isError && !isFetching && (
            <>
              <RetryFetch refetch={refetch} error={error?.message} />
            </>
          )}
        </div>
      </WidthWrapper>
    </>
  );
}
