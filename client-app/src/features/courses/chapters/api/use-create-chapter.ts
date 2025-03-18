import { useMutation, useQueryClient } from "@tanstack/react-query";
import { client, useAuthClient } from "@/client";
import { AxiosError } from "axios";
import { Chapter } from "../types";

type Request = {
  courseId: string;
  title: string;
};

export const useCreateChapter = () => {
  const { setClientToken } = useAuthClient();
  const queryClient = useQueryClient();

  const mutation = useMutation<Chapter, AxiosError, Request>({
    mutationFn: async (data: Request) => {
      await setClientToken(client);
      return client.post(`/courses/${data.courseId}/chapters`, data).then((res) => res.data.data);
    },
    onSuccess: (_data, variables) => {
      queryClient.invalidateQueries({ queryKey: ["Courses", variables.courseId] });
    },
  });

  return { createChapter: mutation.mutateAsync, isPending: mutation.isPending };
};
