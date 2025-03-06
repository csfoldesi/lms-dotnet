import { client } from "@/client";
import { AxiosError } from "axios";
import { Course } from "../types";
import { useQuery } from "@tanstack/react-query";

export const useGetCourse = (id: string) => {
  return useQuery<Course, AxiosError>({
    queryKey: ["Courses", id],
    retry: false,
    queryFn: () =>
      client
        .get(`/courses/${id}`)
        .then((res) => {
          return res.data.data;
        })
        .catch((error: AxiosError) => {
          throw error;
        }),
  });
};
