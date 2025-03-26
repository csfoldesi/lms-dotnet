import { client, useAuthClient } from "@/client";
import { AxiosError } from "axios";
import { useQuery } from "@tanstack/react-query";
import { Course } from "@/features/courses/types";

export const useGetPurchasedCourseList = () => {
  const { setClientToken } = useAuthClient();

  return useQuery<Course[], AxiosError>({
    queryKey: ["Courses"],
    retry: false,
    queryFn: async () => {
      await setClientToken(client);
      return client
        .get(`/courses/purchased`)
        .then((res) => {
          return res.data.data;
        })
        .catch((error: AxiosError) => {
          throw error;
        });
    },
  });
};
