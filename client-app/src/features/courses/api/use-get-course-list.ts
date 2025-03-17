import { client, useAuthClient } from "@/client";
import { AxiosError } from "axios";
import { Course } from "../types";
import { useQuery } from "@tanstack/react-query";

type Request = {
  title?: string;
  categoryId?: string;
};

export const useGetCourseList = ({ title = "", categoryId = "" }: Request) => {
  const { setClientToken } = useAuthClient();

  return useQuery<Course[], AxiosError>({
    queryKey: ["Courses", title, categoryId],
    retry: false,
    queryFn: async () => {
      await setClientToken(client);
      return client
        .get(`/courses?title=${title}&categoryId=${categoryId}`)
        .then((res) => {
          return res.data.data;
        })
        .catch((error: AxiosError) => {
          throw error;
        });
    },
  });
};
