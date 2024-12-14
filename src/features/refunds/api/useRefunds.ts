import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { getBusinessRefunds } from "./refunds";

export const useBusinessRefundsData = ({ businessId, page, config = {} }) => {
    return useQuery({
        ...config,
        queryKey: ["business-refunds", page, businessId],
        queryFn: () => getBusinessRefunds(businessId, page),

        placeholderData: keepPreviousData,
    });
};
