import { client, useAuthClient } from "@/client";
import { AxiosError } from "axios";
import { useQuery } from "@tanstack/react-query";
import { Analytics } from "../types";

export const useGetAnalitics = () => {
  const { setClientToken } = useAuthClient();

  return useQuery<Analytics, AxiosError>({
    queryKey: ["Analytics"],
    retry: false,
    queryFn: async () => {
      await setClientToken(client);
      return client
        .get(`/analytics`)
        .then((res) => {
          return res.data.data;
        })
        .catch((error: AxiosError) => {
          throw error;
        });
    },
  });
};
