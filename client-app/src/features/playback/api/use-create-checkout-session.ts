import { useMutation } from "@tanstack/react-query";
import { client, useAuthClient } from "@/client";
import { AxiosError } from "axios";

type Request = {
  courseId: string;
};

export const useCreateCheckoutSession = () => {
  const { setClientToken } = useAuthClient();

  const mutation = useMutation<string, AxiosError, Request>({
    mutationFn: async ({ courseId }: Request) => {
      await setClientToken(client);
      return client.post(`/payment/${courseId}/checkout`, {}).then((res) => res.data.data);
    },
  });

  return { createCheckoutSession: mutation.mutateAsync, isPending: mutation.isPending };
};
