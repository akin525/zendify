// /place-pnd-on-account/{id}
// /remove-pnd-on-account/{id}

import axios_instance from "@/lib/axios";

export async function placeOrRemovePND(payload: {
  id: number | string;
  status: string;
}) {
  try {
    const response = await axios_instance.get(
      `/${payload.status === "yes" ? "remove-pnd-on-account" : "place-pnd-on-account"}/${payload.id}`,
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
