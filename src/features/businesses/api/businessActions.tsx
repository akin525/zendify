import axios_instance from "@/lib/axios";

// type Payload = {
//   subject: string;
//   message: string;
// };

export async function sendEmailToBusiness(id: string | number, payload) {
  try {
    const response = await axios_instance.post(
      `/send-email-to-business/${id}`,
      payload,
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

export async function approveBusiness(id: number | string = 1) {
  try {
    const response = await axios_instance.get(`/approve-business/${id}`);
    if (!response.data.success) {
      const errorMessage = response.data.message || "An error occurred!";
      throw new Error(errorMessage);
    }

    return response.data;
  } catch (error) {
    throw new Error(error?.message || "An error occurred!");
  }
}

export async function blockBusiness(id: number | string = 1) {
  try {
    const response = await axios_instance.get(`/block-business/${id}`);
    if (!response.data.success) {
      const errorMessage = response.data.message || "An error occurred!";
      throw new Error(errorMessage);
    }

    return response.data;
  } catch (error) {
    throw new Error(error?.message || "An error occurred!");
  }
}

export async function unblockBusiness(id: number | string = 1) {
  try {
    const response = await axios_instance.get(`/unblock-business/${id}`);
    if (!response.data.success) {
      const errorMessage = response.data.message || "An error occurred!";
      throw new Error(errorMessage);
    }

    return response.data;
  } catch (error) {
    throw new Error(error?.message || "An error occurred!");
  }
}
