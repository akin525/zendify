import axios_instance from "@/lib/axios";

export async function getBusinesses(page = 1) {
  try {
    const response = await axios_instance.get(`/businesses?page=${page}`);
    if (!response.data.success) {
      const errorMessage = response.data.message || "An error occurred!";
      throw new Error(errorMessage);
    }
    return response.data;
  } catch (error) {
    throw new Error(
      error?.message || "An error occured while getting my-businesses",
    );
  }
}

export async function getBusinessDetails(id: number | string) {
  try {
    const response = await axios_instance.get(`/business/details/${id}`);
    if (!response.data.success) {
      const errorMessage = response?.data?.message || "An error occurred!";
      throw new Error(errorMessage);
    }
    return response.data;
  } catch (error) {
    throw new Error(
      error?.response?.data?.message ||
        "An error occured while getting business",
    );
  }
}
