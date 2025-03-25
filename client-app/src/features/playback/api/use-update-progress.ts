import { useMutation, useQueryClient } from "@tanstack/react-query";
import { client, useAuthClient } from "@/client";
import { AxiosError } from "axios";

type Request = {
  courseId: string;
  chapterId: string;
  isCompleted: boolean;
};

export const useUpdateProgress = () => {
  const { setClientToken } = useAuthClient();
  const queryClient = useQueryClient();

  const mutation = useMutation<string, AxiosError, Request>({
    mutationFn: async ({ chapterId, isCompleted }: Request) => {
      await setClientToken(client);
      return client.put(`/chapters/${chapterId}/progress`, { isCompleted }).then((res) => res.data.data);
    },
    onSuccess: (_data, variables) => {
      queryClient.invalidateQueries({ queryKey: ["Courses", variables.courseId] });
      queryClient.invalidateQueries({ queryKey: ["Chapters", variables.chapterId] });
    },
  });

  return { updateProgress: mutation.mutateAsync, isPending: mutation.isPending };
};
