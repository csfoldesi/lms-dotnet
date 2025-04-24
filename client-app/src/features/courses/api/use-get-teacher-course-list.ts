import { client, useAuthClient } from "@/client";
import { AxiosError } from "axios";
import { Course } from "../types";
import { useQuery } from "@tanstack/react-query";

type Request = {
  title?: string;
  categoryId?: string;
};

export const useGetTeacherCourseList = ({ title = "", categoryId = "" }: Request) => {
  const { setClientToken } = useAuthClient();

  return useQuery<Course[], AxiosError>({
    queryKey: ["Courses", title, categoryId],
    retry: false,
    queryFn: async () => {
      await setClientToken(client);
      let url = `/courses/teacher?title=${title}`;
      if (categoryId) {
        url += `&categories=${categoryId}`;
      }
      return client
        .get(url)
        .then((res) => {
          return res.data.data;
        })
        .catch((error: AxiosError) => {
          throw error;
        });
    },
  });
};
