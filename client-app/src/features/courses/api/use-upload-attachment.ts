import { useMutation, useQueryClient } from "@tanstack/react-query";
import { client, useAuthClient } from "@/client";
import { AxiosError } from "axios";
import { Course } from "../types";

type Request = {
  id: string;
  formData: FormData;
};

export const useUploadAttachment = () => {
  const { setClientToken } = useAuthClient();
  const queryClient = useQueryClient();

  const mutation = useMutation<Course, AxiosError, Request>({
    mutationFn: async (data: Request) => {
      await setClientToken(client);
      return client.post(`/upload/courses/${data.id}/attachments`, data.formData).then((res) => res.data.data);
    },
    onSuccess: (_data, variables) => {
      queryClient.invalidateQueries({ queryKey: ["Courses", variables.id] });
    },
  });

  return { uploadAttachment: mutation.mutateAsync, isPending: mutation.isPending };
};
