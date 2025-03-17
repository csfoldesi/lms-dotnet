import { useAuth } from "@clerk/clerk-react";
import axios, { AxiosInstance } from "axios";

export const client = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  withCredentials: true,
});

export const useAuthClient = () => {
  const { getToken } = useAuth();

  async function setClientToken(client: AxiosInstance) {
    const token = await getToken();
    if (token) {
      client.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    }
  }

  return { setClientToken };
};
