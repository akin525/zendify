import axios_instance from "@/lib/axios";
import { useRefundsStore } from "@/stores/refunds";

import { keepPreviousData, useQuery } from "@tanstack/react-query";

export async function getRefunds(page: number | string = 1) {
  try {
    const response = await axios_instance.get(`/refunds?page=${page}`);
    if (!response.data.success) {
      const errorMessage = response.data.message || "An error occurred!";
      throw new Error(errorMessage);
    }
    return response.data;
  } catch (error) {
    throw new Error(error?.message || "An error occured while fetching refunds!");
  }
}

export async function getBusinessRefunds(
  businessId: string | number,
  page: string | number,
) {
  try {
    const response = await axios_instance.get(
      `/business-refunds/${businessId}?page=${page}`,
    );
    if (!response.data.success) {
      const errorMessage = response.data.message || "An error occurred!";
      throw new Error(errorMessage);
    }
    return response.data;
  } catch (error) {
    throw new Error(
      error?.message || "An error occured while fetching refunds!",
    );
  }
}

export const useRefunds = ({ page, config = {} }) => {
  return useQuery({
    ...config,
    queryKey: ["refunds", page],
    queryFn: () => getRefunds(page),

    placeholderData: keepPreviousData,
  });
};

export const useRefundsData = () => {
  const { page } = useRefundsStore();
  return useRefunds({ page });
};
