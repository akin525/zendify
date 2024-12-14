import { WidthWrapper } from "@/components/Layout";
import { Link, useParams } from "react-router-dom";
import { BeatLoader } from "react-spinners";
import { formatDate, makeDashCase } from "@/utils";
import { RetryFetch } from "@/components/Element/Retry";
import { useModalStore } from "@/stores/modal";
import { FilePreview } from "@/components/Element/FilePreview";
import { useKYCDetails } from "../../api";
import {
  DetailsRow,
  InformationField,
  ManageBusinessDropdown,
} from "@/features/businesses";
import { ViewfinderCircleIcon } from "@heroicons/react/20/solid";

const header: string[] = ["KYC File", "Info", "Action"];

const GoToBusinessButton = ({ data }) => {
  return (
    <div className="fixed bottom-5 right-5 flex justify-end pb-2">
      <Link
        to={`/business/${makeDashCase(data?.data?.business?.name).toLocaleLowerCase()}-${data?.data?.business?.id}`}
      >
        <button className="relative flex h-10 w-max items-center justify-center gap-2 rounded-full bg-primary px-6 text-sm font-semibold text-white shadow-lg">
          <ViewfinderCircleIcon width={16} height={16} />
          <p>Go to business</p>
        </button>
      </Link>
    </div>
  );
};

export function BusinessKYCDetails() {
  const { id } = useParams();

  const { data, error, isPending, isFetching, isError, refetch } =
    useKYCDetails(Number(id));

  const { openModal } = useModalStore();

  const handleApprove = (d) => {
    openModal({
      action: "approve-kyc-document",
      data: { id: d.id, info: d.info, name: data?.data?.business.name },
      type: "kyc",
    });
  };

  // const handleApproveBusiness = (d) => {
  //   openModal({
  //     action: "approve-business",
  //     data: { ...d },
  //     type: "business",
  //   });
  // };

  const handleReject = (d) => {
    openModal({
      action: "reject-kyc-document",
      data: { id: d.id, info: d.info, name: data?.data?.business.name },
      type: "kyc",
    });
  };

  return (
    <>
      <WidthWrapper>
        <div className="">
          <div>
            {isPending ? (
              <>
                <div className="flex min-h-[calc(100vh-100px)] w-full items-center justify-center py-10">
                  <BeatLoader size={12} color="#854FFF" />
                </div>
              </>
            ) : (
              data && (
                <>
                  {/*  */}
                  <GoToBusinessButton data={data} />
                  <div className="list mb-4 mt-4 flex flex-col space-y-2 rounded-lg bg-white p-8 dark:bg-neutral-800 dark:text-neutral-200">
                    <div className="flex justify-between gap-4 border-b pb-4">
                      <div className="space-y-2">
                        <h1 className="text-2xl font-bold text-[#333] dark:text-white">
                          {data?.data?.business.name} Business Details
                        </h1>
                        <div className="flex gap-2 ">
                          <p className="font-bold text-primary">Status:</p>

                          <div
                            className={`${data?.data?.business.status === "active" ? "bg-emerald-500" : data?.data?.business.status === "pending" ? "bg-yellow-400" : "bg-red-400"} inline-flex w-max items-center justify-center gap-1 rounded-full px-3 py-[1px]`}
                          >
                            <div className="aspect-square h-1 rounded-full bg-white"></div>

                            <p
                              className={`text-[11px] font-semibold text-white`}
                            >
                              {data?.data?.business?.status}
                            </p>
                          </div>
                        </div>
                      </div>

                      <div>
                        <ManageBusinessDropdown data={data?.data?.business} />
                        {/* <button
                          onClick={() =>
                            handleApproveBusiness(data?.data?.business)
                          }
                          className="h-10 bg-primary px-4 font-semibold text-white"
                        >
                          Approve Business
                        </button> */}
                      </div>
                    </div>

                    <div className="border-b py-2 text-neutral-500 dark:text-neutral-200">
                      <p className="text-sm font-bold">
                        {data?.data?.business?.description || "No description"}
                      </p>
                    </div>

                    <div className="grid grid-cols-2 gap-12 border-b py-4 text-sm font-medium ">
                      <div className="flex flex-col gap-4 *:dark:text-neutral-200">
                        {/* Business Type */}
                        <div className="grid grid-cols-2 text-[#333] dark:text-neutral-200">
                          <div className="font-semibold">Business Type:</div>
                          <div className="text-wrap break-words">
                            {data?.data?.business?.btype?.name}
                          </div>
                        </div>
                        {/*  */}
                        <div className="grid grid-cols-2 text-[#333]">
                          <div className="font-semibold">
                            Business Industry:
                          </div>
                          <div className="text-wrap break-words">
                            {data?.data?.business?.industry?.name}
                          </div>
                        </div>
                        {/*  */}
                        <div className="grid grid-cols-2 text-[#333]">
                          <div className="font-semibold">Business Url:</div>
                          <div className="text-wrap break-words">
                            {data?.data?.business?.biz_url}
                          </div>
                        </div>
                        {/*  */}
                        <div className="grid grid-cols-2 text-[#333]">
                          <div className="font-semibold">Business Address:</div>
                          <div className="text-wrap break-words">
                            {data?.data?.business?.biz_address}
                          </div>
                        </div>
                        {/*  */}
                        <div className="grid grid-cols-2 text-[#333]">
                          <div className="font-semibold">City / State:</div>
                          <div className="text-wrap break-words">
                            {data?.data?.business?.biz_city},{" "}
                            {data?.data?.business?.biz_state}.
                          </div>
                        </div>
                        {/*  */}
                        <div className="grid grid-cols-2 text-[#333]">
                          <div className="font-semibold">Account Prefix:</div>
                          <div className="text-wrap break-words">
                            {data?.data?.business?.acc_prefix}
                          </div>
                        </div>
                      </div>
                      <div className="flex flex-col gap-4 *:dark:text-neutral-200">
                        {/* Business Type */}
                        <div className="grid grid-cols-2 text-[#333]">
                          <div className="font-semibold">Reg. Date:</div>
                          <div className="text-wrap break-words">
                            {formatDate(data?.data?.business?.created_at)}
                          </div>
                        </div>
                        {/*  */}
                        <div className="grid grid-cols-2 text-[#333]">
                          <div className="font-semibold">BVN:</div>
                          <div className="text-wrap break-words">
                            {data?.data?.business?.biz_bvn}
                          </div>
                        </div>
                        {/*  */}
                        <div className="grid grid-cols-2 text-[#333]">
                          <div className="font-semibold">Email:</div>
                          <div className="text-wrap break-words">
                            {data?.data?.business?.biz_email}
                          </div>
                        </div>
                        {/*  */}
                        <div className="grid grid-cols-2 text-[#333]">
                          <div className="font-semibold">Phone:</div>
                          <div className="text-wrap break-words">
                            {data?.data?.business?.biz_phone}
                          </div>
                        </div>
                        {/*  */}
                        <div className="grid grid-cols-2 text-[#333]">
                          <div className="font-semibold">Country:</div>
                          <div className="text-wrap break-words">
                            {data?.data?.business?.biz_country}
                          </div>
                        </div>
                        {/*  */}
                        <div className="grid grid-cols-2 text-[#333]">
                          <div className="font-semibold">ChargeBack:</div>
                          <div className="text-wrap break-words">
                            {data?.data?.business?.chargeback_email}
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-12 pt-4 text-sm font-medium">
                      <div className="flex flex-col gap-4 *:dark:text-neutral-200">
                        {/* rc number */}
                        <div className="grid grid-cols-2 text-[#333]">
                          <div className="font-semibold">RC Number:</div>
                          <div className="text-wrap break-words">
                            {data?.data?.business?.rcNumber || "null"}
                          </div>
                        </div>
                        {/* inc date */}
                        <div className="grid grid-cols-2 text-[#333]">
                          <div className="font-semibold">
                            Incorporation Date:
                          </div>
                          <div className="text-wrap break-words">
                            {data?.data?.business?.incorporationDate || "null"}
                          </div>
                        </div>
                        {/* director bvn  */}
                        <div className="grid grid-cols-2 text-[#333]">
                          <div className="font-semibold">Director's BVN:</div>
                          <div className="text-wrap break-words">
                            {data?.data?.business?.d_bvn || "null"}
                          </div>
                        </div>
                        {/* director name */}
                        <div className="grid grid-cols-2 text-[#333]">
                          <div className="font-semibold">Director's Name:</div>
                          <div className="text-wrap break-words">
                            {data?.data?.business?.id_holder || "null"}
                          </div>
                        </div>
                        {/* director2 bvn */}
                        <div className="grid grid-cols-2 text-[#333]">
                          <div className="font-semibold">Director2 BVN</div>
                          <div className="text-wrap break-words">
                            {data?.data?.business?.d_bvn2 || "null"}
                          </div>
                        </div>
                        {/* direvtor2 name */}
                        <div className="grid grid-cols-2 text-[#333]">
                          <div className="font-semibold">Director2 Name</div>
                          <div className="text-wrap break-words">
                            {data?.data?.business?.id_holder2 || "null"}
                          </div>
                        </div>
                      </div>
                      <div className="flex flex-col gap-4 *:dark:text-neutral-200">
                        {/* tin */}
                        <div className="grid grid-cols-2 text-[#333]">
                          <div className="font-semibold">TIN</div>
                          <div className="text-wrap break-words">
                            {data?.data?.business?.tin || "null"}
                          </div>
                        </div>
                        {/* bvn  */}
                        <div className="grid grid-cols-2 text-[#333]">
                          <div className="font-semibold">BVN:</div>
                          <div className="text-wrap break-words">
                            {data?.data?.business?.biz_bvn}
                          </div>
                        </div>
                        {/* director id means */}
                        <div className="grid grid-cols-2 text-[#333]">
                          <div className="font-semibold">
                            Director ID Means:
                          </div>
                          <div className="text-wrap break-words">
                            {data?.data?.business?.id_means}
                          </div>
                        </div>
                        {/* director id number */}
                        <div className="grid grid-cols-2 text-[#333]">
                          <div className="font-semibold">
                            Director ID Number
                          </div>
                          <div className="text-wrap break-words">
                            {data?.data?.business?.id_number || "null"}
                          </div>
                        </div>
                        {/* director id mean 2 */}
                        <div className="grid grid-cols-2 text-[#333]">
                          <div className="font-semibold">
                            Director2 ID Means:
                          </div>
                          <div className="text-wrap break-words">
                            {data?.data?.business?.id_means2 || "null"}
                          </div>
                        </div>
                        {/* director id means 2 */}
                        <div className="grid grid-cols-2 text-[#333]">
                          <div className="font-semibold">
                            Director2 ID Number
                          </div>
                          <div className="text-wrap break-words">
                            {data?.data?.business?.id_number2 || "null"}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <InformationField name="Merchant Information">
                    <div className="grid rounded-xl bg-white text-base dark:bg-neutral-800 ">
                      <DetailsRow
                        data={data?.data?.business?.merchant?.firstname}
                        name="First Name"
                      />
                      <DetailsRow
                        data={data?.data?.business?.merchant?.lastname}
                        name="Last Name"
                      />
                      <DetailsRow
                        data={data?.data?.business?.merchant?.phone}
                        name="Phone"
                      />
                      <DetailsRow
                        data={data?.data?.business?.merchant?.email}
                        name="Email"
                      />
                      <DetailsRow
                        data={data?.data?.business?.merchant?.ref_code}
                        name="Referral Code"
                      />
                      <DetailsRow
                        data={data?.data?.business?.merchant?.referral}
                        name="Referral"
                      />
                      <DetailsRow
                        data={data?.data?.business?.merchant?.biz_address}
                        name="Address"
                      />
                      <DetailsRow
                        data={
                          (data?.data?.business?.industry_id &&
                            data?.data?.business_industry &&
                            data?.data?.business_industry[
                              Number(data?.data?.business?.industry_id) - 1
                            ].name) ||
                          null
                        }
                        name="Business Industry"
                      />
                    </div>
                  </InformationField>

                  {/* Account Information */}
                  <div className="list mb-4 mt-4 flex flex-col space-y-8 rounded-lg bg-white p-8  dark:bg-neutral-800">
                    <h1 className="text-2xl font-bold text-[#333] dark:text-neutral-200">
                      {data?.data?.business.name} Account Information
                    </h1>

                    <div className="*: rounded-xl border dark:border-neutral-700 dark:text-neutral-200 *:dark:border-neutral-700 overflow-hidden">
                      <div className="flex justify-between gap-2 border-b px-4 py-3 font-bold">
                        <p>Account Name</p>
                        <p>{data?.data?.account?.account_name}</p>
                      </div>
                      <div className="flex justify-between gap-2 border-b px-4 py-3 font-bold">
                        <p>Account Number</p>
                        <p>{data?.data?.account?.account_number}</p>
                      </div>
                      <div className="flex justify-between gap-2 border-b px-4 py-3 font-bold">
                        <p>Bank Name</p>
                        <p>{data?.data?.account?.bank_name}</p>
                      </div>
                      <div className="flex justify-between gap-2 border-b px-4 py-3 font-bold">
                        <p>Bank Code</p>
                        <p>{data?.data?.account?.bank_code}</p>
                      </div>
                    </div>
                  </div>

                  <KYCDocumentsSection
                    data={data}
                    handleApprove={handleApprove}
                    handleReject={handleReject}
                  />

                  {/* <GoToBusinessButton data={data} /> */}

                  {/* <BusinessDetails data={data?.data} /> */}
                </>
              )
            )}
          </div>
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

const KYCDocumentsSection = ({ data, handleApprove, handleReject }) => {
  return (
    <>
      <div className="list mb-10 mt-4 flex flex-col rounded-lg bg-white p-8 dark:bg-neutral-800">
        <h1 className="text-xl font-bold text-[#333] dark:text-neutral-200">
          KYC Documents
        </h1>

        <div className="grid grid-cols-4 gap-10 border-b py-4">
          {header.map((item, index) => (
            <div
              key={index}
              className={`${index === 0 ? "" : index === 1 ? "col-span-2 justify-self-center" : "justify-self-center"}  flex gap-2  text-xs font-bold text-primary`}
            >
              <p className="">{item}</p>
            </div>
          ))}
        </div>

        {data?.data?.kycs?.map((item, index) => (
          <div className="grid grid-cols-4 gap-10 border-b py-4" key={index}>
            <div className="space-y-2">
              <p className="text-sm font-semibold">{item.info}</p>

              <FilePreview fileUrl={item.file} />
            </div>

            <div className="col-span-2 flex flex-col gap-2 justify-self-center">
              <p>
                <span className="font-semibold text-primary">Status: </span>
                <span
                  className={
                    item.status === "pending"
                      ? "rounded-full bg-yellow-500 px-3 py-0.5 text-xs text-white"
                      : item.status === "approved"
                        ? "rounded-full bg-emerald-500 px-3 py-0.5 text-xs text-white"
                        : "rounded-full bg-red-500 px-3 py-0.5 text-xs text-white"
                  }
                >
                  {" "}
                  {item.status}
                </span>
              </p>

              <p>
                <span className="font-semibold text-primary">
                  Submit Date:{" "}
                </span>{" "}
                {formatDate(item.created_at)}
              </p>
              <p>
                <span className="font-semibold text-primary">
                  Approved On:{" "}
                </span>{" "}
                {item.approved_by || "-----"}
              </p>
              <p>
                <span className="font-semibold text-primary">
                  Approved By:{" "}
                </span>{" "}
                {item.approved_on || "-----"}
              </p>
            </div>

            <div className="col-span-1 flex flex-col gap-3 self-center">
              <>
                <button
                  onClick={() =>
                    handleApprove({
                      id: item.id,
                      info: item.info,
                    })
                  }
                  className="rounded-full bg-emerald-500 px-3 py-2 text-sm font-bold text-white"
                >
                  Approve
                </button>
                <button
                  onClick={() =>
                    handleReject({
                      id: item.id,
                      info: item.info,
                    })
                  }
                  className="rounded-full bg-red-500 px-3 py-2 text-sm font-bold text-white"
                >
                  Reject
                </button>
              </>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};
