import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { getBusinessPayouts } from ".";

export const useBusinessPayoutsData = ({ businessId, page, config = {} }) => {
  return useQuery({
    ...config,
    queryKey: ["business-payouts", page, businessId],
    queryFn: () => getBusinessPayouts(businessId, page),

    placeholderData: keepPreviousData,
  });
};
