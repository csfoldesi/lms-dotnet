import { useMutation, useQueryClient } from "@tanstack/react-query";
import { client } from "@/client";
import { AxiosError } from "axios";
import { Course } from "../types";

type Request = {
  id: string;
};

export const usePublishCourse = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation<Course, AxiosError, Request>({
    mutationFn: ({ id }: Request) => client.patch(`/courses/${id}/publish`, {}).then((res) => res.data.data),
    onSuccess: (_data, variables) => {
      queryClient.invalidateQueries({ queryKey: ["Courses", variables.id] });
    },
  });

  return { publishCourse: mutation.mutateAsync, isPending: mutation.isPending };
};
