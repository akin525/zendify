import { WidthWrapper } from "@/components/Layout";
import { useLocation, useNavigate, useParams } from "react-router-dom";

import { getIDFromParams, makeNormalCaseAndRemoveId } from "@/utils";
import { SyncLoader } from "react-spinners";
import { useEffect, useState } from "react";
import { BusinessDetails } from "./BusinessDetails";
import { BusinessTransactions } from "@/features/transactions/components/BusinessTransactions";
import { businessTabs } from "@/constants";
// import { ComingSoon } from "@/components/Element";
import { BusinessVirtualAccounts } from "@/features/virtual-accounts/components/BusinessVirtualAccounts";
import { BusinessPayouts } from "@/features/payouts/components";
import { BusinessRefunds } from "@/features/refunds/components/BusinessRefunds";
import { BusinessTabs } from "./BusinessTabs";
import { useBusinessDetails } from "../api/useBusinesses";
import { ManageBusinessDropdown } from "./ManageBusinessDropdown";
import { RetryFetch } from "@/components/Element/Retry";
import { useAuthorization } from "@/lib/authorization";
import { BusinessWalletTransactions } from "@/features/transactions";
import { BusinessSettlements } from "@/features/settlements/components/BusinessSettlements";
import {CreateBusinessVirtualAccounts} from "@/features/virtual-accounts/components/CreateBusinessVirtualAccounts.tsx";
import {BusinessAccountsAdded} from "@/features/virtual-accounts/components/BusinessAccountsAdded.tsx";

export function Business() {
  const { manage_business } = useAuthorization();

  const { nameId } = useParams();

  const businessId = getIDFromParams(nameId);

  const navigate = useNavigate();

  const [activeTab, setActiveTab] = useState(businessTabs[0]);

  const [query, setQuery] = useState("");

  const location = useLocation();

  const { data, isPending, error, refetch } = useBusinessDetails(businessId);

  // console.log(data);

  function renderActiveTabContent(activeTab) {
    switch (activeTab.query) {
      case "transactions":
        return <BusinessTransactions businessId={businessId} />;
      case "virtual-accounts":
        return <BusinessVirtualAccounts businessId={businessId} />;
      case "add-business":
        return <CreateBusinessVirtualAccounts businessId={businessId}/>
      case "business-account":
        return <BusinessAccountsAdded businessId={businessId}/>
      case "payouts":
        return <BusinessPayouts businessId={businessId} />;
      case "refunds":
        return <BusinessRefunds businessId={businessId} />;
      case "wallet-transactions":
        return <BusinessWalletTransactions businessId={businessId} />;
      // return <ComingSoon />;
      case "settlements":
        return <BusinessSettlements businessId={businessId} />;
      // return <ComingSoon />;
      default:
        return <BusinessDetails data={data?.data} />;
    }
  }

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const filterParam = params.get("tab");

    const matchedTab = businessTabs.find((tab) => tab.query === filterParam);

    if (matchedTab) {
      setActiveTab(matchedTab);
      setQuery(filterParam);
    }
  }, [location.search]);

  useEffect(() => {
    if (query) {
      navigate(`?tab=${query}`, { replace: true });
    } else {
      navigate("", { replace: true });
    }
  }, [query]);

  return (
    <>
      <WidthWrapper>
        {isPending ? (
          <>
            <div className="flex min-h-[calc(100vh-200px)] items-center justify-center py-20">
              <SyncLoader size={16} color="#854FFF" />
            </div>
          </>
        ) : (
          data && (
            <>
              <p className="mb-1 text-xs font-medium text-neutral-400">
                Business
              </p>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <h1 className="text-2xl font-semibold text-primary">
                    {data?.data?.business?.name ||
                      makeNormalCaseAndRemoveId(nameId)}
                  </h1>

                  {data && data?.data?.business?.status && (
                    <div
                      className={`${data?.data?.business?.status === "active" ? "bg-emerald-500" : data?.data?.business?.status === "pending" ? "bg-yellow-500" : "bg-red-500"} flex items-center justify-center gap-1 rounded-full px-3 py-0.5`}
                    >
                      <div className="aspect-square h-1.5 rounded-full bg-white"></div>

                      <p className={`text-[11px] font-semibold text-white`}>
                        {data?.data?.business?.status}
                      </p>
                    </div>
                  )}
                </div>

                {data?.data?.business && manage_business && (
                  <div className="pr-10">
                    {/* <DropdownMenuDemo /> */}
                    <ManageBusinessDropdown data={data?.data?.business} />
                  </div>
                )}
              </div>
              <div className="mt-4 space-y-4">
                <p className="text-sm text-neutral-700 dark:text-neutral-200 md:w-3/4">
                  {data?.data?.business?.description}
                </p>

                <BusinessTabs
                  activeTab={activeTab}
                  setActiveTab={setActiveTab}
                  setQuery={setQuery}
                />

                {renderActiveTabContent(activeTab)}
              </div>
            </>
          )
        )}

        {error && <RetryFetch refetch={refetch} error={error?.message} />}
      </WidthWrapper>
    </>
  );
}
