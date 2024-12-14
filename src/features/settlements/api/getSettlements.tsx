import axios_instance from "@/lib/axios";

export async function getSettlements(page: number | string = 1) {
  try {
    const response = await axios_instance.get(`/settlements?page=${page}`);
    if (!response.data.success) {
      const errorMessage = response.data.message || "An error occurred!";
      throw new Error(errorMessage);
    }
    return response.data;
  } catch (error) {
    throw new Error("An error occured while fetching settlements!");
  }
}

export async function getBusinessSettlements(
  businessId: string | number,
  page: string | number,
) {
  try {
    const response = await axios_instance.get(
      `/business-settlements/${businessId}?page=${page}`,
    );
    if (!response.data.success) {
      const errorMessage = response.data.message || "An error occurred!";
      throw new Error(errorMessage);
    }
    return response.data;
  } catch (error) {
    throw new Error(
      error?.message || "An error occured while fetching settlements!",
    );
  }
}

// export async function searchVirtualAccounts(
//   searchQuery: string,
//   page: number | string = 1,
// ) {
//   try {
//     const response = await axios_instance.post(
//       `/virtual-account-search?page=${page}`,
//       { search: searchQuery },
//     );
//     if (!response.data.success) {
//       const errorMessage = response.data.message || "An error occurred!";
//       throw new Error(errorMessage);
//     }
//     return response.data;
//   } catch (error) {
//     throw new Error("An error occured while fetching virtual account!");
//   }
// }
