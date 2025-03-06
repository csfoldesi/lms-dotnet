import { useParams } from "@tanstack/react-router";

export const useCourseId = () => {
  const courseId = useParams({ strict: false, select: (params) => params.courseId });

  return courseId !== undefined ? courseId : "";
};
