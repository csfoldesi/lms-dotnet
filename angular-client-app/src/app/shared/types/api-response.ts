export type ApiResponse<T> = {
  data: T;
  isSuccess: boolean;
  errorMessage?: string;
};
