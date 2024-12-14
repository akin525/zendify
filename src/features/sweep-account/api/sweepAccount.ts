import axios_instance from "@/lib/axios";

type RequestData = {
    account_number: string;
}

export async function sweepAccount(requestData: RequestData) {
    try {
        const response = await axios_instance.post(`/sweep-balance/safehaven`, requestData);

        if (!response.data.success) {
            const errorMessage = response?.data?.message || "An error occurred!";
            throw new Error(errorMessage);
        }

        return response.data;

    } catch (error) {

        throw new Error(error?.message || "An error occured while sweeping account!");
    }
}