import { useMutation, useQueryClient } from "@tanstack/react-query";
import { client } from "@/client";
import { AxiosError } from "axios";
import { Course } from "../types";

type Request = {
  id: string;
  title?: string;
  description?: string;
  imageUrl?: string;
  price?: number;
  categoryId?: string;
};

export const useUpdateCourse = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation<Course, AxiosError, Request>({
    mutationFn: (data: Request) => client.patch(`/courses/${data.id}`, data).then((res) => res.data.data),
    onSuccess: (_data, variables) => {
      queryClient.invalidateQueries({ queryKey: ["Courses", variables.id] });
    },
  });

  return { updateCourse: mutation.mutateAsync, isPending: mutation.isPending };
};
