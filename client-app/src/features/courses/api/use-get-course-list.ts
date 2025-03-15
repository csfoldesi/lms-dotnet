import { client } from "@/client";
import { AxiosError } from "axios";
import { Course } from "../types";
import { useQuery } from "@tanstack/react-query";

export const useGetCourseList = () => {
  return useQuery<Course[], AxiosError>({
    queryKey: ["Courses"],
    retry: false,
    queryFn: () =>
      client
        .get(`/courses`)
        .then((res) => {
          return res.data.data;
        })
        .catch((error: AxiosError) => {
          throw error;
        }),
  });
};
