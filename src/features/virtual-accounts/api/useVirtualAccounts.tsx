import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { getBusinessVirtualAccounts } from "./getVirtualAccounts";

export const useBusinessVirtualAccountsData = ({
  businessId,
  page = 1,
  config = {},
}) => {
  return useQuery({
    ...config,
    queryKey: ["business-virtual-accounts", page, businessId],
    queryFn: () => getBusinessVirtualAccounts(businessId, page),
    placeholderData: keepPreviousData,
  });
};
