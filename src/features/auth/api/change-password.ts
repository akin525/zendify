import axios_instance from "@/lib/axios";

type ChangePasswordData = {
    current_password: string;
    password: string;
    password_confirmation: string;
}

export async function changePassword(data: ChangePasswordData) {
    try {
        const response = await axios_instance.post(`/change-password`, data);
        if (!response.data.success) {
            const errorMessage = response?.data?.message || "An error occurred!";
            throw new Error(errorMessage);
        }

        return response.data;
    } catch (error) {
        throw new Error(error?.response?.data?.message || "An error occured! Contact Admin.");
    }
}