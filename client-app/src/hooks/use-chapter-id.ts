import { useParams } from "@tanstack/react-router";

export const useChapterId = () => {
  const chapterId = useParams({ strict: false, select: (params) => params.chapterId });

  return chapterId !== undefined ? chapterId : "";
};
