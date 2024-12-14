import { useQuery } from "react-query";
import axios from "axios";
import storage from "@/utils/storage.ts";

export const useStaffData = () => {
  const getToken = () => {
    const data = storage.getToken();
    return data ? data?.token : "";
  }

  const token = getToken()

  const baseUrl = import.meta.env.VITE_API_BASE_URL;

  return useQuery("fetchStaff", async () => {
    const { data } = await axios.get(`${baseUrl}/staffs`, {
      headers: {
        Authorization: `Bearer ${token}`, // Add your token
      },
    });
    return data;
  });
};
