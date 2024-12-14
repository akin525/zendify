import axios_instance from "@/lib/axios";

export async function getSysCalculation(endpoint, requestData) {
    try {
        const response = await axios_instance.post(`/${endpoint}`, requestData);
        if (!response.data.success) {
            const errorMessage = response.data.message || "An error occurred!";
            throw new Error(errorMessage);
        }
        return response.data;
    } catch (error) {
        throw new Error(error?.message || "An error occured while getting system stat!");
    }
}

