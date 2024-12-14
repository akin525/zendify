import { keepPreviousData, useQuery } from "@tanstack/react-query";
import {getBusinessAccountsAdded} from "./getVirtualAccounts";

export const dedicatedVirtualAccountsData = ({
  businessId,
  page = 1,
  config = {},
}) => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  return useQuery({
    ...config,
    queryKey: ["business-dedicated-accounts", page, businessId],
    queryFn: () => getBusinessAccountsAdded(businessId, page),
    placeholderData: keepPreviousData,
  });
};
