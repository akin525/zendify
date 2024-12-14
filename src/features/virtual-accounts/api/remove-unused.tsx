import axios_instance from "@/lib/axios";

export async function removeUnusedAccountFromBusiness(id: number | string) {
  try {
    const response = await axios_instance.get(
      `/remove-unused-account-from-business/${id}`,
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
