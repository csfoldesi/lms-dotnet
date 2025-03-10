import { useMutation, useQueryClient } from "@tanstack/react-query";
import { client } from "@/client";
import { AxiosError } from "axios";
import { Chapter } from "../types";

type Request = {
  courseId: string;
  chapterIdList: string[];
};

export const useReorderChapters = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation<Chapter, AxiosError, Request>({
    mutationFn: (data: Request) => client.put(`/courses/${data.courseId}/chapters`, data).then((res) => res.data.data),
    onSuccess: (_data, variables) => {
      queryClient.invalidateQueries({ queryKey: ["Courses", variables.courseId] });
    },
  });

  return { reorderChapters: mutation.mutateAsync, isPending: mutation.isPending };
};
