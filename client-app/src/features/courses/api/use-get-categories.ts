import { client } from "@/client";
import { AxiosError } from "axios";
import { Category } from "../types";
import { useQuery } from "@tanstack/react-query";

export const useGetCategories = () => {
  return useQuery<Category[], AxiosError>({
    queryKey: ["Categories"],
    retry: false,
    queryFn: () =>
      client
        .get(`/categories`)
        .then((res) => {
          return res.data.data;
        })
        .catch((error: AxiosError) => {
          throw error;
        }),
  });
};
