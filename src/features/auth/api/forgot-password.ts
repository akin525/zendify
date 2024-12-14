import axios_instance from "@/lib/axios";

type ForgotPasswordData = {
    email: string;
}

export async function forgotPassword(data: ForgotPasswordData) {
    try {
        const response = await axios_instance.post(`/forgot-password`, data);
        if (!response.data.success) {
            const errorMessage = response.data.message || "An error occurred!";
            throw new Error(errorMessage);
        }
        return true
    } catch (error) {
        throw new Error(error?.message || "An error occured! Contact Admin.");
    }
}