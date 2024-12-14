import axios_instance from "@/lib/axios";

export async function getBusinessPendingKYC(page: number | string = 1) {
    try {
        const response = await axios_instance.get(`/business-pending-kyc?page=${page}`);
        if (!response.data.success) {
            const errorMessage = response.data.message || "An error occured while business pending kyc(s)!";
            throw new Error(errorMessage);
        }
        return response.data;
    } catch (error) {
        throw new Error(error?.message || "An error occured while business pending kyc(s)!");
    }
}
export async function getBusinessKYC(page: number | string = 1) {
    try {
        const response = await axios_instance.get(`/business-kyc?page=${page}`);
        if (!response.data.success) {
            const errorMessage = response.data.message || "An error occured while business pending kyc(s)!";
            throw new Error(errorMessage);
        }
        return response.data;
    } catch (error) {
        throw new Error(error?.message || "An error occured while business pending kyc(s)!");
    }
}

export async function getKYCDetails(id: number | string) {
    try {
        const response = await axios_instance.get(`/kyc/details/${id}`);
        if (!response.data.success) {
            const errorMessage = response.data.message || "An error occured while business pending kyc(s)!";
            throw new Error(errorMessage);
        }
        return response.data;
    } catch (error) {
        throw new Error(error?.message || "An error occured while business pending kyc(s)!");
    }
}

export async function approveKYCDocument(id: number | string = 1) {
    try {
        const response = await axios_instance.get(`/kyc/approve/${id}`);
        if (!response.data.success) {
            const errorMessage = response.data.message || "An error occurred!";
            throw new Error(errorMessage);
        }

        return response.data;
    } catch (error) {
        throw new Error(error?.message || "An error occurred!");
    }
}

export async function rejectKYCDocument(id: number | string = 1) {
    try {
        const response = await axios_instance.get(`/kyc/reject/${id}`);
        if (!response.data.success) {
            const errorMessage = response.data.message || "An error occurred!";
            throw new Error(errorMessage);
        }

        return response.data;
    } catch (error) {
        throw new Error(error?.message || "An error occurred!");
    }
}

