import { CourseList } from "@/features/teacher/course-list";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/teacher/courses/")({
  component: CourseList,
});
