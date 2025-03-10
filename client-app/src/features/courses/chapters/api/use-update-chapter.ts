import { useMutation, useQueryClient } from "@tanstack/react-query";
import { client } from "@/client";
import { AxiosError } from "axios";
import { Chapter } from "../types";

type Request = {
  courseId: string;
  id: string;
  title?: string;
  description?: string;
  videoUrl?: string;
  isFree?: boolean;
};

export const useUpdateChapter = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation<Chapter, AxiosError, Request>({
    mutationFn: ({ id, title, description, videoUrl, isFree }: Request) =>
      client.patch(`/chapters/${id}`, { title, description, videoUrl, isFree }).then((res) => res.data.data),
    onSuccess: (_data, variables) => {
      queryClient.invalidateQueries({ queryKey: ["Courses", variables.courseId] });
      queryClient.invalidateQueries({ queryKey: ["Chapters", variables.id] });
    },
  });

  return { updateChapter: mutation.mutateAsync, isPending: mutation.isPending };
};
