import axios_instance from "@/lib/axios";
import { usePayoutsStore, usePendingPayoutStore } from "@/stores/payouts";
import { keepPreviousData, useQuery } from "@tanstack/react-query";

export async function getPayouts(page: number | string = 1) {
  try {
    const response = await axios_instance.get(`/payouts?page=${page}`);
    if (!response.data.success) {
      const errorMessage = response.data.message || "An error occurred!";
      throw new Error(errorMessage);
    }
    return response.data;
  } catch (error) {
    throw new Error(
      error?.message || "An error occured while fetching payouts!",
    );
  }
}

export async function getBusinessPayouts(
  businessId: string | number,
  page: string | number,
) {
  try {
    const response = await axios_instance.get(
      `/business-payouts/${businessId}?page=${page}`,
    );
    if (!response.data.success) {
      const errorMessage = response.data.message || "An error occurred!";
      throw new Error(errorMessage);
    }
    return response.data;
  } catch (error) {
    throw new Error(
      error?.message || "An error occured while fetching business payouts!",
    );
  }
}

export async function getPendingPayouts(page: number | string = 1) {
  try {
    const response = await axios_instance.get(`/pending-payouts?page=${page}`);
    if (!response.data.success) {
      const errorMessage = response.data.message || "An error occurred!";
      throw new Error(errorMessage);
    }
    return response.data;
  } catch (error) {
    throw new Error("An error occured while fetching payouts!");
  }
}

export async function getPayoutDetails(id: number | string = 1) {
  try {
    const response = await axios_instance.get(`/payout/details/${id}`);
    if (!response.data.success) {
      const errorMessage = response.data.message || "An error occurred!";
      throw new Error(errorMessage);
    }
    return response.data;
  } catch (error) {
    throw new Error("An error occured while fetching payouts!");
  }
}

export async function searchPayouts(
  searchQuery: string,
  page: number | string = 1,
) {
  try {
    const response = await axios_instance.post(`/payout-search?page=${page}`, {
      search: searchQuery,
    });
    if (!response.data.success) {
      const errorMessage = response.data.message || "An error occurred!";
      throw new Error(errorMessage);
    }
    return response.data;
  } catch (error) {
    throw new Error("An error occured while fetching payouts!");
  }
}
// changed to requery payout
export async function reversePayout(id: number | string = 1) {
  try {
    const response = await axios_instance.get(`/requery-payout/${id}`);
    if (!response.data.success) {
      const errorMessage = response.data.message || "An error occurred!";
      throw new Error(errorMessage);
    }
    return response.data;
  } catch (error) {
    throw new Error(
      error?.message || "An error occurred while reversing payout.",
    );
  }
}

export const usePayouts = ({ page, searchQuery, config = {} }) => {
  return useQuery({
    ...config,
    queryKey: ["payouts", page, searchQuery],
    queryFn: () =>
      searchQuery ? searchPayouts(searchQuery, page) : getPayouts(page),

    placeholderData: searchQuery ? undefined : keepPreviousData,
  });
};

export const usePendingPayouts = ({ page, config = {} }) => {
  return useQuery({
    ...config,
    queryKey: ["pending-payouts", page],
    queryFn: () => getPendingPayouts(page),

    placeholderData: keepPreviousData,
  });
};

export const usePayoutsData = () => {
  const { page, searchQuery } = usePayoutsStore();
  return usePayouts({ page, searchQuery });
};

export const usePendingPayoutsData = () => {
  const { page } = usePendingPayoutStore();
  return usePendingPayouts({ page });
};
