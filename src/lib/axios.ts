
import storage from "@/utils/storage";
import axios from "axios";


const getToken = () => {
    const data = storage.getToken();
    return data ? data?.token : "";
}

const token = getToken()

const baseUrl = import.meta.env.VITE_API_BASE_URL;

const axios_instance = axios.create({
    baseURL: baseUrl,
    headers: {
        "Content-Type": "application/json",
        Authorization: token ? `Bearer ${token}` : "",
    },
});

axios_instance.interceptors.response.use(
    (response) => {
        if (response.data.success === false && response.data.message === "Unauthorized. Login Required.") {
            // const errorMessage = "Unauthorized. Login Required.";
            // alert(errorMessage);
            localStorage.clear();
            sessionStorage.clear();
            window.location.href = "/login";
        }
        return response;
    }
);

export default axios_instance;