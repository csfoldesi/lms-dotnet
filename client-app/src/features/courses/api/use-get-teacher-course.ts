import { client, useAuthClient } from "@/client";
import { AxiosError } from "axios";
import { Course } from "../types";
import { useQuery } from "@tanstack/react-query";

export const useGetTeacherCourse = (id: string) => {
  const { setClientToken } = useAuthClient();

  return useQuery<Course, AxiosError>({
    queryKey: ["Courses", id],
    retry: false,
    queryFn: async () => {
      await setClientToken(client);
      return client
        .get(`/courses/${id}/teacher`)
        .then((res) => {
          return res.data.data;
        })
        .catch((error: AxiosError) => {
          throw error;
        });
    },
  });
};
