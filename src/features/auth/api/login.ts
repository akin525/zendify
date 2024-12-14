import axios_instance from "@/lib/axios";
import { LoginResponse } from "../types";
import storage from "@/utils/storage";

type LoginData = {
    email: string;
    password: string;
}

export async function login(data: LoginData): Promise<LoginResponse> {
    try {
        const response = await axios_instance.post(`/login`, { ...data, deviceName: "reactapp" });
        if (!response.data.success) {
            const errorMessage = response.data.message || "An error occurred!";
            throw new Error(errorMessage);
        }

        storage.setToken(response.data);

        return response.data;

    } catch (error) {
        throw new Error(error?.message || "An error occurred while trying to login");
    }
}