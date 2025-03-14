import { useMutation, useQueryClient } from "@tanstack/react-query";
import { client } from "@/client";
import { AxiosError } from "axios";
import { Chapter } from "../types";

type Request = {
  courseId: string;
  chapterId: string;
};

export const useDeleteChapter = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation<Chapter, AxiosError, Request>({
    mutationFn: ({ chapterId }: Request) => client.delete(`/chapters/${chapterId}`, {}).then((res) => res.data.data),
    onSuccess: (_data, variables) => {
      queryClient.invalidateQueries({ queryKey: ["Courses", variables.courseId] });
      queryClient.invalidateQueries({ queryKey: ["Chapters", variables.chapterId] });
    },
  });

  return { deleteChapter: mutation.mutateAsync, isPending: mutation.isPending };
};
