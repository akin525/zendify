import { WidthWrapper } from "@/components/Layout";
import { BeatLoader } from "react-spinners";
import { useParams } from "react-router-dom";

import {useTerminalDashboard} from "@/features/terminal/api";

export default function DashboardTerminal() {
  const { id } = useParams();
  const { data, isPending } = useTerminalDashboard({
    id,
    config: { enabled: !!id },
  });



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
                  <div className="list mb-4 mt-4 flex flex-col space-y-2 rounded-lg bg-white p-8 dark:bg-neutral-800 dark:text-neutral-200">
                    <div className="flex justify-between gap-4 border-b pb-4">
                      <div className="space-y-2">
                        <h1 className="text-2xl font-bold text-[#333] dark:text-white">
                          {data?.data?.merchant_name} merchant Details
                        </h1>
                        <div className="flex gap-2 ">
                          <p className="font-bold text-primary">Status:</p>

                          <div
                            className={`${data?.data?.status === "active" ? "bg-emerald-500" : data?.data?.status === "pending" ? "bg-yellow-400" : "bg-red-400"} inline-flex w-max items-center justify-center gap-1 rounded-full px-3 py-[1px]`}
                          >
                            <div className="aspect-square h-1 rounded-full bg-white"></div>

                            <p
                              className={`text-[11px] font-semibold text-white`}
                            >
                              {data?.data?.status}
                            </p>
                          </div>
                        </div>
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
                          <div className="font-semibold">Aggregator:</div>
                          <div className="text-wrap break-words">
                            {data?.data?.aggregator}
                          </div>
                        </div>
                        {/*  */}
                        <div className="grid grid-cols-2 text-[#333]">
                          <div className="font-semibold">
                            Balance:
                          </div>
                          <div className="text-wrap break-words">
                            {data?.data?.balance}
                          </div>
                        </div>
                        {/*  */}
                        <div className="grid grid-cols-2 text-[#333]">
                          <div className="font-semibold">Bills_status :</div>
                          <div className="text-wrap break-words">
                            {data?.data?.bills_status}
                          </div>
                        </div>
                        {/*  */}
                        <div className="grid grid-cols-2 text-[#333]">
                          <div className="font-semibold">Bt_feeCap:</div>
                          <div className="text-wrap break-words">
                            {data?.data?.bt_feeCap}
                          </div>
                        </div>
                        {/*  */}
                        <div className="grid grid-cols-2 text-[#333]">
                          <div className="font-semibold">Bt_feeCent :</div>
                          <div className="text-wrap break-words">
                            {data?.data?.bt_feeCent}
                          </div>
                        </div>
                        {/*  */}
                        <div className="grid grid-cols-2 text-[#333]">
                          <div className="font-semibold">Bt_fee_range :</div>
                          <div className="text-wrap break-words">
                            {data?.data?.bt_fee_range}
                          </div>
                        </div>
                      </div>
                      <div className="flex flex-col gap-4 *:dark:text-neutral-200">
                        {/* Business Type */}
                        <div className="grid grid-cols-2 text-[#333]">
                          <div className="font-semibold">Bt_fee_type:</div>
                          <div className="text-wrap break-words">
                            {data?.data?.bt_fee_type}
                          </div>
                        </div>
                        {/*  */}
                        <div className="grid grid-cols-2 text-[#333]">
                          <div className="font-semibold">Bt_max_fee:</div>
                          <div className="text-wrap break-words">
                            {data?.data?.bt_max_fee}
                          </div>
                        </div>
                        {/*  */}
                        <div className="grid grid-cols-2 text-[#333]">
                          <div className="font-semibold">Bt_min_fee:</div>
                          <div className="text-wrap break-words">
                            {data?.data?.bt_min_fee}
                          </div>
                        </div>
                        {/*  */}
                        <div className="grid grid-cols-2 text-[#333]">
                          <div className="font-semibold">cashback:</div>
                          <div className="text-wrap break-words">
                            {data?.data?.cashback}
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
                          <div className="font-semibold">cashback:</div>
                          <div className="text-wrap break-words">
                            {data?.data?.cashback}
                          </div>
                        </div>
                        {/* inc date */}
                        <div className="grid grid-cols-2 text-[#333]">
                          <div className="font-semibold">
                            Merchant Email:
                          </div>
                          <div className="text-wrap break-words">
                            {data?.data?.merchant_email}
                          </div>
                        </div>
                        {/* director bvn  */}
                        <div className="grid grid-cols-2 text-[#333]">
                          <div className="font-semibold">Merchant Bvn:</div>
                          <div className="text-wrap break-words">
                            {data?.data?.merchant_bvn}
                          </div>
                        </div>
                        {/* director name */}
                        <div className="grid grid-cols-2 text-[#333]">
                          <div className="font-semibold">Merchant Email:</div>
                          <div className="text-wrap break-words">
                            {data?.data?.merchant_email}
                          </div>
                        </div>
                        {/* director2 bvn */}
                        <div className="grid grid-cols-2 text-[#333]">
                          <div className="font-semibold">Merchant Phone</div>
                          <div className="text-wrap break-words">
                            {data?.data?.merchant_phone}
                          </div>
                        </div>
                        {/* direvtor2 name */}
                        <div className="grid grid-cols-2 text-[#333]">
                          <div className="font-semibold">Type</div>
                          <div className="text-wrap break-words">
                            {data?.data?.type}
                          </div>
                        </div>
                      </div>
                      <div className="flex flex-col gap-4 *:dark:text-neutral-200">
                        {/* tin */}
                        {/*<div className="grid grid-cols-2 text-[#333]">*/}
                        {/*  <div className="font-semibold">TIN</div>*/}
                        {/*  <div className="text-wrap break-words">*/}
                        {/*    {data?.data?.business?.tin || "null"}*/}
                        {/*  </div>*/}
                        {/*</div>*/}
                        {/* bvn  */}
                        {/*<div className="grid grid-cols-2 text-[#333]">*/}
                        {/*  <div className="font-semibold">BVN:</div>*/}
                        {/*  <div className="text-wrap break-words">*/}
                        {/*    {data?.data?.business?.biz_bvn}*/}
                        {/*  </div>*/}
                        {/*</div>*/}
                        {/* director id means */}
                        {/*<div className="grid grid-cols-2 text-[#333]">*/}
                        {/*  <div className="font-semibold">*/}
                        {/*    Director ID Means:*/}
                        {/*  </div>*/}
                        {/*  <div className="text-wrap break-words">*/}
                        {/*    {data?.data?.business?.id_means}*/}
                        {/*  </div>*/}
                        {/*</div>*/}
                        {/* director id number */}
                        {/*<div className="grid grid-cols-2 text-[#333]">*/}
                        {/*  <div className="font-semibold">*/}
                        {/*    Director ID Number*/}
                        {/*  </div>*/}
                        {/*  <div className="text-wrap break-words">*/}
                        {/*    {data?.data?.business?.id_number || "null"}*/}
                        {/*  </div>*/}
                        {/*</div>*/}
                        {/* director id mean 2 */}
                        {/*<div className="grid grid-cols-2 text-[#333]">*/}
                        {/*  <div className="font-semibold">*/}
                        {/*    Director2 ID Means:*/}
                        {/*  </div>*/}
                        {/*  <div className="text-wrap break-words">*/}
                        {/*    {data?.data?.business?.id_means2 || "null"}*/}
                        {/*  </div>*/}
                        {/*</div>*/}
                        {/* director id means 2 */}
                        {/*<div className="grid grid-cols-2 text-[#333]">*/}
                        {/*  <div className="font-semibold">*/}
                        {/*    Director2 ID Number*/}
                        {/*  </div>*/}
                        {/*  <div className="text-wrap break-words">*/}
                        {/*    {data?.data?.business?.id_number2 || "null"}*/}
                        {/*  </div>*/}
                        {/*</div>*/}
                      </div>
                    </div>
                  </div>

                </>
              )
            )}
          </div>
        </div>

      </WidthWrapper>
    </>
  );
}

