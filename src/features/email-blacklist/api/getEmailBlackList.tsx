import axios_instance from "@/lib/axios";
import { useEmailBlacklistStore } from "@/stores/email-blacklist";
import { keepPreviousData, useQuery } from "@tanstack/react-query";

export async function getEmailBlacklist(page: number | string = 1) {
  try {
    const response = await axios_instance.get(`/email-blacklist?page=${page}`);

    if (!response.data.success) {
      const errorMessage = response?.data?.message || "An error occurred!";

      throw new Error(errorMessage);
    }

    return response.data;
  } catch (error) {
    throw new Error(
      error?.message || "An error occurred while fetching blacklisted emails.",
    );
  }
}

export async function updateBlackListedEmail(
  id: number | string = 1,
  requestData: { email: string; status: number },
) {
  try {
    const response = await axios_instance.post(
      `/update-blacklisted-email/${id}`,
      requestData,
    );

    if (!response.data.success) {
      const errorMessage = response.data.message || "An error occurred!";

      throw new Error(errorMessage);
    }

    return response.data;
  } catch (error) {
    throw new Error(
      error?.message || "An error occurred while updating blacklisted email.",
    );
  }
}

export async function blackListEmail(email: string[]) {
  try {
    const response = await axios_instance.post(`/blacklist-email`, {
      email: email,
    });

    if (!response.data.success) {
      const errorMessage = response.data.message || "An error occurred!";

      throw new Error(errorMessage);
    }

    return response.data;
  } catch (error) {
    throw new Error(
      error?.message || "An error occurred while adding email(s) to blacklist.",
    );
  }
}

export const useEmailBlacklist = ({ page, config = {} }) => {
  return useQuery({
    ...config,
    queryKey: ["email-blacklist", page],
    queryFn: () => getEmailBlacklist(page),
    placeholderData: keepPreviousData,
  });
};

export const useEmailBlacklistData = () => {
  const { page } = useEmailBlacklistStore();
  return useEmailBlacklist({ page });
};
