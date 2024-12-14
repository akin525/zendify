import {
  // useBusinessSettlementsStore,
  useSettlementsStore,
} from "@/stores/settlements";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { getBusinessSettlements, getSettlements } from "./getSettlements";

const useBusinessSettlements = ({ businessId, page, config = {} }) => {
  return useQuery({
    ...config,
    queryKey: ["business-settlements", page, businessId],
    queryFn: () => getBusinessSettlements(businessId, page),
    placeholderData: keepPreviousData,
  });
};

const useSettlements = ({ page, config = {} }) => {
  return useQuery({
    ...config,
    queryKey: ["settlements", page],
    queryFn: () => getSettlements(page),
    placeholderData: keepPreviousData,
  });
};

export const useSettlementsData = () => {
  const { page } = useSettlementsStore();
  return useSettlements({ page });
};

export const useBusinessSettlementsData = ({ businessId, page }) => {
  // const { page } = useBusinessSettlementsStore();
  return useBusinessSettlements({ businessId, page });
};
