import { client } from "@/client";
import { AxiosError } from "axios";
import { useQuery } from "@tanstack/react-query";
import { Chapter } from "../types";

export const useGetChapter = (id: string) => {
  return useQuery<Chapter, AxiosError>({
    queryKey: ["Chapters", id],
    retry: false,
    queryFn: () =>
      client
        .get(`/chapters/${id}`)
        .then((res) => {
          return res.data.data;
        })
        .catch((error: AxiosError) => {
          throw error;
        }),
  });
};
