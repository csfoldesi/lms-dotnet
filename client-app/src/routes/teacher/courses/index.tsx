import { Courses } from "@/features/teacher/courses";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/teacher/courses/")({
  component: Courses,
});
