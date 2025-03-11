import { useMutation, useQueryClient } from "@tanstack/react-query";
import { client } from "@/client";
import { AxiosError } from "axios";
import { Course } from "../types";

type Request = {
  id: string;
  formData: FormData;
};

export const useUploadCourseImage = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation<Course, AxiosError, Request>({
    mutationFn: (data: Request) =>
      client.post(`/upload/courses/${data.id}`, data.formData).then((res) => res.data.data),
    onSuccess: (_data, variables) => {
      queryClient.invalidateQueries({ queryKey: ["Courses", variables.id] });
    },
  });

  return { uploadCourseImage: mutation.mutateAsync, isPending: mutation.isPending };
};
