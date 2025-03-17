import { client, useAuthClient } from "@/client";
import { AxiosError } from "axios";
import { Category } from "../types";
import { useQuery } from "@tanstack/react-query";

export const useGetCategories = () => {
  const { setClientToken } = useAuthClient();

  return useQuery<Category[], AxiosError>({
    queryKey: ["Categories"],
    retry: false,
    queryFn: async () => {
      await setClientToken(client);
      return client
        .get(`/categories`)
        .then((res) => {
          return res.data.data;
        })
        .catch((error: AxiosError) => {
          throw error;
        });
    },
  });
};
