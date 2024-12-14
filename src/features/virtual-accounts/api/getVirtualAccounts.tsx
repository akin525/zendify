import axios_instance from "@/lib/axios";
import {
  useUnusedAssignedProvidusStore,
  useUnusedAssignedStore,
  useUnusedUnassignedStore,
  useVirtualAccountsStore,
} from "@/stores/virtual-accounts";
import { keepPreviousData, useQuery } from "@tanstack/react-query";

export async function getVirtualAccounts(page: number | string = 1) {
  try {
    const response = await axios_instance.get(`/virtual-accounts?page=${page}`);
    if (!response.data.success) {
      const errorMessage = response.data.message || "An error occurred!";
      throw new Error(errorMessage);
    }
    return response.data;
  } catch (error) {
    throw new Error("An error occured while fetching virtual accounts!");
  }
}

export async function getBusinessVirtualAccounts(
  businessId: string | number,
  page: string | number,
) {
  try {
    const response = await axios_instance.get(
      `/business-virtual-accounts/${businessId}?page=${page}`,
    );
    if (!response.data.success) {
      const errorMessage = response.data.message || "An error occurred!";
      throw new Error(errorMessage);
    }
    return response.data;
  } catch (error) {
    throw new Error(
      error?.message || "An error occured while fetching virtual accounts!",
    );
  }
}

export async function getBusinessAccountsAdded(
    businessId: string | number,
    page: string | number,
) {
  try {
    const response = await axios_instance.get(
        `/business-dedicated-accounts/${businessId}?page=${page}`,
    );
    if (!response.data.success) {
      const errorMessage = response.data.message || "An error occurred!";
      throw new Error(errorMessage);
    }
    return response.data;
  } catch (error) {
    throw new Error(
        error?.message || "An error occurred while fetching dedicated virtual accounts!",
    );
  }
}

export async function searchVirtualAccounts(
  searchQuery: string,
  page: number | string = 1,
) {
  try {
    const response = await axios_instance.post(
      `/virtual-account-search?page=${page}`,
      { search: searchQuery },
    );
    if (!response.data.success) {
      const errorMessage = response.data.message || "An error occurred!";
      throw new Error(errorMessage);
    }
    return response.data;
  } catch (error) {
    throw new Error("An error occured while fetching virtual account!");
  }
}

export async function getUnusedAssignedAccounts(page: number | string = 1) {
  try {
    const response = await axios_instance.get(
      `/unused-assigned-accounts?page=${page}`,
    );
    if (!response.data.success) {
      const errorMessage = response.data.message || "An error occurred!";
      throw new Error(errorMessage);
    }
    return response.data;
  } catch (error) {
    throw new Error("An error occured while fetching virtual accounts!");
  }
}

export async function getUnusedAssignedProvidusAccounts(
  page: number | string = 1,
) {
  try {
    const response = await axios_instance.get(
      `/unused-assigned-providus-accounts?page=${page}`,
    );
    if (!response.data.success) {
      const errorMessage = response.data.message || "An error occurred!";
      throw new Error(errorMessage);
    }
    return response.data;
  } catch (error) {
    throw new Error("An error occured while fetching virtual accounts!");
  }
}

export async function getUnusedUnassignedAccounts(page: number | string = 1) {
  try {
    const response = await axios_instance.get(
      `/unused-unassigned-accounts?page=${page}`,
    );
    if (!response.data.success) {
      const errorMessage = response.data.message || "An error occurred!";
      throw new Error(errorMessage);
    }
    return response.data;
  } catch (error) {
    throw new Error("An error occured while fetching virtual accounts!");
  }
}

export const useVirtualAccounts = ({ page, searchQuery, config = {} }) => {
  return useQuery({
    ...config,
    queryKey: ["virtual-accounts", page, searchQuery],
    queryFn: () =>
      searchQuery
        ? searchVirtualAccounts(searchQuery, page)
        : getVirtualAccounts(page),

    placeholderData: searchQuery ? undefined : keepPreviousData,
  });
};
export const useUnusedAssignedAccounts = ({ page, config = {} }) => {
  return useQuery({
    ...config,
    queryKey: ["unused-assigned-ccounts", page],
    queryFn: () => getUnusedAssignedAccounts(page),

    placeholderData: keepPreviousData,
  });
};
export const useUnusedAssignedProvidusAccounts = ({ page, config = {} }) => {
  return useQuery({
    ...config,
    queryKey: ["unused-assigned-providus-accounts", page],
    queryFn: () => getUnusedAssignedProvidusAccounts(page),
    placeholderData: keepPreviousData,
  });
};
export const useUnusedUnassignedAccounts = ({ page, config = {} }) => {
  return useQuery({
    ...config,
    queryKey: ["unused-unassigned-accounts", page],
    queryFn: () => getUnusedUnassignedAccounts(page),

    placeholderData: keepPreviousData,
  });
};

export const useVirtualAccountsData = () => {
  const { page, searchQuery } = useVirtualAccountsStore();
  return useVirtualAccounts({ page, searchQuery });
};
export const useUnusedAssignedAccountsData = () => {
  const { page } = useUnusedAssignedStore();
  return useUnusedAssignedAccounts({ page });
};
export const useUnusedAssignedProvidusAccountsData = () => {
  const { page } = useUnusedAssignedProvidusStore();
  return useUnusedAssignedProvidusAccounts({ page });
};
export const useUnusedUnassignedAccountsData = () => {
  const { page } = useUnusedUnassignedStore();
  return useUnusedUnassignedAccounts({ page });
};
