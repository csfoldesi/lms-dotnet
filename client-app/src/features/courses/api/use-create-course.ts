import { useMutation, useQueryClient } from "@tanstack/react-query";
import { client } from "@/client";
import { AxiosError } from "axios";
import { Course } from "../types";

type Request = {
  userId: string;
  title: string;
};

export const useCreateCourse = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation<Course, AxiosError, Request>({
    mutationFn: (data: Request) => client.post("/courses", data).then((res) => res.data.data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["Courses"] });
    },
  });

  return { createCourse: mutation.mutateAsync, isPending: mutation.isPending };
};
