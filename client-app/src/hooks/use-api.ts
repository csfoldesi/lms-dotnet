/*import { useAuth } from "@clerk/clerk-react";
import { useMutation, UseMutationResult, useQuery, useQueryClient, UseQueryResult } from "@tanstack/react-query";
import axios, { AxiosError } from "axios";

const client = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  withCredentials: true,
});

type GetApiProps = {
  queryKey: string[];
  url: string;
};

export function useGetApi<TData>({ queryKey, url }: GetApiProps): UseQueryResult<TData, AxiosError> {
  const { getToken } = useAuth();

  return useQuery<TData, AxiosError>({
    queryKey,
    retry: false,
    queryFn: async () => {
      const token = await getToken();
      if (token) {
        client.defaults.headers.common["Authorization"] = `Bearer ${token}`;
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
}

type PostApiProps<T, R> = {
  queryKey: string[];
  mutationFn: (variables: R) => Promise<T>;
};

export function usePostApi<TData, TRequest>({
  queryKey,
  mutationFn,
}: PostApiProps<TData, TRequest>): UseMutationResult<TData, AxiosError, TRequest> {
  const queryClient = useQueryClient();
  const { getToken } = useAuth();

  return useMutation<TData, AxiosError, TRequest>({
    mutationFn: async (data: TRequest) => {
      const token = await getToken();
      if (token) {
        client.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      }
      return mutationFn(data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKey });
    },
  });
}*/
