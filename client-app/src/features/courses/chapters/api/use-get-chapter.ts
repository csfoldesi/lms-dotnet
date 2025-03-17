import { client, useAuthClient } from "@/client";
import { AxiosError } from "axios";
import { useQuery } from "@tanstack/react-query";
import { Chapter } from "../types";

export const useGetChapter = (id: string) => {
  const { setClientToken } = useAuthClient();

  return useQuery<Chapter, AxiosError>({
    queryKey: ["Chapters", id],
    retry: false,
    queryFn: async () => {
      await setClientToken(client);
      return client
        .get(`/chapters/${id}`)
        .then((res) => {
          return res.data.data;
        })
        .catch((error: AxiosError) => {
          throw error;
        });
    },
  });
};
