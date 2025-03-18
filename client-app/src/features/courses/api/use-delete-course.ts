import { useMutation, useQueryClient } from "@tanstack/react-query";
import { client, useAuthClient } from "@/client";
import { AxiosError } from "axios";
import { Course } from "../types";

type Request = {
  id: string;
};

export const useDeleteCourse = () => {
  const { setClientToken } = useAuthClient();
  const queryClient = useQueryClient();

  const mutation = useMutation<Course, AxiosError, Request>({
    mutationFn: async ({ id }: Request) => {
      await setClientToken(client);
      return client.delete(`/courses/${id}`, {}).then((res) => res.data.data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["Courses"] });
    },
  });

  return { deleteCourse: mutation.mutateAsync, isPending: mutation.isPending };
};
