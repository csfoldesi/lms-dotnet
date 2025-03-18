import { useMutation, useQueryClient } from "@tanstack/react-query";
import { client, useAuthClient } from "@/client";
import { AxiosError } from "axios";
import { Course } from "../types";

type Request = {
  id: string;
};

export const useUnpublishCourse = () => {
  const { setClientToken } = useAuthClient();
  const queryClient = useQueryClient();

  const mutation = useMutation<Course, AxiosError, Request>({
    mutationFn: async ({ id }: Request) => {
      await setClientToken(client);
      return client.patch(`/courses/${id}/unpublish`, {}).then((res) => res.data.data);
    },
    onSuccess: (_data, variables) => {
      queryClient.invalidateQueries({ queryKey: ["Courses", variables.id] });
    },
  });

  return { unpublishCourse: mutation.mutateAsync, isPending: mutation.isPending };
};
