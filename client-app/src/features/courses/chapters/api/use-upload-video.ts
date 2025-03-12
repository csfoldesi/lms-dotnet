import { useMutation, useQueryClient } from "@tanstack/react-query";
import { client } from "@/client";
import { AxiosError } from "axios";
import { Chapter } from "../types";

type Request = {
  id: string;
  formData: FormData;
};

export const useUploadVideo = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation<Chapter, AxiosError, Request>({
    mutationFn: (data: Request) =>
      client.post(`/upload/chapters/${data.id}`, data.formData).then((res) => res.data.data),
    onSuccess: (_data, variables) => {
      queryClient.invalidateQueries({ queryKey: ["Chapters", variables.id] });
    },
  });

  return { uploadVideo: mutation.mutateAsync, isPending: mutation.isPending };
};
