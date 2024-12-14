import axios_instance from "@/lib/axios";

type RequestData = {
  sessionId: string;
  settlementId?: string;
  accountNumber?: string;
  provider: string;
};

export async function resolveTransaction(requestData: RequestData) {
  try {
    const response = await axios_instance.post(
      `/resolve-transaction`,
      requestData,
    );
    if (!response.data.success) {
      const errorMessage =
        response.data.message ||
        "An error occurred while trying to resolve Transactions!";
      throw new Error(errorMessage);
    }
    return response.data;
  } catch (error) {
    throw new Error(
      error.message ||
        "An error occurred while trying to resolve Transactions!",
    );
  }
}
