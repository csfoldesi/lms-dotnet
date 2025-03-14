import { useMutation, useQueryClient } from "@tanstack/react-query";
import { client } from "@/client";
import { AxiosError } from "axios";
import { Course } from "../types";

type Request = {
  id: string;
};

export const useDeleteCourse = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation<Course, AxiosError, Request>({
    mutationFn: ({ id }: Request) => client.delete(`/courses/${id}`, {}).then((res) => res.data.data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["Courses"] });
    },
  });

  return { deleteCourse: mutation.mutateAsync, isPending: mutation.isPending };
};
