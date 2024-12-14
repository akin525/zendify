import axios_instance from "@/lib/axios";

export async function getTransactions(page: number | string = 1) {
  try {
    const response = await axios_instance.get(`/transactions?page=${page}`);
    if (!response.data.success) {
      const errorMessage = response.data.message || "An error occurred!";
      throw new Error(errorMessage);
    }
    return response.data;
  } catch (error) {
    throw new Error("An error occured while fetching transactions!");
  }
}

export async function getBusinessTransactions(
  businessId: string | number,
  page: string | number,
) {
  try {
    const response = await axios_instance.get(
      `/business-transactions/${businessId}?page=${page}`,
    );
    if (!response.data.success) {
      const errorMessage = response.data.message || "An error occurred!";
      throw new Error(errorMessage);
    }
    return response.data;
  } catch (error) {
    throw new Error(
      error?.message || "An error occured while fetching transactions!",
    );
  }
}

export async function getUnsettledTransactions(page: number | string = 1) {
  try {
    const response = await axios_instance.get(
      `/unsettled-transactions?page=${page}`,
    );
    if (!response.data.success) {
      const errorMessage = response.data.message || "An error occurred!";
      throw new Error(errorMessage);
    }
    return response.data;
  } catch (error) {
    throw new Error("An error occured while fetching transactions!");
  }
}

export async function settleTransaction(id: number | string = 1) {
  try {
    const response = await axios_instance.get(`/settle-transaction/${id}`);
    if (!response.data.success) {
      const errorMessage = response.data.message || "An error occurred!";
      throw new Error(errorMessage);
    }

    return response.data;
  } catch (error) {
    throw new Error(error?.message || "An error occurred!");
  }
}

export async function resendTransactionWebhook(id: number | string = 1) {
  try {
    const response = await axios_instance.get(
      `/resend-transaction-webhook/${id}`,
    );

    if (!response.data.success) {
      const errorMessage = response.data.message || "An error occurred!";
      throw new Error(errorMessage);
    }

    return response.data;
  } catch (error) {
    throw new Error(error?.message || "An error occurred!");
  }
}

export async function getRefundedTransactions(page: number | string = 1) {
  try {
    const response = await axios_instance.get(
      `/refunded-transactions?page=${page}`,
    );
    if (!response.data.success) {
      const errorMessage = response.data.message || "An error occurred!";
      throw new Error(errorMessage);
    }
    return response.data;
  } catch (error) {
    throw new Error(
      error?.message || "An error occured while fetching transactions!",
    );
  }
}

export async function getWalletTransactions(page: number | string = 1) {
  try {
    const response = await axios_instance.get(
      `/wallet-transactions?page=${page}`,
    );
    if (!response.data.success) {
      const errorMessage = response.data.message || "An error occurred!";
      throw new Error(errorMessage);
    }
    return response.data;
  } catch (error) {
    throw new Error(
      error?.message || "An error occured while fetching transactions!",
    );
  }
}

export async function getBusinessWalletTransactions(
  businessId: string | number,
  page: string | number,
) {
  try {
    const response = await axios_instance.get(
      `/business-wallet-transactions/${businessId}?page=${page}`,
    );
    if (!response.data.success) {
      const errorMessage = response?.data?.message || "An error occurred!";
      throw new Error(errorMessage);
    }
    return response.data;
  } catch (error) {
    // console.log(error);
    throw new Error(
      error?.response?.data?.message ||
        error?.message ||
        "An error occured while fetching transactions!",
    );
  }
}

export async function searchTransactions(
  searchQuery: string,
  page: number | string = 1,
) {
  try {
    const response = await axios_instance.post(
      `/transaction-search?page=${page}`,
      { search: searchQuery },
    );
    if (!response.data.success) {
      const errorMessage = response.data.message || "An error occurred!";
      throw new Error(errorMessage);
    }
    return response.data;
  } catch (error) {
    throw new Error("An error occured while fetching transactions!");
  }
}
