import { useMutation, useQueryClient } from "@tanstack/react-query";
import { client } from "@/client";
import { AxiosError } from "axios";
import { Chapter } from "../types";

type Request = {
  chapterId: string;
  courseId: string;
};

export const usePublishChapter = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation<Chapter, AxiosError, Request>({
    mutationFn: ({ chapterId }: Request) =>
      client.patch(`/chapters/${chapterId}/publish`, {}).then((res) => res.data.data),
    onSuccess: (_data, variables) => {
      queryClient.invalidateQueries({ queryKey: ["Courses", variables.courseId] });
      queryClient.invalidateQueries({ queryKey: ["Chapters", variables.chapterId] });
    },
  });

  return { publishChapter: mutation.mutateAsync, isPending: mutation.isPending };
};
