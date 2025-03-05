import { CreateCourse } from "@/features/teacher/create-course";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/teacher/courses/create")({
  component: CreateCourse,
});
